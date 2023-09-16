import { Tabs } from 'expo-router';

export default function HomeLayout() {
  return <Tabs>
    <Tabs.Screen name='index' options={{  headerShown: false   }} />
    <Tabs.Screen name='favorites' options={{  headerShown: false   }} />
  </Tabs>;
}
