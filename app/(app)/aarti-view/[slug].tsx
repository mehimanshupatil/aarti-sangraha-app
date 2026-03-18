import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Dimensions,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { Menu, MenuItem, MenuItemLabel } from '../../../components/ui/menu';
import IconBtn from '../../../components/ui/IconBtn';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	Easing,
	cancelAnimation,
	scrollTo,
	useAnimatedReaction,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { singleItemType, useAppTheme } from '../../../shared/types';
import {
	useDataStore,
	useDataStoreActions,
	useUIStoreActions,
} from '../../../store/store';
import { shareAarti } from '../../../shared/helper';
import { fontStyle, iconButtonReset } from '../../../shared/styles';
import data from '../../../store/data';
import AartiShareCard from '../../../components/AartiShareCard';
import { scheduleOnRN } from 'react-native-worklets';

export async function generateStaticParams(): Promise<
	Record<string, string>[]
> {
	return data.map((x) => ({ slug: x.metadata.slug }));
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 60;
const VELOCITY_THRESHOLD = 400;
const SPEED_STEP = 10;
const SPEED_MIN = 5;
const SPEED_MAX = 200;
const SPEED_DEFAULT = 60;
const LINE_HEIGHT_RATIO = 1.65;

const AartiView: React.FC = () => {
	useKeepAwake();

	const { slug } = useLocalSearchParams();
	const [scrollHeight, setScrollHeight] = useState(0);
	const [autoScroll, setAutoScroll] = useState(false);
	const [focusMode, setFocusMode] = useState(false);
	const [focusLineCount, setFocusLineCount] = useState(3);
	const [scrollSpeed, setScrollSpeed] = useState(SPEED_DEFAULT);

	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const fontSize = useDataStore((s) => s.fontSize);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);
	const translate = useDataStore((s) => s.translate);
	const displayMode = useDataStore((s) => s.displayMode);

	const { toggleFav, deleteAarti, addToRecentlyViewed } = useDataStoreActions();
	const { setFontSize, setTranslate } = useUIStoreActions();

	const initialIndex = aartis.findIndex(
		(x) => x.metadata.slug === decodeURI((slug ?? '') as string),
	);
	const [displayIndex, setDisplayIndex] = useState(
		initialIndex >= 0 ? initialIndex : 0,
	);
	const displayIndexSV = useSharedValue(initialIndex >= 0 ? initialIndex : 0);

	const selectedItem = aartis[displayIndex];
	const translateX = useSharedValue(0);
	const shareCardRef = useRef<View>(null);

	// Scroll
	const animScrollRef = useAnimatedRef<Animated.ScrollView>();
	const scrollY = useSharedValue(0);
	const isAutoScrolling = useSharedValue(false);
	const contentH = useSharedValue(0);
	const containerH = useSharedValue(0);

	// Focus band — shared values so overlays animate on UI thread
	const scrollAreaH = useSharedValue(0); // pixel height of scroll area
	const bandTop = useSharedValue(0); // distance from top of scroll area
	const bandHeight = useSharedValue(0); // total band height
	const bandDragStart = useSharedValue(0); // capture position on drag begin
	// JS-side copy of bandTop used for text paddingTop (updated on drag end)
	const [bandTopJS, setBandTopJS] = useState(0);

	// Initialise bandTop when scroll area is first measured
	useEffect(() => {
		if (scrollAreaH.value > 0 && bandTop.value === 0) {
			const initial = scrollAreaH.value * 0.3;
			bandTop.value = initial;
			setBandTopJS(initial);
		}
	}, [scrollAreaH.value]);

	// Keep bandHeight in sync with JS state
	useEffect(() => {
		bandHeight.value = focusLineCount * fontSize * LINE_HEIGHT_RATIO;
	}, [focusLineCount, fontSize]);

	// Animated styles for the three overlay layers
	const topDimStyle = useAnimatedStyle(() => ({
		height: bandTop.value,
	}));
	const bandContainerStyle = useAnimatedStyle(() => ({
		top: bandTop.value,
		height: bandHeight.value,
	}));
	const bandControlsStyle = useAnimatedStyle(() => ({
		top: bandTop.value + bandHeight.value,
	}));
	const bottomDimStyle = useAnimatedStyle(() => ({
		top: bandTop.value + bandHeight.value,
	}));

	// Drag gesture for the band grip handle — vertical only
	const bandDragGesture = Gesture.Pan()
		.activeOffsetY([-4, 4])
		.onBegin(() => {
			bandDragStart.value = bandTop.value;
		})
		.onUpdate((e) => {
			const maxTop = scrollAreaH.value - bandHeight.value;
			bandTop.value = Math.max(
				0,
				Math.min(bandDragStart.value + e.translationY, maxTop),
			);
		})
		.onEnd(() => {
			scheduleOnRN(setBandTopJS, bandTop.value);
		});

	// Auto-scroll: single withTiming drives scrollY
	useAnimatedReaction(
		() => scrollY.value,
		(y) => {
			if (isAutoScrolling.value) scrollTo(animScrollRef, 0, y, false);
		},
	);

	useEffect(() => {
		if (autoScroll) {
			const maxScroll = Math.max(0, contentH.value - containerH.value);
			const remaining = maxScroll - scrollY.value;
			if (remaining <= 0) return;
			isAutoScrolling.value = true;
			scrollY.value = withTiming(
				maxScroll,
				{ duration: (remaining / scrollSpeed) * 1000, easing: Easing.linear },
				(finished) => {
					'worklet';
					if (finished) {
						isAutoScrolling.value = false;
						scheduleOnRN(setAutoScroll, false);
					}
				},
			);
		} else {
			isAutoScrolling.value = false;
			cancelAnimation(scrollY);
		}
	}, [autoScroll, scrollSpeed]);

	useEffect(() => {
		if (selectedItem?.key) addToRecentlyViewed(selectedItem.key);
	}, [selectedItem?.key]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
		flex: 1,
	}));

	const updateIndex = (newIndex: number) => {
		setDisplayIndex(newIndex);
		displayIndexSV.value = newIndex;
		cancelAnimation(scrollY);
		isAutoScrolling.value = false;
		scrollY.value = 0;
		scrollTo(animScrollRef, 0, 0, false);
		setAutoScroll(false);
	};

	const goToIndex = (newIndex: number, direction: 1 | -1) => {
		const exitTo = -direction * SCREEN_WIDTH;
		const enterFrom = direction * SCREEN_WIDTH;
		translateX.value = withTiming(
			exitTo,
			{ duration: 220, easing: Easing.out(Easing.cubic) },
			() => {
				'worklet';
				translateX.value = enterFrom;
				scheduleOnRN(updateIndex, newIndex);
				translateX.value = withTiming(0, {
					duration: 220,
					easing: Easing.out(Easing.cubic),
				});
			},
		);
	};

	const swipeGesture = Gesture.Pan()
		.activeOffsetX([-15, 15])
		.failOffsetY([-20, 20])
		.onUpdate((e) => {
			'worklet';
			translateX.value = e.translationX;
		})
		.onEnd((e) => {
			'worklet';
			const idx = displayIndexSV.value;
			const total = aartis.length;
			const shouldSwipe =
				Math.abs(e.translationX) > SWIPE_THRESHOLD ||
				Math.abs(e.velocityX) > VELOCITY_THRESHOLD;
			if (shouldSwipe && e.translationX < 0 && idx < total - 1)
				scheduleOnRN(goToIndex, idx + 1, 1);
			else if (shouldSwipe && e.translationX > 0 && idx > 0)
				scheduleOnRN(goToIndex, idx - 1, -1);
			else translateX.value = withSpring(0, { damping: 20, stiffness: 300 });
		});

	const deletePress = () => {
		Alert.alert(
			'Delete Aarti',
			`Are you sure you want to delete "${selectedItem?.title.original}"?`,
			[
				{ text: 'रद्द करा', style: 'cancel' },
				{
					text: 'ठीक आहे',
					onPress: () => {
						if (selectedItem) deleteAarti(selectedItem.key);
						router.back();
					},
				},
			],
		);
	};

	const toggleFavorite = (item: singleItemType | undefined) => {
		if (item) toggleFav(item.key);
	};

	const shareAsImage = async () => {
		if (!shareCardRef.current || !selectedItem) return;
		try {
			if (Platform.OS === 'web') {
				const dataUri = await captureRef(shareCardRef, {
					format: 'png',
					quality: 1,
					result: 'data-uri',
				});
				const link = document.createElement('a');
				link.href = dataUri;
				link.download = `${selectedItem.title.original}.png`;
				link.click();
				return;
			}
			const uri = await captureRef(shareCardRef, {
				format: 'png',
				quality: 1,
				result: 'tmpfile',
			});
			const canShare = await Sharing.isAvailableAsync();
			if (!canShare) {
				Alert.alert(
					'Share as Image',
					'Sharing is not available on this device.',
				);
				return;
			}
			await Sharing.shareAsync(uri, {
				mimeType: 'image/png',
				dialogTitle: selectedItem.title.original,
			});
		} catch {
			Alert.alert('Error', 'Could not capture the aarti as image.');
		}
	};

	const isFav = favoritesKeys.includes(selectedItem?.key ?? '');

	return (
		<>
			<Head>
				<title>{selectedItem?.title[translate]}</title>
				<meta name="description" content={selectedItem?.body[translate]} />
			</Head>
			<View className="flex-1" style={{ backgroundColor: colors.background }}>
				<Stack.Screen
					options={{
						title: selectedItem?.title[translate],
						headerRight: () => (
							<Menu
								trigger={({ ...triggerProps }) => {
									return (
										<IconBtn
											{...triggerProps}
											icon="share-variant"
											size={24}
											iconColor={colors.onPrimary}
										/>
									);
								}}
								placement="bottom right"
								useRNModal
								offset={4}
								style={{ backgroundColor: colors.surface }}
								closeOnSelect
							>
								<MenuItem
									key="share-text"
									textValue="Share as Text"
									onPress={() => shareAarti(selectedItem)}
								>
									<MaterialCommunityIcons
										name="text"
										size={18}
										color={colors.text}
										style={{ marginRight: 12 }}
									/>
									<MenuItemLabel style={{ color: colors.text }}>
										Share as Text
									</MenuItemLabel>
								</MenuItem>
								<MenuItem
									key="share-image"
									textValue="Share as Image"
									onPress={shareAsImage}
								>
									<MaterialCommunityIcons
										name="image"
										size={18}
										color={colors.text}
										style={{ marginRight: 12 }}
									/>
									<MenuItemLabel style={{ color: colors.text }}>
										Share as Image
									</MenuItemLabel>
								</MenuItem>
							</Menu>
						),
						headerTitleStyle: { color: colors.onPrimary },
						headerTintColor: colors.onPrimary,
						headerStyle: { backgroundColor: colors.primary },
						headerShown: true,
					}}
				/>

				{selectedItem && (
					<View className="absolute top-0" style={{ left: -9999 }} pointerEvents="none">
						<AartiShareCard
							ref={shareCardRef}
							item={selectedItem}
							translate={translate}
							fontSize={fontSize}
							isDark={displayMode === 'dark'}
						/>
					</View>
				)}

				<GestureDetector gesture={swipeGesture}>
					<Animated.View className="pt-2 px-5 h-full" style={animatedStyle}>
						{/* Scroll area */}
						<View
							className="flex-1"
							onLayout={(e) => {
								const h = e.nativeEvent.layout.height;
								scrollAreaH.value = h;
								if (bandTop.value === 0) {
									bandTop.value = h * 0.3;
									setBandTopJS(h * 0.3);
								}
							}}
						>
							<Animated.ScrollView
								ref={animScrollRef}
								scrollEventThrottle={16}
								onScroll={(e) => {
									if (!isAutoScrolling.value)
										scrollY.value = e.nativeEvent.contentOffset.y;
								}}
								onScrollBeginDrag={() => {
									isAutoScrolling.value = false;
									cancelAnimation(scrollY);
									setAutoScroll(false);
								}}
								onContentSizeChange={(_, h) => {
									contentH.value = h;
								}}
								onLayout={(evt) => {
									const { height, y } = evt.nativeEvent.layout;
									containerH.value = height;
									setScrollHeight(Math.round(height) - y - fontSize);
								}}
							>
								<Text
									style={[
										{
											color: colors.text,
											fontSize,
											paddingTop: focusMode ? bandTopJS : 0,
										},
										fontStyle[
											translate === 'original' ? 'fontOriginal' : 'fontItalic'
										],
									]}
								>
									{selectedItem?.body[translate]}
								</Text>
								<Text
									className="text-xs text-center pb-3"
									style={{ color: colors.text, paddingTop: scrollHeight }}
								>
									संचित नयनरेखा ठेवण्यासाठी जागा सोडली आहे.
								</Text>
							</Animated.ScrollView>

							{/* Focus mode overlay */}
							{focusMode && (
								<>
									{/* Dim above band */}
									<Animated.View
										pointerEvents="none"
										className="absolute left-0 right-0 top-0"
										style={[
											topDimStyle,
											{ backgroundColor: colors.background, opacity: 0.88 },
										]}
									/>

									{/* Focus band — transparent window with border */}
									<Animated.View
										className="absolute left-0 right-0 border-t-[1.5px] border-b-[1.5px]"
										style={[
											bandContainerStyle,
											{ borderColor: colors.primary },
										]}
										pointerEvents="none"
									/>

									{/* Dim below band */}
									<Animated.View
										pointerEvents="none"
										className="absolute left-0 right-0 top-0"
										style={[
											bottomDimStyle,
											{
												bottom: 0,
												backgroundColor: colors.background,
												opacity: 0.88,
											},
										]}
									/>

									{/* Band controls — below the band */}
									<Animated.View
										className="absolute left-0 right-0 flex-row items-center justify-between pt-1"
										style={bandControlsStyle}
										pointerEvents="box-none"
									>
										{/* Right: line count control */}
										<View
											className="flex-row items-center rounded-[20px] px-1.5 py-[3px] mr-2.5 gap-1"
											style={{
												borderWidth: 0.5,
												backgroundColor: colors.surface,
												borderColor: colors.border,
											}}
										>
											<TouchableOpacity
												onPress={() =>
													setFocusLineCount((c) => Math.max(1, c - 1))
												}
												className="px-1.5 py-0.5"
												style={{ opacity: focusLineCount <= 1 ? 0.3 : 1 }}
												disabled={focusLineCount <= 1}
											>
												<Text
													className="text-lg font-bold leading-[22px]"
													style={{ color: colors.primary }}
												>
													−
												</Text>
											</TouchableOpacity>
											<Text
												className="text-[11px] font-semibold min-w-[18px] text-center"
												style={{ color: colors.text }}
											>
												{focusLineCount}L
											</Text>
											<TouchableOpacity
												onPress={() =>
													setFocusLineCount((c) => Math.min(6, c + 1))
												}
												className="px-1.5 py-0.5"
												style={{ opacity: focusLineCount >= 6 ? 0.3 : 1 }}
												disabled={focusLineCount >= 6}
											>
												<Text
													className="text-lg font-bold leading-[22px]"
													style={{ color: colors.primary }}
												>
													+
												</Text>
											</TouchableOpacity>
										</View>
										{/* Left: drag grip */}
										<GestureDetector gesture={bandDragGesture}>
											<View className="py-2.5 px-3.5 justify-center items-center">
												<Text
													className="text-xl"
													style={{ lineHeight: 22, color: colors.primary }}
												>
													⠿
												</Text>
											</View>
										</GestureDetector>
									</Animated.View>
								</>
							)}
						</View>

						{/* Speed control bar — only when auto-scrolling */}
						{autoScroll && (
							<View
								className="flex-row items-center justify-center border rounded-[10px] py-0.5 px-3 mb-1.5 gap-4"
								style={{
									borderColor: colors.border,
									backgroundColor: colors.surface,
								}}
							>
								<TouchableOpacity
									className="px-2 py-0.5"
									style={{ opacity: scrollSpeed <= SPEED_MIN ? 0.3 : 1 }}
									onPress={() =>
										setScrollSpeed((s) => Math.max(SPEED_MIN, s - SPEED_STEP))
									}
									disabled={scrollSpeed <= SPEED_MIN}
								>
									<Text
										className="text-[22px] font-bold leading-7"
										style={{ color: colors.primary }}
									>
										−
									</Text>
								</TouchableOpacity>
								<Text
									className="text-[13px] font-semibold min-w-[60px] text-center"
									style={{ color: colors.text }}
								>
									{scrollSpeed} px/s
								</Text>
								<TouchableOpacity
									className="px-2 py-0.5"
									style={{ opacity: scrollSpeed >= SPEED_MAX ? 0.3 : 1 }}
									onPress={() =>
										setScrollSpeed((s) => Math.min(SPEED_MAX, s + SPEED_STEP))
									}
									disabled={scrollSpeed >= SPEED_MAX}
								>
									<Text
										className="text-[22px] font-bold leading-7"
										style={{ color: colors.primary }}
									>
										+
									</Text>
								</TouchableOpacity>
							</View>
						)}

						{/* Bottom action bar */}
						<View
							className="flex-row items-center rounded-xl py-1 mb-1.5"
							style={{ borderWidth: 0.5, borderColor: colors.border, backgroundColor: colors.surface }}
						>
							<View className="flex-row flex-1 items-center justify-center">
								<IconBtn
									icon={autoScroll ? 'pause-circle' : 'play-circle-outline'}
									size={26}
									style={iconButtonReset}
									iconColor={autoScroll ? colors.primary : colors.text}
									onPress={() => setAutoScroll((v) => !v)}
								/>

								<IconBtn
									icon={focusMode ? 'eye' : 'eye-outline'}
									size={26}
									style={iconButtonReset}
									iconColor={focusMode ? colors.primary : colors.text}
									onPress={() => setFocusMode((v) => !v)}
								/>
							</View>
							<View className="flex-row flex-1 items-center justify-center">
								<IconBtn
									icon="minus-circle-outline"
									size={26}
									style={iconButtonReset}
									iconColor={colors.text}
									onPress={() => fontSize > 15 && setFontSize(fontSize - 3)}
								/>
								<Text
									className="text-[13px] font-semibold min-w-6 text-center"
									style={{ color: colors.text }}
								>
									{fontSize}
								</Text>
								<IconBtn
									icon="plus-circle-outline"
									size={26}
									style={iconButtonReset}
									iconColor={colors.text}
									onPress={() => fontSize < 40 && setFontSize(fontSize + 3)}
								/>
							</View>
							<View className="flex-row flex-1 items-center justify-center">
								<IconBtn
									icon={isFav ? 'heart' : 'heart-outline'}
									style={iconButtonReset}
									iconColor={isFav ? colors.accent : colors.text}
									onPress={() => {
										toggleFavorite(selectedItem);
									}}
								/>

								<Menu
									trigger={(triggerProps) => (
										<IconBtn
											{...triggerProps}
											icon="dots-vertical"
											size={26}
											style={iconButtonReset}
											iconColor={colors.text}
										/>
									)}
									placement="top right"
									useRNModal
									offset={4}
									style={{ backgroundColor: colors.surface }}
									closeOnSelect
								>
									<MenuItem
										key="translate"
										textValue="Translate"
										onPress={() =>
											setTranslate(
												translate === 'original'
													? 'transliteration'
													: 'original',
											)
										}
									>
										<MaterialCommunityIcons
											name={
												translate === 'original' ? 'translate' : 'translate-off'
											}
											size={18}
											color={colors.text}
											style={{ marginRight: 12 }}
										/>
										<MenuItemLabel style={{ color: colors.text }}>
											{translate === 'original'
												? 'Transliteration'
												: 'Original'}
										</MenuItemLabel>
									</MenuItem>
									<MenuItem
										key="edit"
										textValue="Edit"
										onPress={() =>
											selectedItem &&
											router.push(`/add-aarti/${selectedItem.key}`)
										}
									>
										<MaterialCommunityIcons
											name="pencil-outline"
											size={18}
											color={colors.text}
											style={{ marginRight: 12 }}
										/>
										<MenuItemLabel style={{ color: colors.text }}>
											Edit
										</MenuItemLabel>
									</MenuItem>
									<MenuItem
										key="delete"
										textValue="Delete"
										onPress={deletePress}
									>
										<MaterialCommunityIcons
											name="delete-outline"
											size={18}
											color={colors.accent}
											style={{ marginRight: 12 }}
										/>
										<MenuItemLabel style={{ color: colors.accent }}>
											Delete
										</MenuItemLabel>
									</MenuItem>
								</Menu>
							</View>
						</View>

						{aartis.length > 1 && (
							<View className="flex-row justify-between items-center pb-2">
								<Text
									className="text-xs"
									style={{ color: colors.border, opacity: displayIndex > 0 ? 1 : 0 }}
								>
									‹ prev
								</Text>
								<Text className="text-xs" style={{ color: colors.border }}>
									{displayIndex + 1} / {aartis.length}
								</Text>
								<Text
									className="text-xs"
									style={{
										color: colors.border,
										opacity: displayIndex < aartis.length - 1 ? 1 : 0,
									}}
								>
									next ›
								</Text>
							</View>
						)}
					</Animated.View>
				</GestureDetector>
			</View>
		</>
	);
};

export default AartiView;
