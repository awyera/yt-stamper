import type { Meta, StoryObj } from '@storybook/react';

import { Plus } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Text: Story = {
  render: () => <Button>text</Button>,
};

export const Icon: Story = {
  render: () => (
    <Button circle>
      <Plus size="1em" />
    </Button>
  ),
};

export const Disabled: Story = {
  render: () => <Button disabled>disabled</Button>,
};

export const Danger: Story = {
  render: () => <Button variant="danger">Danger</Button>,
};
