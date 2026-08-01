import { Platform, Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import { domainUrl } from "./const";
import type { singleItemType } from "./types";

const STORE_URLS = {
	playStore:
		"https://play.google.com/store/apps/details?id=com.mehimanshupatil.aartisangraha",
	galaxyStore: "https://galaxy.store/aarti",
};

export const shareAarti = async (aarti: singleItemType | undefined) => {
	if (!aarti) return;
	const message = `*${aarti.title.original}*\n\n${aarti.body.original}\n\n\`\`\`Download Aarti Sangrah\n${STORE_URLS.playStore}\n\nor view web Version ${domainUrl}\`\`\``;
	try {
		if (Platform.OS === "web") {
			await Clipboard.setStringAsync(message);
			alert(`Copied to clipboard.\n\n${message}`);
			return;
		}
		Share.share({ message });
	} catch (error) {
		alert(error instanceof Error ? error.message : "Share failed");
	}
};

export const shareApp = async () => {
	const message = `Hey there! Get Aarti Sangrah from Play Store / Samsung Galaxy Store.\n\n${STORE_URLS.galaxyStore}\n\n${STORE_URLS.playStore}\n\nor view web Version ${domainUrl}`;
	try {
		if (Platform.OS === "web") {
			await Clipboard.setStringAsync(message);
			alert(`Copied to clipboard.\n\n${message}`);
			return;
		}
		Share.share({ message });
	} catch (error) {
		alert(error instanceof Error ? error.message : "Share failed");
	}
};
