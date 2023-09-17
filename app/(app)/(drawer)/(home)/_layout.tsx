import { Tabs } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { useAppTheme } from '../../../../shared/types';

export default function HomeLayout() {
  const { colors } = useAppTheme();

  return <Tabs
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.text
      },
      tabBarActiveTintColor: colors.background,
      tabBarInactiveTintColor: colors.background + '80',
    }}

  >
    <Tabs.Screen name='index' options={{
      title: 'Home',
      tabBarIcon: ({ color, size }) => {
        return <IconButton icon='home-outline' size={size} iconColor={color} />
      }
    }} />
    <Tabs.Screen name='favorites' options={{
      title: 'Favorites',
      tabBarIcon: ({ color, size }) => {
        return <IconButton icon='heart-outline' size={size} iconColor={color} />
      }
    }} />
  </Tabs>;
}
