import { ExpoConfig, ConfigContext } from 'expo/config';


export default ({ config }: ConfigContext): ExpoConfig => {

  return ({
    ...config,
    "name": "आरती संग्रह",
    "slug": "aartisangraha",
    "scheme": "aartisangraha",
    "version": "1.0.0",
    "orientation": "default",
    "userInterfaceStyle": "automatic",
    "icon": "./assets/icon.png",
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.mehimanshupatil.aartisangraha",
      "versionCode": 21,
      "permissions": [],
      "userInterfaceStyle": "automatic"
    },
    "extra": {
      "eas": {
        "projectId": "558c0ad3-5c21-4264-8630-94f9a48c12fc"
      }
    },
    "web": {
      "bundler": "metro",
      "output": "static"
    },
    "plugins": [
      "expo-router",
      "expo-font",
      "expo-sharing",
      [
        "expo-splash-screen",
        {
          "image": "./assets/splash-icon.png",
          "resizeMode": "contain",
          "backgroundColor": "#ffde5b"
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "baseUrl": "",
      "reactCompiler": true
    }
  })
};
