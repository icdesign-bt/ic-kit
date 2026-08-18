import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Guides/Quick start',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Docs: Story = {
  name: 'Docs',
  render: () => (
    <article style={{ maxWidth: 720, lineHeight: 1.55, color: 'var(--text-main-on-surface)' }}>
      <h1 style={{ marginTop: 0 }}>Подключение в проект</h1>
      <p>
        Инструкции по установке и настройке <strong>не дублируем здесь</strong> — они живут в репозитории и обновляются
        там:
      </p>
      <ul>
        <li>
          <a href="https://github.com/icdesign-bt/ic-kit/blob/main/README.md">
            <strong>README</strong>
          </a>{' '}
          — быстрый старт: <code>npm i</code>, стили, brand/theme, импорт компонентов
        </li>
        <li>
          <a href="https://github.com/icdesign-bt/ic-kit/blob/main/docs/installation.md">
            <strong>installation.md</strong>
          </a>{' '}
          — все сценарии, troubleshooting, обновление версии
        </li>
        <li>
          <a href="https://github.com/icdesign-bt/ic-kit/tree/main/examples/vite-starter">
            <strong>examples/vite-starter</strong>
          </a>{' '}
          — готовый Vite-шаблон
        </li>
      </ul>
      <p>
        Каталог иконок — story{' '}
        <a href="?path=/story/foundations-icons--gallery-story">
          <strong>Foundations → Icons</strong>
        </a>
        .
      </p>
      <p>
        Пример формы из полей —{' '}
        <a href="?path=/story/guides-form-composition--contact-form">
          <strong>Guides → Form composition</strong>
        </a>
        .
      </p>
    </article>
  ),
};
