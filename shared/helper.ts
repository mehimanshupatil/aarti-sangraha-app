import { Platform, Share } from 'react-native';
import { singleItemType } from './types';
import * as Clipboard from 'expo-clipboard';

export const onShare = async (aarti: singleItemType | undefined) => {
    try {
      if (!aarti) return;

      const message = `*${aarti.title}*
  
      ${aarti.body}
      
      \`\`\`Download Aarti Sangrah from Play Store / Samsung Galaxy Store.
      
      https://galaxy.store/aarti
      
      https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha \`\`\``

      if (Platform.OS === "web") {
        await Clipboard.setStringAsync(message)
        alert(`The following message was copied to your clipboard.\n\n${message}`)
        return
      }

      Share.share({    message   });
    } catch (error) {
      alert(error);
    }
  };