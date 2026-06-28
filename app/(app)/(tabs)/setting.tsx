import React, { useState } from 'react';
import {
	Alert,
	Modal,
	Platform,
	Pressable,
	ScrollView,
	Share,
	Text,
	TextInput,
	View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useAppTheme } from '../../../shared/types';
import { useDataStore, useDataStoreActions, useUIStoreActions } from '../../../store/store';
import { shareApp } from '../../../shared/helper';
import { themes } from '../../../shared/themes';
import type { ThemeId } from '../../../shared/themes';

const Setting: React.FC = () => {
	const { colors } = useAppTheme();
	const displayMode = useDataStore((s) => s.displayMode);
	const selectedTheme = useDataStore((s) => s.selectedTheme);
	const aartis = useDataStore((s) => s.aartis);
	const { initializeAarti, addAarti } = useDataStoreActions();
	const { setDisplayMode, setSelectedTheme } = useUIStoreActions();

	const [importVisible, setImportVisible] = useState(false);
	const [importText, setImportText] = useState('');

	const isDark = displayMode === 'dark';

	const reset = () => {
		Alert.alert(
			'Reset Data',
			'This will delete all customized and modified Aartis. This action cannot be undone.',
			[
				{ text: 'रद्द करा', style: 'cancel' },
				{ text: 'ठीक आहे', onPress: initializeAarti },
			],
		);
	};

	const exportCustomAartis = async () => {
		const custom = aartis.filter((x) => x.key.startsWith('custom-'));
		if (custom.length === 0) {
			Alert.alert('Export', 'No custom aartis to export.');
			return;
		}
		const json = JSON.stringify(custom, null, 2);
		try {
			if (Platform.OS === 'web') {
				await Clipboard.setStringAsync(json);
				Alert.alert('Exported', 'JSON copied to clipboard.');
			} else {
				await Share.share({ message: json });
			}
		} catch {
			Alert.alert('Error', 'Could not export aartis.');
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
			Alert.alert('Import', `Added ${added} aarti(s).`);
			setImportVisible(false);
			setImportText('');
		} catch {
			Alert.alert('Error', 'Invalid JSON. Could not import.');
		}
	};

	return (
		<>
			<ScrollView contentContainerClassName=" p-5 gap-3 bg-app-bg">

				{/* ── Theme picker ── */}
				<Text className="text-xs font-semibold uppercase tracking-widest text-app-border mb-1">
					Color Theme
				</Text>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					className="mb-1" 
				>
					<View className="flex-row gap-4 pb-1 items-start">
						{(Object.keys(themes) as ThemeId[]).map((id) => {
							const t = themes[id];
							const c = isDark ? t.dark : t.light;
							const isSelected = selectedTheme === id;
							return (
								<Pressable
									key={id}
									onPress={() => setSelectedTheme(id)}
									className="items-center gap-1.5"
									style={{ width: 64 }}
								>
									{/* Split swatch: left = primary, right = accent */}
									<View
										style={{
											width: 52,
											height: 52,
											borderRadius: 26,
											overflow: 'hidden',
											borderWidth: isSelected ? 3 : 1.5,
											borderColor: isSelected ? colors.text : colors.border,
										}}
									>
										<View style={{ flex: 1, flexDirection: 'row' }}>
											<View style={{ flex: 1, backgroundColor: c.primary }} />
											<View style={{ flex: 1, backgroundColor: c.accent }} />
										</View>
									</View>
									<Text
										className="text-center"
										style={{ fontSize: 10, color: isSelected ? colors.primary : colors.text, fontWeight: isSelected ? '700' : '400' }}
										numberOfLines={2}
									>
										{t.name}
									</Text>
								</Pressable>
							);
						})}
					</View>
				</ScrollView>

				{/* ── Other settings ── */}
				<Text className="text-xs font-semibold uppercase tracking-widest text-app-border mb-1 mt-2">
					Display
				</Text>

				<Pressable
					className="flex-row items-center gap-3 py-[14px] px-4 border rounded-[10px] border-app-border"
					onPress={() => setDisplayMode(isDark ? 'light' : 'dark')}
					android_ripple={{ color: `${colors.primary}22` }}
				>
					<MaterialCommunityIcons name="theme-light-dark" color={colors.primary} size={24} />
					<Text className="text-base text-app-text">
						{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
					</Text>
				</Pressable>

				<Text className="text-xs font-semibold uppercase tracking-widest text-app-border mb-1 mt-2">
					Data
				</Text>

				<Pressable
					className="flex-row items-center gap-3 py-[14px] px-4 border rounded-[10px] border-app-border"
					onPress={shareApp}
					android_ripple={{ color: `${colors.primary}22` }}
				>
					<MaterialCommunityIcons name="share-variant" color={colors.primary} size={24} />
					<Text className="text-base text-app-text">Share App</Text>
				</Pressable>

				<Pressable
					className="flex-row items-center gap-3 py-[14px] px-4 border rounded-[10px] border-app-border"
					onPress={exportCustomAartis}
					android_ripple={{ color: `${colors.primary}22` }}
				>
					<MaterialCommunityIcons name="export" color={colors.primary} size={24} />
					<Text className="text-base text-app-text">Export Custom Aartis</Text>
				</Pressable>

				<Pressable
					className="flex-row items-center gap-3 py-[14px] px-4 border rounded-[10px] border-app-border"
					onPress={() => setImportVisible(true)}
					android_ripple={{ color: `${colors.primary}22` }}
				>
					<MaterialCommunityIcons name="import" color={colors.primary} size={24} />
					<Text className="text-base text-app-text">Import Custom Aartis</Text>
				</Pressable>

				<Pressable
					className="flex-row items-center gap-3 py-[14px] px-4 border rounded-[10px] border-app-border"
					onPress={reset}
					android_ripple={{ color: `${colors.accent}22` }}
				>
					<MaterialCommunityIcons name="delete-forever" color={colors.accent} size={24} />
					<Text className="text-base text-app-accent">Reset customised data</Text>
				</Pressable>
			</ScrollView>

			<Modal
				visible={importVisible}
				animationType="slide"
				transparent
				onRequestClose={() => setImportVisible(false)}
			>
				<View className="flex-1 bg-black/50 justify-end">
					<View className="p-5 rounded-tl-2xl rounded-tr-2xl gap-3 bg-app-surface">
						<Text className="text-base font-bold text-app-text">
							Paste exported JSON
						</Text>
						<TextInput
							className="border rounded-lg p-[10px] text-[13px] min-h-[120px] border-app-border text-app-text"
							style={{ textAlignVertical: 'top' }}
							multiline
							numberOfLines={8}
							placeholder="Paste JSON here…"
							placeholderTextColor={colors.border}
							value={importText}
							onChangeText={setImportText}
							autoFocus
						/>
						<View className="flex-row gap-[10px] justify-end">
							<Pressable
								className="px-5 py-[10px] rounded-lg border border-app-border"
								onPress={() => { setImportVisible(false); setImportText(''); }}
							>
								<Text className="text-app-text">Cancel</Text>
							</Pressable>
							<Pressable
								className="px-5 py-[10px] rounded-lg border border-app-primary bg-app-primary"
								onPress={importCustomAartis}
							>
								<Text className="text-app-bg font-bold">Import</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default Setting;
