import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Primary: Story = {
  render: () => <ListItem videoId='AAAA' items={[]} onDelete={() => {}} />,
};
