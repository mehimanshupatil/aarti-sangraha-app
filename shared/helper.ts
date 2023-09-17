import { Share } from 'react-native';
import { singleItemType } from './types';

export const onShare = (aarti: singleItemType | undefined) => {
    try {
      if (!aarti) return;
      Share.share({
        message: `*${aarti.title}*
  
  ${aarti.body}
  
  \`\`\`Download Aarti Sangrah from Play Store / Samsung Galaxy Store.
  
  https://galaxy.store/aarti
  
  https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha \`\`\``,
      });
    } catch (error) {
      alert(error);
    }
  };