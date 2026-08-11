# ic-kit Vite starter

Минимальный прототип на **Vite + React + TypeScript** с подключённым `ic-kit`.

## Быстрый старт

Из корня клонированного репозитория:

```bash
cd examples/vite-starter
npm install
npm run dev
```

Откройте http://localhost:5173

`npm install` соберёт `ic-kit` из `../..` (скрипт `prepare` в корневом пакете).

## В отдельном репозитории

В `package.json` замените зависимость:

```json
"ic-kit": "github:icdesign-bt/ic-kit#v0.1.1"
```

Подробнее — [docs/installation.md](../../docs/installation.md).
