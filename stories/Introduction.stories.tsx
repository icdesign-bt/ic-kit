import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Introduction',
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
      <h1 style={{ marginTop: 0 }}>ic-kit</h1>
      <p>
        <strong>UI Kit</strong> дизайн-системы{' '}
        <a href="https://www.figma.com/design/XFvebxoecl7DX4Oxm9GVJO/KURS-v2.-Components">KURS v2</a> — React-компоненты,
        токены, шрифт Moscow Sans W и иконки для прототипов в стиле <strong>ИЦ</strong> и <strong>ЦОДД</strong>.
      </p>
      <p>
        Эта витрина — каталог компонентов и foundations. Чтобы подключить кит в свой Vite-проект, Storybook{' '}
        <strong>не нужен</strong> — см. документацию в репозитории:
      </p>
      <ul>
        <li>
          <a href="https://github.com/icdesign-bt/ic-kit/blob/main/README.md">README</a> — установка, бренды, prompt для
          Cursor
        </li>
        <li>
          <a href="https://github.com/icdesign-bt/ic-kit/blob/main/docs/installation.md">installation.md</a> —
          troubleshooting, обновление версии, шаблон <code>examples/vite-starter</code>
        </li>
      </ul>

      <h2>Для кого</h2>
      <ul>
        <li>
          <strong>Сотрудники ИЦ</strong> — прототипы и демо в Vite + React или Cursor (вайбкодинг)
        </li>
        <li>
          <strong>Дизайнеры и PM</strong> — посмотреть, как компоненты DS выглядят в коде
        </li>
      </ul>
      <p>
        Кит для <strong>прототипов</strong>, не для production.
      </p>

      <h2>Что смотреть здесь</h2>
      <ul>
        <li>
          <strong>Foundations</strong> — цвета, типографика,{' '}
          <a href="?path=/story/foundations-icons--gallery-story">иконки</a>
        </li>
        <li>
          <strong>Components</strong> — все компоненты с состояниями и примерами
        </li>
        <li>
          <strong>Guides</strong> —{' '}
          <a href="?path=/story/guides-form-composition--contact-form">Form composition</a>, пример сборки формы
        </li>
      </ul>
      <p>
        В toolbar переключайте <strong>Brand</strong> (ИЦ / ЦОДД) и <strong>Theme</strong> (light / dark) — stories
        обновятся под выбранную палитру.
      </p>

      <h2>Что в пакете</h2>
      <ul>
        <li>Компоненты — Button, TextField, Select, Dialog, Tabs, Alert, Badge, Icon и др. (раздел Components)</li>
        <li>Токены — CSS-переменные для цветов, отступов, типографики</li>
        <li>
          <strong>661 иконка</strong> — <code>{'<Icon path="Category/Name" />'}</code>
        </li>
      </ul>
      <p>
        Макеты в Figma:{' '}
        <a href="https://www.figma.com/design/wy9jtzeCE5LWQp3KIueIMM/KURS.Storybook?node-id=3-1215">KURS.Storybook</a>.
      </p>

      <h2>Ссылки</h2>
      <ul>
        <li>
          Репозиторий: <a href="https://github.com/icdesign-bt/ic-kit">github.com/icdesign-bt/ic-kit</a>
        </li>
        <li>
          Релизы: <a href="https://github.com/icdesign-bt/ic-kit/releases">GitHub Releases</a>
        </li>
        <li>
          Лицензия: только для сотрудников ИЦ —{' '}
          <a href="https://github.com/icdesign-bt/ic-kit/blob/main/LICENSE">LICENSE</a>
        </li>
      </ul>
    </article>
  ),
};
