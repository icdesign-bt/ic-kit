# ic-kit

[![Release](https://img.shields.io/github/v/release/icdesign-bt/ic-kit?label=release)](https://github.com/icdesign-bt/ic-kit/releases)

UI Kit дизайн-системы **KURS v2**: React-компоненты, токены, шрифт Moscow Sans W и иконки для **прототипов и вайбкодинга** в стиле ИЦ и ЦОДД.

**Витрина:** [icdesign-bt.github.io/ic-kit](https://icdesign-bt.github.io/ic-kit/) · **Figma:** [KURS v2. Components](https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components)

## Для кого

Сотрудники ИЦ, которые быстро собирают демо в Vite + React или в Cursor — без ручного выравнивания под дизайн-систему.  
**Не для production.**

Доступ к репозиторию — только внутри организации, см. [LICENSE](LICENSE).

## Установка в свой проект

```bash
npm i github:icdesign-bt/ic-kit#v0.1.0
```

```tsx
// main.tsx
import 'ic-kit/styles.css';

// App.tsx
import { Button, Input } from 'ic-kit';

document.documentElement.dataset.brand = 'ic';    // 'ic' | 'codd'
document.documentElement.dataset.theme = 'light'; // 'light' | 'dark'
```

**Шаблон:** [examples/vite-starter](examples/vite-starter/) — готовый Vite-проект в репозитории.

**Подробнее:** [docs/installation.md](docs/installation.md) (troubleshooting, обновление версии, локальная разработка).

## Каталог компонентов

Откройте [Storybook](https://icdesign-bt.github.io/ic-kit/?path=/docs/introduction--docs) или локально:

```bash
git clone https://github.com/icdesign-bt/ic-kit.git
cd ic-kit
npm install
npm run dev              # http://localhost:6006
```

В пакете: Button, TextField, Select, Checkbox, Dialog, Tabs, Tooltip, Badge, Icon и др. — раздел **Components** в Storybook.

## Бренды и темы

Два бренда — **ИЦ** и **ЦОДД**, каждый в light/dark. В Storybook переключайте Brand и Theme в toolbar.

## Документация

| | |
|---|---|
| [installation.md](docs/installation.md) | подключение в проект |
| [Storybook → Foundations → Icons](https://icdesign-bt.github.io/ic-kit/?path=/story/foundations-icons--gallery) | каталог иконок `<Icon />` |
| [CHANGELOG.md](CHANGELOG.md) | история версий |
| [CONTRIBUTING.md](CONTRIBUTING.md) | для команды кита |
| [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) | лицензии зависимостей |

## Prompt context (для Cursor)

```
UI Kit ic-kit (KURS v2). Прототипы, не prod.
Установка: npm i github:icdesign-bt/ic-kit#v0.1.0
import 'ic-kit/styles.css'; import { Button, Input, … } from 'ic-kit';
Бренд/тема: dataset.brand = 'ic'|'codd'; dataset.theme = 'light'|'dark';
Иконки: <Icon path="Category/Name" size={20} />
Витрина: https://icdesign-bt.github.io/ic-kit/
Не использовать Ant Design / MUI
```
