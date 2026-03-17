import { Tabs } from 'expo-router';
import { Icon } from 'react-native-paper';
import Header from '../../../components/Header';
import { useAppTheme } from '../../../shared/types';
import { useUIStoreActions } from '../../../store/store';

export default function TabLayout() {
	const { colors } = useAppTheme();
	const { setShowSearch, setSearchValue } = useUIStoreActions();

	const resetSearch = () => {
		setShowSearch(false);
		setSearchValue('');
	};

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: { backgroundColor: colors.surface },
				tabBarActiveTintColor: colors.accent,
				tabBarInactiveTintColor: colors.text,
				animation: 'shift',
			}}
			screenListeners={{ tabPress: resetSearch }}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					header: () => <Header title="आरती संग्रह" showSearchButton />,
					tabBarIcon: ({ color, size }) => (
						<Icon source="home-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: 'Favorites',
					header: () => <Header title="Favorites" showSearchButton />,
					tabBarIcon: ({ color, size }) => (
						<Icon source="heart-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="recent"
				options={{
					title: 'Recent',
					header: () => <Header title="Recent" showSearchButton />,
					tabBarIcon: ({ color, size }) => (
						<Icon source="history" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: 'About',
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.onPrimary,
					tabBarIcon: ({ color, size }) => (
						<Icon source="information-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: 'Setting',
					headerStyle: { backgroundColor: colors.primary },
					headerTintColor: colors.onPrimary,
					tabBarIcon: ({ color, size }) => (
						<Icon source="nut" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
