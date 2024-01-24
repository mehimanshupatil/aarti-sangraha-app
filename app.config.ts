import { ExpoConfig, ConfigContext } from 'expo/config';


export default ({ config }: ConfigContext): ExpoConfig => {

  return ({
    ...config,
    "name": "आरती संग्रह",
    "slug": "aartisangraha",
    "privacy": "unlisted",
    "scheme": "aartisangraha",
    "version": "1.0.0",
    "orientation": "default",
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
      "versionCode": 16,
      "permissions": [],
      "userInterfaceStyle": "automatic",
      "splash": {
        "ldpi": "./assets/splash/drawable-ldpi.png",
        "mdpi": "./assets/splash/drawable-mdpi.png",
        "hdpi": "./assets/splash/drawable-hdpi.png",
        "xhdpi": "./assets/splash/drawable-xhdpi.png",
        "xxhdpi": "./assets/splash/drawable-xxhdpi.png",
        "xxxhdpi": "./assets/splash/drawable-xxxhdpi.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffde5b"
      }
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
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true,
      "baseUrl": ""
    }
  })
};
