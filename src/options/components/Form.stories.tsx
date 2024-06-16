import type { Meta, StoryObj } from '@storybook/react';

import { Form } from './Form';

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Primary: Story = {
  render: () => <Form label="Short forward (sec)" name="shortForward" value={10} onChange={() => {}} />,
};
