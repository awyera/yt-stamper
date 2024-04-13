import type { Meta, StoryObj } from "@storybook/react";

import { YTStamper } from "./YTStamper";

const meta: Meta<typeof YTStamper> = {
  component: YTStamper,
};

export default meta;

type Story = StoryObj<typeof YTStamper>;

export const Primary: Story = {
  render: () => <YTStamper timestamps={[]} onChange={() => {}} />,
};
