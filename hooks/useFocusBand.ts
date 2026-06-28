import { useEffect, useState } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useDataStore } from '../store/store';

const LINE_HEIGHT_RATIO = 1.65;
const LINE_COUNT_MIN = 1;
const LINE_COUNT_MAX = 6;

/**
 * Manages all focus-band state: shared values, JS/worklet sync, animated
 * overlay styles, and the drag gesture. Callers receive a thin surface:
 * position, line count controls, styles, and a layout callback.
 */
export function useFocusBand() {
	const fontSize = useDataStore((s) => s.fontSize);

	const scrollAreaH = useSharedValue(0);
	const bandTop = useSharedValue(0);
	const bandHeight = useSharedValue(0);
	const bandDragStart = useSharedValue(0);
	const [bandTopJS, setBandTopJS] = useState(0);
	const [focusLineCount, setFocusLineCount] = useState(3);

	// Init bandTop to 30% of scroll area on first measurement
	useAnimatedReaction(
		() => scrollAreaH.value,
		(h) => {
			if (h > 0 && bandTop.value === 0) {
				const initial = h * 0.3;
				bandTop.value = initial;
				scheduleOnRN(setBandTopJS, initial);
			}
		},
	);

	// Keep bandHeight in sync with line count and font size
	useEffect(() => {
		bandHeight.value = focusLineCount * fontSize * LINE_HEIGHT_RATIO;
	}, [focusLineCount, fontSize]);

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

	const bandDragGesture = Gesture.Pan()
		.activeOffsetY([-4, 4])
		.onBegin(() => {
			bandDragStart.value = bandTop.value;
		})
		.onUpdate((e) => {
			const maxTop = scrollAreaH.value - bandHeight.value;
			bandTop.value = Math.max(0, Math.min(bandDragStart.value + e.translationY, maxTop));
		})
		.onEnd(() => {
			scheduleOnRN(setBandTopJS, bandTop.value);
		});

	return {
		bandTopJS,
		focusLineCount,
		canDecrementLines: focusLineCount > LINE_COUNT_MIN,
		canIncrementLines: focusLineCount < LINE_COUNT_MAX,
		decrementLines: () => setFocusLineCount((c) => Math.max(LINE_COUNT_MIN, c - 1)),
		incrementLines: () => setFocusLineCount((c) => Math.min(LINE_COUNT_MAX, c + 1)),
		topDimStyle,
		bandContainerStyle,
		bandControlsStyle,
		bottomDimStyle,
		bandDragGesture,
		onScrollAreaLayout: (h: number) => {
			scrollAreaH.value = h;
		},
	};
}
