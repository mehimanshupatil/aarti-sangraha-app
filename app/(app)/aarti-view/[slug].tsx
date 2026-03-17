import React, { useEffect, useRef, useState } from 'react';
import {
	Alert,
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { IconButton, Menu } from 'react-native-paper';
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
	const [shareMenuVisible, setShareMenuVisible] = useState(false);
	const [overflowMenuVisible, setOverflowMenuVisible] = useState(false);

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
		setOverflowMenuVisible(false);
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
			<View style={{ flex: 1, backgroundColor: colors.background }}>
				<Stack.Screen
					options={{
						title: selectedItem?.title[translate],
						headerRight: () => (
							<Menu
								visible={shareMenuVisible}
								onDismiss={() => setShareMenuVisible(false)}
								contentStyle={{ backgroundColor: colors.surface }}
								anchor={
									<IconButton
										icon="share-variant"
										size={24}
										iconColor={colors.onPrimary}
										onPress={() => setShareMenuVisible(true)}
									/>
								}
							>
								<Menu.Item
									title="Share as Text"
									leadingIcon="text"
									titleStyle={{ color: colors.text }}
									onPress={() => {
										setShareMenuVisible(false);
										shareAarti(selectedItem);
									}}
								/>
								<Menu.Item
									title="Share as Image"
									leadingIcon="image"
									titleStyle={{ color: colors.text }}
									onPress={() => {
										setShareMenuVisible(false);
										shareAsImage();
									}}
								/>
							</Menu>
						),
						headerTitleStyle: { color: colors.onPrimary },
						headerTintColor: colors.onPrimary,
						headerStyle: { backgroundColor: colors.primary },
						headerShown: true,
					}}
				/>

				{selectedItem && (
					<View style={styles.offScreen} pointerEvents="none">
						<AartiShareCard
							ref={shareCardRef}
							item={selectedItem}
							translate={translate}
							fontSize={fontSize}
							isDark={displayMode === "dark"}
						/>
					</View>
				)}

				<GestureDetector gesture={swipeGesture}>
					<Animated.View style={[styles.container, animatedStyle]}>
						{/* Scroll area */}
						<View
							style={{ flex: 1 }}
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
									style={[
										{ color: colors.text, paddingTop: scrollHeight },
										styles.helperText,
									]}
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
										style={[
											styles.dimLayer,
											topDimStyle,
											{ backgroundColor: colors.background, opacity: 0.88 },
										]}
									/>

									{/* Focus band — transparent window with border */}
									<Animated.View
										style={[
											styles.bandContainer,
											bandContainerStyle,
											{ borderColor: colors.primary },
										]}
										pointerEvents="none"
									/>

									{/* Dim below band */}
									<Animated.View
										pointerEvents="none"
										style={[
											styles.dimLayer,
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
										style={[styles.bandControls, bandControlsStyle]}
										pointerEvents="box-none"
									>
										{/* Right: line count control */}
										<View
											style={[
												styles.lineControl,
												{
													backgroundColor: colors.surface,
													borderColor: colors.border,
												},
											]}
										>
											<TouchableOpacity
												onPress={() =>
													setFocusLineCount((c) => Math.max(1, c - 1))
												}
												style={[
													styles.lineBtn,
													{ opacity: focusLineCount <= 1 ? 0.3 : 1 },
												]}
												disabled={focusLineCount <= 1}
											>
												<Text
													style={[
														styles.lineBtnText,
														{ color: colors.primary },
													]}
												>
													−
												</Text>
											</TouchableOpacity>
											<Text
												style={[styles.lineCountText, { color: colors.text }]}
											>
												{focusLineCount}L
											</Text>
											<TouchableOpacity
												onPress={() =>
													setFocusLineCount((c) => Math.min(6, c + 1))
												}
												style={[
													styles.lineBtn,
													{ opacity: focusLineCount >= 6 ? 0.3 : 1 },
												]}
												disabled={focusLineCount >= 6}
											>
												<Text
													style={[
														styles.lineBtnText,
														{ color: colors.primary },
													]}
												>
													+
												</Text>
											</TouchableOpacity>
										</View>
										{/* Left: drag grip */}
										<GestureDetector gesture={bandDragGesture}>
											<View style={styles.dragHandle}>
												<Text
													style={[styles.gripIcon, { color: colors.primary }]}
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
								style={[
									styles.speedBar,
									{
										borderColor: colors.border,
										backgroundColor: colors.surface,
									},
								]}
							>
								<TouchableOpacity
									style={[
										styles.speedBtn,
										{ opacity: scrollSpeed <= SPEED_MIN ? 0.3 : 1 },
									]}
									onPress={() =>
										setScrollSpeed((s) => Math.max(SPEED_MIN, s - SPEED_STEP))
									}
									disabled={scrollSpeed <= SPEED_MIN}
								>
									<Text
										style={[styles.speedBtnText, { color: colors.primary }]}
									>
										−
									</Text>
								</TouchableOpacity>
								<Text style={[styles.speedLabel, { color: colors.text }]}>
									{scrollSpeed} px/s
								</Text>
								<TouchableOpacity
									style={[
										styles.speedBtn,
										{ opacity: scrollSpeed >= SPEED_MAX ? 0.3 : 1 },
									]}
									onPress={() =>
										setScrollSpeed((s) => Math.min(SPEED_MAX, s + SPEED_STEP))
									}
									disabled={scrollSpeed >= SPEED_MAX}
								>
									<Text
										style={[styles.speedBtnText, { color: colors.primary }]}
									>
										+
									</Text>
								</TouchableOpacity>
							</View>
						)}

						{/* Bottom action bar */}
						<View
							style={[
								styles.bottomBar,
								{ borderColor: colors.border, backgroundColor: colors.surface },
							]}
						>
							<View style={styles.barSlot}>
								<IconButton
									icon={autoScroll ? 'pause-circle' : 'play-circle-outline'}
									size={26}
									style={iconButtonReset}
									iconColor={autoScroll ? colors.primary : colors.text}
									onPress={() => setAutoScroll((v) => !v)}
								/>

								<IconButton
									icon={focusMode ? 'eye' : 'eye-outline'}
									size={26}
									style={iconButtonReset}
									iconColor={focusMode ? colors.primary : colors.text}
									onPress={() => setFocusMode((v) => !v)}
								/>
							</View>
							<View style={[styles.barSlot, styles.fontGroup]}>
								<IconButton
									icon="minus-circle-outline"
									size={26}
									style={iconButtonReset}
									iconColor={colors.text}
									onPress={() => fontSize > 15 && setFontSize(fontSize - 3)}
								/>
								<Text style={[styles.fontSizeLabel, { color: colors.text }]}>
									{fontSize}
								</Text>
								<IconButton
									icon="plus-circle-outline"
									size={26}
									style={iconButtonReset}
									iconColor={colors.text}
									onPress={() => fontSize < 40 && setFontSize(fontSize + 3)}
								/>
							</View>
							<View style={styles.barSlot}>
								<IconButton
									icon={isFav ? 'heart' : 'heart-outline'}
									style={iconButtonReset}
									iconColor={isFav ? colors.accent : colors.text}
									onPress={() => {
										setOverflowMenuVisible(false);
										toggleFavorite(selectedItem);
									}}
								/>

								<Menu
									visible={overflowMenuVisible}
									onDismiss={() => setOverflowMenuVisible(false)}
									contentStyle={{ backgroundColor: colors.surface }}
									anchor={
										<IconButton
											icon="dots-vertical"
											size={26}
											style={iconButtonReset}
											iconColor={colors.text}
											onPress={() => setOverflowMenuVisible(true)}
										/>
									}
								>
									<Menu.Item
										title={
											translate === 'original' ? 'Transliteration' : 'Original'
										}
										leadingIcon={
											translate === 'original' ? 'translate' : 'translate-off'
										}
										titleStyle={{ color: colors.text }}
										onPress={() => {
											setOverflowMenuVisible(false);
											setTranslate(
												translate === 'original'
													? 'transliteration'
													: 'original',
											);
										}}
									/>
									<Menu.Item
										title="Edit"
										leadingIcon="pencil-outline"
										titleStyle={{ color: colors.text }}
										onPress={() => {
											setOverflowMenuVisible(false);
											selectedItem &&
												router.push(`/add-aarti/${selectedItem.key}`);
										}}
									/>
									<Menu.Item
										title="Delete"
										leadingIcon="delete-outline"
										titleStyle={{ color: colors.accent }}
										onPress={deletePress}
									/>
								</Menu>
							</View>
						</View>

						{aartis.length > 1 && (
							<View style={styles.swipeHint}>
								<Text
									style={[
										styles.hintText,
										{ color: colors.border, opacity: displayIndex > 0 ? 1 : 0 },
									]}
								>
									‹ prev
								</Text>
								<Text style={[styles.hintText, { color: colors.border }]}>
									{displayIndex + 1} / {aartis.length}
								</Text>
								<Text
									style={[
										styles.hintText,
										{
											color: colors.border,
											opacity: displayIndex < aartis.length - 1 ? 1 : 0,
										},
									]}
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

const styles = StyleSheet.create({
	offScreen: { position: 'absolute', left: -9999, top: 0 },
	container: { paddingTop: 8, paddingHorizontal: 20, height: '100%' },
	helperText: { fontSize: 12, textAlign: 'center', paddingBottom: 12 },

	// Focus overlay
	dimLayer: { position: 'absolute', left: 0, right: 0, top: 0 },
	bandContainer: {
		position: 'absolute',
		left: 0,
		right: 0,
		borderTopWidth: 1.5,
		borderBottomWidth: 1.5,
	},
	bandControls: {
		position: 'absolute',
		left: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 4,
	},
	dragHandle: {
		paddingVertical: 10,
		paddingHorizontal: 14,
		justifyContent: 'center',
		alignItems: 'center',
	},
	gripIcon: { fontSize: 20, lineHeight: 22 },
	lineControl: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 20,
		paddingHorizontal: 6,
		paddingVertical: 3,
		marginRight: 10,
		gap: 4,
	},
	lineBtn: { paddingHorizontal: 6, paddingVertical: 2 },
	lineBtnText: { fontSize: 18, fontWeight: 'bold', lineHeight: 22 },
	lineCountText: {
		fontSize: 11,
		fontWeight: '600',
		minWidth: 18,
		textAlign: 'center',
	},

	// Speed bar
	speedBar: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 10,
		paddingVertical: 2,
		paddingHorizontal: 12,
		marginBottom: 6,
		gap: 16,
	},
	speedBtn: { paddingHorizontal: 8, paddingVertical: 2 },
	speedBtnText: { fontSize: 22, fontWeight: 'bold', lineHeight: 28 },
	speedLabel: {
		fontSize: 13,
		fontWeight: '600',
		minWidth: 60,
		textAlign: 'center',
	},

	// Bottom bar
	bottomBar: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 12,
		paddingVertical: 4,
		marginBottom: 6,
	},
	barSlot: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	fontGroup: { flexDirection: 'row', alignItems: 'center' },
	fontSizeLabel: {
		fontSize: 13,
		fontWeight: '600',
		minWidth: 24,
		textAlign: 'center',
	},

	swipeHint: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingBottom: 8,
	},
	hintText: { fontSize: 12 },
});

export default AartiView;
