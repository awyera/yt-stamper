import type { Meta, StoryObj } from "@storybook/react";

import { nanoid } from "nanoid";
import { useState } from "react";
import type { Timestamp } from "../lib/types";
import { YTStamper } from "./YTStamper";

const meta: Meta<typeof YTStamper> = {
  component: YTStamper,
};

export default meta;

type Story = StoryObj<typeof YTStamper>;

export const Primary: Story = {
  render: () => {
    const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
    return <YTStamper timestamps={timestamps} onChange={setTimestamps} />;
  },
};
