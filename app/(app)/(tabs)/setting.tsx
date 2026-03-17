import React, { useState } from "react";
import {
	Alert,
	Modal,
	Platform,
	ScrollView,
	Share,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Icon } from "react-native-paper";
import * as Clipboard from "expo-clipboard";
import { useAppTheme } from "../../../shared/types";
import { useDataStore, useDataStoreActions, useUIStoreActions } from "../../../store/store";
import { shareApp } from "../../../shared/helper";
import { spacing } from "../../../shared/styles";

const Setting: React.FC = () => {
	const { colors } = useAppTheme();
	const displayMode = useDataStore((s) => s.displayMode);
	const aartis = useDataStore((s) => s.aartis);
	const { initializeAarti, addAarti } = useDataStoreActions();
	const { setDisplayMode } = useUIStoreActions();

	const [importVisible, setImportVisible] = useState(false);
	const [importText, setImportText] = useState("");

	const reset = () => {
		Alert.alert(
			"Reset Data",
			"This will delete all customized and modified Aartis. This action cannot be undone.",
			[
				{ text: "रद्द करा", style: "cancel" },
				{ text: "ठीक आहे", onPress: initializeAarti },
			],
		);
	};

	const exportCustomAartis = async () => {
		const custom = aartis.filter((x) => x.key.startsWith("custom-"));
		if (custom.length === 0) {
			Alert.alert("Export", "No custom aartis to export.");
			return;
		}
		const json = JSON.stringify(custom, null, 2);
		try {
			if (Platform.OS === "web") {
				await Clipboard.setStringAsync(json);
				Alert.alert("Exported", "JSON copied to clipboard.");
			} else {
				await Share.share({ message: json });
			}
		} catch {
			Alert.alert("Error", "Could not export aartis.");
		}
	};

	const importCustomAartis = () => {
		if (!importText.trim()) return;
		try {
			const parsed = JSON.parse(importText);
			const items: unknown[] = Array.isArray(parsed) ? parsed : [parsed];
			let added = 0;
			for (const raw of items) {
				const item = raw as { key?: string; title?: unknown; body?: unknown; metadata?: unknown };
				if (!item.key || !item.title || !item.body || !item.metadata) continue;
				if (aartis.find((x) => x.key === item.key)) continue;
				addAarti(item as Parameters<typeof addAarti>[0]);
				added++;
			}
			Alert.alert("Import", `Added ${added} aarti(s).`);
			setImportVisible(false);
			setImportText("");
		} catch {
			Alert.alert("Error", "Invalid JSON. Could not import.");
		}
	};

	return (
		<>
			<ScrollView
				contentContainerStyle={[styles.root, { backgroundColor: colors.background }]}
			>
				<TouchableOpacity
					style={[styles.row, { borderColor: colors.border }]}
					onPress={() => setDisplayMode(displayMode === "light" ? "dark" : "light")}
				>
					<Icon source="theme-light-dark" color={colors.primary} size={24} />
					<Text style={[styles.label, { color: colors.text }]}>
						{displayMode === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.row, { borderColor: colors.border }]}
					onPress={shareApp}
				>
					<Icon source="share-variant" color={colors.primary} size={24} />
					<Text style={[styles.label, { color: colors.text }]}>Share App</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.row, { borderColor: colors.border }]}
					onPress={exportCustomAartis}
				>
					<Icon source="export" color={colors.primary} size={24} />
					<Text style={[styles.label, { color: colors.text }]}>Export Custom Aartis</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.row, { borderColor: colors.border }]}
					onPress={() => setImportVisible(true)}
				>
					<Icon source="import" color={colors.primary} size={24} />
					<Text style={[styles.label, { color: colors.text }]}>Import Custom Aartis</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.row, { borderColor: colors.border }]}
					onPress={reset}
				>
					<Icon source="delete-forever" color={colors.accent} size={24} />
					<Text style={[styles.label, { color: colors.accent }]}>
						Reset customised data
					</Text>
				</TouchableOpacity>
			</ScrollView>

			{/* Import modal */}
			<Modal
				visible={importVisible}
				animationType="slide"
				transparent
				onRequestClose={() => setImportVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={[styles.modalCard, { backgroundColor: colors.surface }]}>
						<Text style={[styles.modalTitle, { color: colors.text }]}>
							Paste exported JSON
						</Text>
						<TextInput
							style={[styles.importInput, { borderColor: colors.border, color: colors.text }]}
							multiline
							numberOfLines={8}
							placeholder="Paste JSON here…"
							placeholderTextColor={colors.border}
							value={importText}
							onChangeText={setImportText}
							autoFocus
						/>
						<View style={styles.modalButtons}>
							<TouchableOpacity
								style={[styles.modalBtn, { borderColor: colors.border }]}
								onPress={() => { setImportVisible(false); setImportText(""); }}
							>
								<Text style={{ color: colors.text }}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={[styles.modalBtn, { borderColor: colors.primary, backgroundColor: colors.primary }]}
								onPress={importCustomAartis}
							>
								<Text style={{ color: colors.background, fontWeight: "bold" }}>Import</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default Setting;

const styles = StyleSheet.create({
	root: {
		flexGrow: 1,
		padding: spacing.lg,
		gap: 12,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderWidth: 1,
		borderRadius: 10,
	},
	label: {
		fontSize: 16,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modalCard: {
		padding: spacing.lg,
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		gap: 12,
	},
	modalTitle: {
		fontSize: 16,
		fontWeight: "bold",
	},
	importInput: {
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		textAlignVertical: "top",
		fontSize: 13,
		minHeight: 120,
	},
	modalButtons: {
		flexDirection: "row",
		gap: 10,
		justifyContent: "flex-end",
	},
	modalBtn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
		borderWidth: 1,
	},
});
