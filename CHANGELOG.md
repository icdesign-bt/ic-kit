# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [0.1.1] — 2026-08-11

### Changed

- **Chip:** по умолчанию больше не показывает caret (`CaretDown`). Иконка только при явном `startIcon={<Icon … />}`. `startIcon={false}` по-прежнему без иконки (совместимость). Для filter/select chip передавайте caret явно.

### Migration

- Кто ждал caret по умолчанию — передайте `startIcon` явно (например `CaretDown`).
- После апдейта у статусных Chip можно убрать массовые `startIcon={false}`.

## [0.1.0] — 2026-06-08

Первый релиз UI Kit KURS v2 для вайбкодинга и прототипов (сотрудники ИЦ).

### Added

- **Компоненты:** Button (family), TextField, TextArea, Select, MultiSelect, Autocomplete, DatePicker, Checkbox, Radio, Switch, Slider, Alert, Dialog, Snackbar, Tips, Tabs, Avatar, Chip, Tooltip, Progress, Spinner, Badge, Breadcrumbs, Pagination, EmptyState, Skeleton, Text, Icon
- **Токены:** ИЦ/ЦОДД × light/dark, typography, component tokens
- **Storybook:** Foundations, Components, Guides; деплой [GitHub Pages](https://icdesign-bt.github.io/ic-kit/)
- **Установка:** `docs/installation.md`, `examples/vite-starter`, git dependency `github:icdesign-bt/ic-kit`
- Иконки: **1983 SVG**, `<Icon />`, Storybook галерея
- Пайплайн токенов: `tokens/figma-export/` → `scripts/build-tokens.mjs` → `src/styles/tokens.css`
- 4 палитры (ИЦ/ЦОДД × light/dark) + typography/spacing из Figma MCP
- Storybook: Foundations/Colors, переключатель Brand/Theme в preview
- Каркас проекта: React + TypeScript + Vite (lib) + Storybook
- Moscow Sans W в `src/assets/fonts/`
- Каталог иконок `tokens/icon-catalog.json`
- LICENSE, CONTRIBUTING, `docs/installation.md`

[Unreleased]: https://github.com/icdesign-bt/ic-kit/compare/v0.1.1...HEAD
[0.1.1]: https://github.com/icdesign-bt/ic-kit/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/icdesign-bt/ic-kit/releases/tag/v0.1.0
