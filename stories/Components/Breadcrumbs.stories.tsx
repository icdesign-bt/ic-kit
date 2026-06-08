import type { Meta, StoryObj } from '@storybook/react';
import { BreadcrumbItem, Breadcrumbs } from '../../src/components/Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: 'Навигационная цепочка на KURS-токенах (body/sm, CaretRight).',
      },
    },
  },
} as Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Главная', href: '#' },
        { label: 'Каталог', href: '#' },
        { label: 'Раздел', href: '#' },
        { label: 'Текущая страница', current: true },
      ]}
    />
  ),
};

export const Composition: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Главная</BreadcrumbItem>
      <BreadcrumbItem href="#">Проекты</BreadcrumbItem>
      <BreadcrumbItem current>Детали</BreadcrumbItem>
    </Breadcrumbs>
  ),
};
