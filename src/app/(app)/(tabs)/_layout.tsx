import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
				sceneStyle: { backgroundColor: colors.background },
			}}
			screenListeners={{ tabPress: resetSearch }}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					header: () => <Header title="आरती संग्रह" showSearchButton />,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="home-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="favorites"
				options={{
					title: 'Favorites',
					header: () => <Header title="Favorites" showSearchButton />,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="heart-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="recent"
				options={{
					title: 'Recent',
					header: () => <Header title="Recent" showSearchButton />,
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="history" size={size} color={color} />
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
						<MaterialCommunityIcons
							name="information-outline"
							size={size}
							color={color}
						/>
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
						<MaterialCommunityIcons
							name="cog-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
