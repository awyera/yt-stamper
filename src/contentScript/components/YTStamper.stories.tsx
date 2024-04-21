import type { Meta, StoryObj } from "@storybook/react";

import { nanoid } from "nanoid";
import { useState } from "react";
import type { Timestamp } from "../../lib/types";
import { YTStamper } from "./YTStamper";

const meta: Meta<typeof YTStamper> = {
  component: YTStamper,
  decorators: [
    (Story) => (
      <div style={{ width: 400.67 }}>
        <video height="720px" muted  />
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof YTStamper>;

export const Primary: Story = {
  render: () => {
    const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
    return <YTStamper timestamps={timestamps} onChange={setTimestamps} />;
  },
};

export const WithItem: Story = {
  render: () => {
    const [timestamps, setTimestamps] = useState<Timestamp[]>([
      { id: nanoid(), time: "00:00", text: "text" },
      { id: nanoid(), time: "00:00", text: "text" },
      { id: nanoid(), time: "00:00", text: "text" },
    ]);
    return <YTStamper timestamps={timestamps} onChange={setTimestamps} />;
  },
};
