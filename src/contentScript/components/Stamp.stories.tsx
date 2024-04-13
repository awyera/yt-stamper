import type { Meta, StoryObj } from "@storybook/react";

import { Stamp } from "./Stamp";
import { useState } from "react";
import type { Timestamp } from "../lib/types";
import { nanoid } from "nanoid";

const meta: Meta<typeof Stamp> = {
  component: Stamp,
};

export default meta;

type Story = StoryObj<typeof Stamp>;

export const Primary: Story = {
  render: () => {
    const [timestamp, setTimestamp] = useState<Timestamp>({ id: nanoid(), time: "00:00", text: "text" });
    return (
      <Stamp
        video={document.createElement("video")}
        timestamp={timestamp}
        onTimestampChange={(timestamp) => {
          setTimestamp(timestamp);
        }}
        onPlay={() => {}}
        onDelete={() => {}}
      />
    );
  },
};


export const Empty: Story = {
  render: () => {
    const [timestamp, setTimestamp] = useState<Timestamp>({ id: nanoid(), time: "", text: "" });
    return (
      <Stamp
        video={document.createElement("video")}
        timestamp={timestamp}
        onTimestampChange={(timestamp) => {
          setTimestamp(timestamp);
        }}
        onPlay={() => {}}
        onDelete={() => {}}
      />
    );
  },
};
