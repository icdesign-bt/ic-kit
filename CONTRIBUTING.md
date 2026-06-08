# Участие в разработке ic-kit

UI Kit для **вайбкодинга и прототипов** сотрудников ИЦ. Не для production без отдельного согласования.

## Кто мержит

- **Tech owner / DS owner:** Курылев КВ (Управление Дизайна)
- **Эскалация прав admin:** лид Управления Дизайна или Управления IT

## Ветки

- `main` — стабильная линия, деплой Storybook на Pages
- `feature/<краткое-имя>` — новые компоненты, токены, документация

## Локальная проверка перед PR

CI в репозитории только деплоит Storybook. Перед push выполните:

```bash
npm run typecheck
npm run build
npm run build:storybook
```

## Перенос компонента из Figma

Внутренняя документация команды — в `docs/internal/` (не коммитится, только локально у maintainers).

1. Две ссылки: компонент (KURS v2. Components) + документация (KURS.Storybook) — см. [FIGMA_WORKFLOW.md](docs/internal/FIGMA_WORKFLOW.md)
2. Реализация на CSS variables, без хардкода hex
3. Storybook stories + обновление [figma-inventory.md](docs/internal/figma-inventory.md)
4. При необходимости — `docs/internal/components/<name>.md`

## Релизы

Процесс версий — [docs/internal/release-process.md](docs/internal/release-process.md).

## Лицензия

Исходники — только для сотрудников ИЦ. См. [LICENSE](LICENSE).
