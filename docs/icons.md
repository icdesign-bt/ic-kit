# Иконки KURS v2

## Источник

| | |
|---|---|
| Файл | [KURS v2. Components](https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components) |
| Canvas | [icon 24](https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components?node-id=6558-15814) |
| `nodeId` | `6558:15814` |

Берём **весь набор** с этой страницы — не подмножество.

## Параметры

- **Размер:** 24×24 px (canvas «icon 24»)
- **Формат:** Outline
- **Варианты веса:** Regular, Bold, Fill (3 symbol на иконку)
- **Именование в Figma:** `<Icon>/Category/Name` (Phosphor-style)

## Каталог

Машиночитаемый инвентарь: [tokens/icon-catalog.json](../tokens/icon-catalog.json)

| Метрика | Значение |
|---------|----------|
| Уникальных иконок | **661** |
| Категорий | **16** |

Категории: Arrows & Directions (61), Commerce (57), Communication (44), Design (72), Development (19), Education (10), Games (31), Maps & Travel (41), Math & Finances (32), Media (55), Office & Editing (59), People (43), Security & Warning (27), System Devices (70), Time (13), Weather & Nature (27).

## В коде

| | |
|---|---|
| SVG | `src/icons/svg/{category}/{name}/{regular\|bold\|fill}.svg` — **1983** файла |
| Компонент | `<Icon path="Weather & Nature/Cloud" weight="regular" size={24} />` |
| Storybook | `Foundations/Icons` — галерея с поиском |
| **Переэкспорт (рекомендуется)** | `npm run icons:reexport` — Figma Desktop открыт на KURS v2, MCP |
| Синк из Figma API | `FIGMA_ACCESS_TOKEN` в `.env` → `npm run icons:sync -- --force` |
| Аудит zip-маппинга | `npm run icons:audit` |
| ~~Импорт из zip~~ | ~~`icons:import`~~ — **deprecated**, давал неверное соответствие имя↔SVG |

Дефолт для компонентов DS: `weight="regular"`, `size={24}`.

## Соответствие имя ↔ SVG

Каталог `icon-catalog.json` строится из canvas [6558:15814](https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components?node-id=6558-15814): у каждой иконки есть `figmaNodeId` и `weights.{regular,bold,fill}` — **это единственный надёжный ключ**.

Ранний импорт `_Icon_.zip` сопоставлял файлы `…-N.svg` с N-й ячейкой сетки (по `x,y` из metadata). Нумерация в zip **не совпадает** с этой сеткой → ~все SVG были перепутаны (папка `X`, а внутри графика другой иконки).

**Правильный пайплайн:** `icons:parse` (обновить nodeId) → `icons:reexport` или `icons:sync --force`.

При обновлении canvas в Figma: `icons:parse` + полный переэкспорт, не zip-import.
