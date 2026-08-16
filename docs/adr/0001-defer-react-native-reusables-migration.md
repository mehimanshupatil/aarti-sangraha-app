---
status: accepted
---

# Defer migrating from gluestack-ui to react-native-reusables

gluestack's actual footprint in this app is narrow — just the `Menu`/`MenuItem`/`MenuItemLabel` dropdown (Home's sort menu, aarti-view's share and "…" menus) plus an `OverlayProvider`/`ToastProvider` wrapper, and `ToastProvider` is unused. `react-native-reusables` has an equivalent `dropdown-menu` component, but it only officially supports NativeWind v4 stable — running it on `nativewind@5.0.0-preview.4` (this app's current version) requires unmerged, community-only patches (see [founded-labs/react-native-reusables#548](https://github.com/founded-labs/react-native-reusables/issues/548)). Its dark mode is implemented via the same NativeWind `dark:` className-variant reactivity we found broken on native Android this session (see [#277](https://github.com/founded-labs/react-native-reusables/issues/277) for a matching symptom on their end), so adopting it now would risk reintroducing the exact class of bug this app just moved away from.

Decided: don't migrate while on NativeWind v5-preview. Revisit once NativeWind v5 stabilizes and react-native-reusables adds official support for it. If it proceeds then, scope it to just the Menu replacement — not a wholesale adoption of the reusables CLI as the app's ongoing component-generation workflow — and go in accepting its shadcn-style model (components are copied into the repo and owned locally, not an npm dependency).
