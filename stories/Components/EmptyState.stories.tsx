import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../src/components/Button';
import { EmptyState } from '../../src/components/EmptyState';
import { Icon } from '../../src/components/Icon';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: 'Пустое состояние — иконка, заголовок, описание и действие.',
      },
    },
  },
} as Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'Ничего не найдено',
    description: 'Попробуйте изменить фильтры или поисковый запрос.',
    action: (
      <Button variant="contained" color="primary" size="sm">
        Сбросить фильтры
      </Button>
    ),
  },
};

export const CustomIcon: Story = {
  render: () => (
    <EmptyState
      title="Список пуст"
      description="Добавьте первый элемент, чтобы начать работу."
      icon={<Icon path="Office & Editing/FolderOpen" size={48} weight="regular" />}
      action={
        <Button variant="tonal" color="primary" size="sm">
          Добавить
        </Button>
      }
    />
  ),
};
