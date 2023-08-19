import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import MyDrawer from '../routes/Drawer'; 
import * as SplashScreen from 'expo-splash-screen'; 
 
function EntryComponent() {
  const [isLoaded, setIsLoaded] = useState(false);
 
  useEffect(() => {
    const getData = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    getData().then((x) => {
      setIsLoaded(true);
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

export default EntryComponent;
