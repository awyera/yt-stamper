import type { Meta, StoryObj } from "@storybook/react";

import { ButtonGroup } from "./ButtonGroup";
import { Plus } from "lucide-react";
import { Button } from "./Button";

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
