import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import * as Sharing from 'expo-sharing';
import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Dimensions,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
	cancelAnimation,
	Easing,
	scrollTo,
	useAnimatedReaction,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import { captureRef } from 'react-native-view-shot';
import { scheduleOnRN } from 'react-native-worklets';
import AartiShareCard from '../../../components/AartiShareCard';
import IconBtn from '../../../components/ui/IconBtn';
import { Menu, MenuItem, MenuItemLabel } from '../../../components/ui/menu';
import { useFocusBand } from '../../../hooks/useFocusBand';
import { findAartiBySlug } from '../../../shared/aarti';
import { shareAarti } from '../../../shared/helper';
import { getFontStyle, iconButtonReset } from '../../../shared/styles';
import { singleItemType, useAppTheme } from '../../../shared/types';
import data from '../../../store/data';
import {
	useDataStore,
	useDataStoreActions,
	useUIStoreActions,
} from '../../../store/store';

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

const AartiView: React.FC = () => {
	useKeepAwake();

	const { slug } = useLocalSearchParams();
	const [scrollHeight, setScrollHeight] = useState(0);
	const [autoScroll, setAutoScroll] = useState(false);
	const [focusMode, setFocusMode] = useState(false);
	const [scrollSpeed, setScrollSpeed] = useState(SPEED_DEFAULT);

	const { colors } = useAppTheme();
	const aartis = useDataStore((s) => s.aartis);
	const fontSize = useDataStore((s) => s.fontSize);
	const favoritesKeys = useDataStore((s) => s.favoritesKeys);
	const translate = useDataStore((s) => s.translate);

	const { toggleFav, deleteAarti, addToRecentlyViewed } = useDataStoreActions();
	const { setFontSize, setTranslate } = useUIStoreActions();

	const initialIndex = findAartiBySlug(aartis, (slug ?? '') as string);
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

	const {
		bandTopJS,
		focusLineCount,
		canDecrementLines,
		canIncrementLines,
		decrementLines,
		incrementLines,
		topDimStyle,
		bandContainerStyle,
		bandControlsStyle,
		bottomDimStyle,
		bandDragGesture,
		onScrollAreaLayout,
	} = useFocusBand();

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
		paddingTop: 8,
		paddingLeft: 20,
		paddingRight: 20,
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
										className="mr-3"
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
										className="mr-3"
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
					<View
						className="absolute top-0"
						style={{ left: -9999 }}
						pointerEvents="none"
					>
						<AartiShareCard ref={shareCardRef} item={selectedItem} />
					</View>
				)}

				<GestureDetector gesture={swipeGesture}>
					<Animated.View className="pt-2 px-5 h-full" style={animatedStyle}>
						{/* Scroll area */}
						<View
							className="flex-1"
							onLayout={(e) => onScrollAreaLayout(e.nativeEvent.layout.height)}
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
										getFontStyle(translate),
									]}
								>
									{selectedItem?.body[translate]}
								</Text>
								<Text
									className="text-xs text-center pb-3"
									style={{ paddingTop: scrollHeight, color: colors.text }}
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
										className="absolute inset-x-0 top-0 opacity-[0.88]"
										style={[{ backgroundColor: colors.background }, topDimStyle]}
									/>

									{/* Focus band — transparent window with border */}
									<Animated.View
										className="absolute inset-x-0"
										style={[
											{ borderTopWidth: 1.5, borderBottomWidth: 1.5, borderColor: colors.primary },
											bandContainerStyle,
										]}
										pointerEvents="none"
									/>

									{/* Dim below band */}
									<Animated.View
										pointerEvents="none"
										className="absolute inset-x-0 top-0 bottom-0 opacity-[0.88]"
										style={[{ backgroundColor: colors.background }, bottomDimStyle]}
									/>

									{/* Band controls — below the band */}
									<Animated.View
										className="absolute inset-x-0 flex-row items-center justify-between pt-1"
										style={bandControlsStyle}
										pointerEvents="box-none"
									>
										{/* Right: line count control */}
										<View
											className="flex-row items-center rounded-[20px] px-1.5 py-[3px] mr-2.5 gap-1"
											style={{ borderWidth: 0.5, backgroundColor: colors.surface, borderColor: colors.border }}
										>
											<TouchableOpacity
												onPress={decrementLines}
												className="px-1.5 py-0.5"
												style={{ opacity: canDecrementLines ? 1 : 0.3 }}
												disabled={!canDecrementLines}
											>
												<Text className="text-lg font-bold leading-[22px]" style={{ color: colors.primary }}>
													−
												</Text>
											</TouchableOpacity>
											<Text className="text-[11px] font-semibold min-w-[18px] text-center" style={{ color: colors.text }}>
												{focusLineCount}L
											</Text>
											<TouchableOpacity
												onPress={incrementLines}
												className="px-1.5 py-0.5"
												style={{ opacity: canIncrementLines ? 1 : 0.3 }}
												disabled={!canIncrementLines}
											>
												<Text className="text-lg font-bold leading-[22px]" style={{ color: colors.primary }}>
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
								style={{ borderColor: colors.border, backgroundColor: colors.surface }}
							>
								<TouchableOpacity
									className="px-2 py-0.5"
									style={{ opacity: scrollSpeed <= SPEED_MIN ? 0.3 : 1 }}
									onPress={() =>
										setScrollSpeed((s) => Math.max(SPEED_MIN, s - SPEED_STEP))
									}
									disabled={scrollSpeed <= SPEED_MIN}
								>
									<Text className="text-[22px] font-bold leading-7" style={{ color: colors.primary }}>
										−
									</Text>
								</TouchableOpacity>
								<Text className="text-[13px] font-semibold min-w-[60px] text-center" style={{ color: colors.text }}>
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
									<Text className="text-[22px] font-bold leading-7" style={{ color: colors.primary }}>
										+
									</Text>
								</TouchableOpacity>
							</View>
						)}

						{/* Bottom action bar */}
						<View
							className="flex-row items-center rounded-xl py-1 mb-1.5"
							style={{ borderWidth: 0.5, backgroundColor: colors.surface, borderColor: colors.border }}
						>
							<View className="flex-row flex-1 items-center justify-evenly">
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
							<View className="flex-row flex-1 items-center justify-evenly">
								<IconBtn
									icon="minus-circle-outline"
									size={26}
									style={iconButtonReset}
									iconColor={colors.text}
									onPress={() => fontSize > 15 && setFontSize(fontSize - 3)}
								/>
								<Text className="text-[13px] font-semibold min-w-6 text-center" style={{ color: colors.text }}>
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
							<View className="flex-row flex-1 items-center justify-evenly">
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
											className="mr-3"
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
											className="mr-3"
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
											className="mr-3"
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
									style={{ opacity: displayIndex > 0 ? 1 : 0, color: colors.border }}
								>
									‹ prev
								</Text>
								<Text className="text-xs" style={{ color: colors.border }}>
									{displayIndex + 1} / {aartis.length}
								</Text>
								<Text
									className="text-xs"
									style={{ opacity: displayIndex < aartis.length - 1 ? 1 : 0, color: colors.border }}
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
