# Подключение ic-kit

Инструкция для **вайбкодинга и прототипов**: UI сразу в стиле ИЦ/ЦОДД, без ручного выравнивания под DS.  
Не для prod-проектов — только локальные/демо-сборки.

Репозиторий: [github.com/icdesign-bt/ic-kit](https://github.com/icdesign-bt/ic-kit) · Storybook: [icdesign-bt.github.io/ic-kit](https://icdesign-bt.github.io/ic-kit/)

## Требования

- **Node.js** ≥ 20
- **React** 18 или 19 (`react`, `react-dom` — peer dependencies кита)

## Бренды ИЦ и ЦОДД

В ките и в [Storybook](https://icdesign-bt.github.io/ic-kit/) доступны **оба бренда**. По умолчанию — **ИЦ, light**; в toolbar Storybook переключайте Brand (ИЦ / ЦОДД) и Theme (light / dark).

В прототипе задайте на `<html>`:

```tsx
document.documentElement.dataset.brand = 'ic';    // 'ic' | 'codd'
document.documentElement.dataset.theme = 'light'; // 'light' | 'dark'
```

---

## Сценарии

| Сценарий | Команда | Когда |
|----------|---------|--------|
| Локальная витрина + разработка кита | `git clone` + `npm install` + `npm run dev` | команда DS, доработка компонентов |
| Прототип из шаблона | `examples/vite-starter/` | новый Vite-проект за 2 минуты |
| Git dependency | `npm i github:icdesign-bt/ic-kit#v0.1.1` | вайбкодинг / прототип в Vite + React |
| Соседняя папка (без git) | `npm i ../ic-kit` | локальная разработка двух репо |

---

## 1. Clone + Storybook (команда кита)

```bash
git clone https://github.com/icdesign-bt/ic-kit.git
cd ic-kit
npm install
npm run dev          # http://localhost:6006
```

Сборка библиотеки для проверки экспорта:

```bash
npm run build        # → dist/
```

---

## 2. Git dependency в Vite + React

### 2.1 Создайте или откройте проект

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

### 2.2 Установите ic-kit

С тега релиза (рекомендуется после `v0.1.1`):

```bash
npm i github:icdesign-bt/ic-kit#v0.1.1
```

С ветки `main` (последний коммит):

```bash
npm i github:icdesign-bt/ic-kit#main
```

При первой установке npm запускает `prepare` → сборка `dist/` (1–3 мин, нужны devDependencies).

### 2.3 Подключите стили

В `src/main.tsx` **до** рендера приложения:

```tsx
import 'ic-kit/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### 2.4 Бренд и тема

```tsx
import { useEffect } from 'react';

export function App() {
  useEffect(() => {
    document.documentElement.dataset.brand = 'ic';    // 'ic' | 'codd'
    document.documentElement.dataset.theme = 'light'; // 'light' | 'dark'
  }, []);

  return (/* … */);
}
```

### 2.5 Компоненты

```tsx
import { Button, Input, Checkbox, Icon } from 'ic-kit';

export function App() {
  return (
    <>
      <Input label="Email" placeholder="name@example.com" fullWidth size="lg" />
      <Button variant="contained" color="primary">
        <Icon path="Arrows/CaretRight" size={16} />
        Отправить
      </Button>
    </>
  );
}
```

Полный список экспортов: `src/components/index.ts` в репозитории кита или раздел **Components** в Storybook.

---

## 3. Шаблон `examples/vite-starter`

Готовый минимальный проект в этом репозитории:

```bash
git clone https://github.com/icdesign-bt/ic-kit.git
cd ic-kit/examples/vite-starter
npm install
npm run dev          # http://localhost:5173
```

Зависимость `ic-kit` подключена как `file:../..` — удобно внутри монорепо-клона.  
Для отдельного репозитория замените в `package.json`:

```json
"ic-kit": "github:icdesign-bt/ic-kit#v0.1.1"
```

---

## 4. Локальная папка (без push в GitHub)

```bash
# в корне ic-kit
npm run build

# в вашем проекте
npm i /absolute/path/to/ic-kit
# или
npm i ../ic-kit
```

После изменений в ките пересобирайте: `npm run build` в `ic-kit`, затем перезапустите dev-сервер приложения.

---

## TypeScript

Типы входят в пакет (`dist/index.d.ts`). Дополнительный `@types/*` не нужен.

Если IDE не видит типы после git install — удалите `node_modules/ic-kit` и установите заново.

---

## Частые проблемы

| Симптом | Решение |
|---------|---------|
| Стили / шрифт не применяются | Проверьте `import 'ic-kit/styles.css'` в `main.tsx` |
| Палитра «не та» | Задайте `data-brand` и `data-theme` на `<html>` |
| `Cannot find module 'ic-kit'` | Убедитесь, что `prepare` отработал; в `node_modules/ic-kit/dist/` есть файлы |
| Долгая установка из git | Нормально: идёт `npm run build` (токены + иконки) |
| `npm i` с `--omit=dev` падает | Для git-установки не используйте production-only на первом `npm i` |

---

## Обновление версии

```bash
npm i github:icdesign-bt/ic-kit#v0.2.0
```

Список изменений — [CHANGELOG.md](../CHANGELOG.md) и [GitHub Releases](https://github.com/icdesign-bt/ic-kit/releases).

---

## См. также

- [README на GitHub](https://github.com/icdesign-bt/ic-kit/blob/main/README.md) — установка и обзор
- [Introduction в Storybook](https://icdesign-bt.github.io/ic-kit/?path=/docs/introduction--docs)
- [Foundations → Icons в Storybook](https://icdesign-bt.github.io/ic-kit/?path=/story/foundations-icons--gallery) — каталог иконок
