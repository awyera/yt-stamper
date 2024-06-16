import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { ButtonGroup } from './ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
};

export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const primary: Story = {
  render: () => (
    <ButtonGroup>
      <Button>text</Button>
      <Button>text</Button>
      <Button>text</Button>
      <Button>text</Button>
      <Button>text</Button>
    </ButtonGroup>
  ),
};
