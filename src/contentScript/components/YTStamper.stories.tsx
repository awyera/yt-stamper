import type { Meta, StoryObj } from "@storybook/react";

import { YTStamper } from "./YTStamper";

const meta: Meta<typeof YTStamper> = {
	component: YTStamper,
};

export default meta;

type Story = StoryObj<typeof YTStamper>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
	render: () => <YTStamper />,
};
