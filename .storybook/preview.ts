import "../out/index.css";

import type { Preview } from "@storybook/react";

export default {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0f0f0f",
        },
      ],
    }
  }
} satisfies Preview;
