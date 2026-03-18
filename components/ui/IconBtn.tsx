import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
	icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
	size?: number;
	iconColor?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	className?: string;
	disabled?: boolean;
};

const IconBtn = React.forwardRef<View, Props>(
	({ icon, size = 24, iconColor = '#000', onPress, style, className, disabled, ...rest }, ref) => (
		<Pressable
			ref={ref}
			onPress={onPress}
			disabled={disabled}
			className={className}
			style={({ pressed }) => [
				styles.base,
				style,
				pressed && styles.pressed,
				disabled && styles.disabled,
			]}
			android_ripple={{
				color: 'rgba(0,0,0,0.1)',
				borderless: true,
				radius: size,
			}}
			{...rest}
		>
			<MaterialCommunityIcons name={icon} size={size} color={iconColor} />
		</Pressable>
	),
);

IconBtn.displayName = 'IconBtn';

const styles = StyleSheet.create({
	base: { padding: 8, alignItems: 'center', justifyContent: 'center' },
	pressed: { opacity: 0.7 },
	disabled: { opacity: 0.4 },
});

export default IconBtn;
