export type AppColors = {
	primary: string;
	onPrimary: string;
	text: string;
	accent: string;
	background: string;
	surface: string;
	border: string;
};

export type ThemeId =
	| 'parchment'
	| 'saffron'
	| 'jewel'
	| 'manuscript'
	| 'vermilion'
	| 'forest'
	| 'lotus'
	| 'copper';

export interface Theme {
	id: ThemeId;
	name: string;
	light: AppColors;
	dark: AppColors;
}

export const themes: Record<ThemeId, Theme> = {
	parchment: {
		id: 'parchment',
		name: 'Warm Parchment',
		light: {
			primary: '#A03D0F', onPrimary: '#FFFBF2', text: '#3A2B1A',
			accent: '#D4A017', background: '#FAF4E8', surface: '#F3EAD5', border: '#C4A47A',
		},
		dark: {
			primary: '#DDAA55', onPrimary: '#1C1812', text: '#E8D9BC',
			accent: '#E8B025', background: '#1C1812', surface: '#322A1E', border: '#6B5020',
		},
	},
	saffron: {
		id: 'saffron',
		name: 'Saffron Fire',
		light: {
			primary: '#C0390A', onPrimary: '#FFFFFF', text: '#2C1810',
			accent: '#F0A500', background: '#FFF8F0', surface: '#FFE9D0', border: '#E8A060',
		},
		dark: {
			primary: '#FF8C42', onPrimary: '#1A0E00', text: '#FFD4A8',
			accent: '#FFB830', background: '#1A0E00', surface: '#2E1A06', border: '#804020',
		},
	},
	jewel: {
		id: 'jewel',
		name: 'Temple Jewel',
		light: {
			primary: '#7B1FA2', onPrimary: '#FFFFFF', text: '#2A1030',
			accent: '#E8A000', background: '#FCF6FF', surface: '#F0E4F8', border: '#C084D8',
		},
		dark: {
			primary: '#CE93D8', onPrimary: '#1A0826', text: '#EDD8F8',
			accent: '#FFB830', background: '#12061C', surface: '#220C36', border: '#6A2880',
		},
	},
	manuscript: {
		id: 'manuscript',
		name: 'Dark Manuscript',
		light: {
			primary: '#1A3A5C', onPrimary: '#FFFFFF', text: '#0D1F30',
			accent: '#C8960A', background: '#F5F0E8', surface: '#E8E0CC', border: '#8AABB8',
		},
		dark: {
			primary: '#5BA8CC', onPrimary: '#060E14', text: '#C8DDE8',
			accent: '#E8B030', background: '#060E14', surface: '#0E1E2C', border: '#1E4060',
		},
	},
	vermilion: {
		id: 'vermilion',
		name: 'Vermilion',
		light: {
			primary: '#C62828', onPrimary: '#FFF8F5', text: '#3A1A1A',
			accent: '#BF8A00', background: '#FFF5F5', surface: '#FFE8E8', border: '#E09090',
		},
		dark: {
			primary: '#EF9A9A', onPrimary: '#1C0808', text: '#FFDEDE',
			accent: '#FFD080', background: '#1C0808', surface: '#2E1010', border: '#6A1818',
		},
	},
	forest: {
		id: 'forest',
		name: 'Sacred Forest',
		light: {
			primary: '#2E7D32', onPrimary: '#FFFFFF', text: '#0F2811',
			accent: '#C8960A', background: '#F4FAF4', surface: '#DFF2DF', border: '#80B880',
		},
		dark: {
			primary: '#81C784', onPrimary: '#021005', text: '#C8EAC8',
			accent: '#FFD060', background: '#021005', surface: '#0A240C', border: '#1A5020',
		},
	},
	lotus: {
		id: 'lotus',
		name: 'Midnight Lotus',
		light: {
			primary: '#AD1457', onPrimary: '#FFFFFF', text: '#2A0818',
			accent: '#9C27B0', background: '#FFF0F5', surface: '#FFD6E8', border: '#E888B0',
		},
		dark: {
			primary: '#F48FB1', onPrimary: '#1A0010', text: '#FFD6E8',
			accent: '#CE93D8', background: '#0E0014', surface: '#200028', border: '#6A1840',
		},
	},
	copper: {
		id: 'copper',
		name: 'Copper Dawn',
		light: {
			primary: '#8B4513', onPrimary: '#FFF8F0', text: '#3A2010',
			accent: '#CD7F32', background: '#FDF6EE', surface: '#F5E6D0', border: '#C8906A',
		},
		dark: {
			primary: '#CD7F32', onPrimary: '#180C00', text: '#F0D8B8',
			accent: '#E8A040', background: '#100800', surface: '#281800', border: '#6A3A10',
		},
	},
};

export const DEFAULT_THEME: ThemeId = 'parchment';
