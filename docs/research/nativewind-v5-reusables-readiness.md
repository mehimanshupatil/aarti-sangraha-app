# NativeWind v5 + react-native-reusables Readiness Check

Date: 2026-08-16

Research for GitHub issue #7 ("Check whether NativeWind v5 + react-native-reusables are ready to adopt"), child of issue #6 ("Migrate Menu from gluestack-ui to react-native-reusables"). See `docs/adr/0001-defer-react-native-reusables-migration.md` for the original deferral decision.

## Section 1 — NativeWind v5 status

Checked via npm registry metadata directly (`npm view nativewind version` / `npm view nativewind dist-tags --json`), run 2026-08-16:

```
$ npm view nativewind version
4.2.6

$ npm view nativewind dist-tags --json
[
  {
    "preview": "5.0.0-preview.4",
    "nightly": "0.0.0-nightly.da9e3f1",
    "latest": "4.2.6"
  }
]
```

- The `latest` dist-tag (the stable release channel) is **4.2.6** — still a NativeWind v4 release.
- The only 5.x version published is **`5.0.0-preview.4`**, and it is published under the `preview` dist-tag, not `latest`.
- There is also a `nightly` tag (`0.0.0-nightly.da9e3f1`), which is pre-release/unstable by definition.
- **Conclusion: No stable (non-preview/beta/rc) 5.x release of NativeWind exists as of 2026-08-16.** v5 is still preview-only. This matches what this app already runs (`nativewind@5.0.0-preview.4` as a devDependency, per project context).

Source: `npm view nativewind version` / `npm view nativewind dist-tags --json` (npm registry, queried 2026-08-16). Note: an attempt to cross-check via WebFetch on `https://www.npmjs.com/package/nativewind` returned an HTTP 403 (page blocks the fetch tool), so that page could not be used as a secondary source — the finding rests on the direct npm registry query above, which is itself a primary source (npm's own registry metadata, the same data npmjs.com's UI reads from).

## Section 2 — react-native-reusables NativeWind compatibility

### Declared nativewind dependency (primary source: package.json files in the repo)

Fetched directly from the `founded-labs/react-native-reusables` GitHub repo via `gh api repos/founded-labs/react-native-reusables/contents/<path>` on 2026-08-16:

- `packages/registry/package.json` (the actual component registry consumed by the CLI):
  `"nativewind": "^4.2.2"`
  https://github.com/founded-labs/react-native-reusables/blob/main/packages/registry/package.json
- `apps/showcase/package.json` (the reference/demo app):
  `"nativewind": "^4.2.2"`
  https://github.com/founded-labs/react-native-reusables/blob/main/apps/showcase/package.json

Both declare NativeWind **v4** (`^4.2.2`), not v5. There is no `nativewind@5` dependency or peerDependency declared anywhere in these files as of 2026-08-16.

Notable side finding: `packages/registry/package.json` also lists `"uniwind": "^1.6.3"` as a dependency, and the GitHub repo description itself now reads "Bringing shadcn/ui to React Native... Nativewind/Uniwind" (per `gh api repos/founded-labs/react-native-reusables`, fetched 2026-08-16: https://github.com/founded-labs/react-native-reusables). This suggests the project is exploring "Uniwind" as an alternative/parallel styling runtime, but this is a separate library from NativeWind v5 and does not itself constitute NativeWind v5 support — flagging it as a fact only, not analyzed further here.

### Issue #548 — "NativeWind v5 (Tailwind v4) compatibility — the component changes that were needed"

URL: https://github.com/founded-labs/react-native-reusables/issues/548

- **State: OPEN** (confirmed via `gh issue view 548 --repo founded-labs/react-native-reusables --json state,stateReason,closedAt,url`, checked 2026-08-16; `closedAt` is null).
- The issue is a community report (not from a maintainer) documenting native-only rendering issues found while migrating react-native-reusables components to `nativewind@5.0.0-preview.4` + Tailwind v4 (icon `cssInterop` → `styled()`, Android `TextInput` clipping, `textarea` placeholder theming, `select` trigger width). The author offers to open PRs but as of 2026-08-16 no PR has been merged and the issue remains open and unresolved.
- **Status unchanged from what the ADR recorded**: still open, still unmerged.

### Issue #277 — "[BUG] Light/Dark mode doesn't switch when toggle the devices system appearance"

URL: https://github.com/founded-labs/react-native-reusables/issues/277

- **State: CLOSED**, `stateReason: COMPLETED`, `closedAt: 2025-01-01T20:22:16Z` (confirmed via `gh issue view 277 --repo founded-labs/react-native-reusables --json state,stateReason,closedAt,url`, checked 2026-08-16).
- Closed via a **merged pull request**: PR #295 (`fix(#277): remove async local storage and Splashscreen prevent auto hide`), merge commit `89af21d1f44d15546093377a444d340616ceb9be`, authored/merged by maintainer Zach Nugent on 2025-01-01T20:21:40Z (confirmed via `gh api repos/founded-labs/react-native-reusables/commits/89af21d1f44d15546093377a444d340616ceb9be`).
- **Important caveat**: this fix predates NativeWind v5 entirely — the issue and its fix (removing async-storage-based persisted color scheme handling from the starter's root layout) were about NativeWind v4's `useColorScheme`/theme-persistence behavior on native, not about NativeWind v5. It does **not** demonstrate that dark/light mode toggling is fixed under NativeWind v5. Later cross-references on the issue thread (e.g. issue #302, "[BUG] ThemeToggle not changing on press", opened 2025-01-13) suggest theme-toggle problems recurred after this fix, though #302 itself was outside this research's scope and was not separately investigated.
- **Status**: resolved-and-merged, but for the v4-era bug only; it does not answer the NativeWind-v5-specific dark-mode question that issue #548 raises.

### Docs site guidance (reactnativereusables.com)

Checked https://reactnativereusables.com/docs/installation and https://reactnativereusables.com/docs/introduction (fetched raw HTML via curl and WebFetch on 2026-08-16, since the WebFetch tool's markdown conversion returned only page headings with no body — the raw HTML was inspected directly to compensate).

- Neither page's rendered content contains the literal string "nativewind" or "tailwind" in the fetched HTML. The installation page's actual guidance is CLI-driven: `npx @react-native-reusables/cli@latest init` / `add button`, which pulls templates from the registry — it does not state a NativeWind version requirement in prose on that page.
- No sitemap was available at `https://reactnativereusables.com/sitemap.xml` (empty response) to enumerate other candidate pages (e.g., a dedicated "requirements" or "theming" doc) for a more explicit version statement.
- **Conclusion: could not verify explicit NativeWind version guidance stated in the docs site's prose.** The only verifiable, current statement of "what NativeWind version react-native-reusables requires" is the package.json evidence in the section above (`^4.2.2`), not the docs site text.

## Bottom line

1. **NativeWind v5 is still preview-only.** npm's `latest` tag is `4.2.6`; the only 5.x version published is `5.0.0-preview.4` under the `preview` dist-tag. No stable 5.x release exists as of 2026-08-16. (Source: `npm view nativewind dist-tags --json`.)
2. **react-native-reusables has not officially adopted NativeWind v5.** Its own registry and showcase app still pin `nativewind: "^4.2.2"` (v4) as of 2026-08-16. Issue #548, tracking the specific NativeWind-v5 component compatibility gaps, remains **open and unmerged**. Issue #277 (dark/light mode toggle) is **closed via merged PR #295**, but that fix predates and is unrelated to NativeWind v5 — it resolved a v4-era bug, so it does not establish that the v5 dark-mode issue the ADR was tracking has been fixed. The project's own docs installation page does not state a NativeWind version requirement in prose; the package.json declarations are the only verifiable version signal.

Both of the ADR's original blockers — no stable NativeWind v5, and unresolved v5-specific compatibility issues in react-native-reusables (#548 still open) — remain in place as of 2026-08-16.
