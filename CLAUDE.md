# Aarti Sangraha — Project Context

Expo Router app (CNG — no `ios/` or `android/` dirs). Static web export deployed to GitHub Pages. Single developer.

## Commands

```bash
pnpm start          # dev server
pnpm run web:build  # production web export → dist/
pnpm lint           # Biome lint + fix
pnpm format         # Biome format
npx expo-doctor     # check dependency health
```

## Stack

- **Expo SDK 56** / React Native 0.85 / React 19
- **Expo Router** — file-based routing
- **Zustand** + immer + persist (AsyncStorage) — state
- **NativeWind v4** + Tailwind v3 — styling
- **Gluestack UI** — overlay, toast, menu primitives
- **Reanimated 4** + react-native-worklets — animations
- **Biome** — lint + format (not ESLint, not Prettier)

## Architecture

### Store (`store/store.ts`)

Single Zustand store with two slices:

- **DataSlice** — `aartis`, `favoritesKeys`, `recentlyViewed`, CRUD actions
- **UISlice** — `fontSize`, `displayMode`, `translate`, `showSearch`, `searchValue`, `selectedDeity`, `sortOrder`

**Always use the scoped hooks — never select actions from `useDataStore`:**

```ts
useDataStore((s) => s.aartis)          // state only
useDataStoreActions()                   // data mutations
useUIStoreActions()                     // UI mutations
```

Action hooks use `useShallow` to prevent re-renders on unrelated mutations.

### Data flow

Static aarti data lives in `store/data.ts`. On first launch, `initializeAarti()` loads it into the store. User-added aartis are stored in the same array with keys prefixed `custom-{timestamp}`. The `useFilteredAartis()` hook applies deity/sort/search filters — use it on list screens instead of filtering inline.

### Routing

File-based. Structure:

```
app/
  _layout.tsx               root layout (fonts, GestureHandler, GluestackUI)
  (app)/
    _layout.tsx             Stack navigator (slide_from_right)
    (tabs)/
      _layout.tsx           Tab navigator
      index.tsx             Home (all aartis)
      favorites.tsx
      recent.tsx
      about.tsx
      setting.tsx
    aarti-view/[slug].tsx   Detail + swipe nav + auto-scroll
    add-aarti/[key].tsx     Add/edit custom aarti
```

New screen = new `.tsx` file in the right subfolder. Expo Router picks it up automatically.

### Styling

NativeWind classes for everything. `StyleSheet.create` only for animated styles and shadows. Custom theme tokens are CSS variables defined in `components/ui/gluestack-ui-provider/config.ts` — use `bg-app-primary`, `text-app-text`, etc.

Shared spacing/radius constants: `shared/styles.ts` (`spacing.md = 16`, `radius.lg = 10`).

For colors in JS (e.g. animated borders): use `useAppTheme()` from `shared/types.ts`.

## Non-obvious workarounds — do not remove without understanding

### Zustand CJS shim (`metro.config.js`)

Metro can't resolve Zustand's ESM `exports` field. The custom `resolveRequest` forces CommonJS resolution for `zustand` and `zustand/*` imports. Removing it breaks the app at runtime with module resolution errors.

### `scheduleOnRN` instead of `runOnJS`

This project uses `react-native-worklets`, not Reanimated's `runOnJS`. Always import from `react-native-worklets`:

```ts
import { scheduleOnRN } from 'react-native-worklets';
scheduleOnRN(setStateFn, value); // call React state setters from worklets
```

### `react-native-css-interop` explicit install

NativeWind depends on it but pnpm doesn't hoist it automatically. It's listed as a direct dependency so Metro can resolve `react-native-css-interop/jsx-runtime`. Don't remove it.

### Animated auto-scroll (`aarti-view/[slug].tsx`)

Auto-scroll uses Reanimated shared values + `scrollTo()` on the UI thread — no `setTimeout`, no JS bridge. `useAnimatedReaction` drives scroll position; `scheduleOnRN` bridges back to React state when scroll ends.

### Back button double-tap (`app/_layout.tsx`)

Android back press is ref-tracked (not state) to avoid stale closures. First press closes search or pops stack; second press within 2s exits app. The ref stores search visibility — don't convert to state.

## CI/CD

Push to `master` → GitHub Actions builds `pnpm run web:build` → deploys `dist/` to GitHub Pages automatically.
