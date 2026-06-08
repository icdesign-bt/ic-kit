import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../../src/components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: 'Пагинация с кнопками страниц и стрелками на KURS-токенах.',
      },
    },
  },
} as Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} count={10} onChange={setPage} />;
  },
};

export const WithBoundaries: Story = {
  render: () => {
    const [page, setPage] = useState(6);
    return (
      <Pagination
        page={page}
        count={20}
        onChange={setPage}
        showFirstButton
        showLastButton
      />
    );
  },
};

export const Disabled: Story = {
  render: () => <Pagination page={2} count={5} disabled />,
};
