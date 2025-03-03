import type { Meta, StoryObj } from '@storybook/react';
import type { Timestamp } from '../../lib/types';
import { YTStamper } from './YTStamper';
import { nanoid } from 'nanoid';
import { useState } from 'react';

const meta: Meta<typeof YTStamper> = {
  component: YTStamper,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', gap: 24 }}>
        <video width={640} height={360} style={{ backgroundColor: 'gray' }} muted />
        <div style={{ width: 400.67 }}>
          <Story />
        </div>
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
      { id: nanoid(), time: '00:00:00', text: 'text' },
      { id: nanoid(), time: '00:00:00', text: 'text' },
      { id: nanoid(), time: '00:00:00', text: 'text' },
    ]);
    return <YTStamper timestamps={timestamps} onChange={setTimestamps} />;
  },
};
