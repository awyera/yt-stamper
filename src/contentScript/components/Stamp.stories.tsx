import type { Meta, StoryObj } from '@storybook/react';

import { nanoid } from 'nanoid';
import { useState } from 'react';
import type { Timestamp } from '../../lib/types';
import { Stamp } from './Stamp';

const meta: Meta<typeof Stamp> = {
  component: Stamp,
};

export default meta;

type Story = StoryObj<typeof Stamp>;

export const Primary: Story = {
  render: () => {
    const [timestamp, setTimestamp] = useState<Timestamp>({ id: nanoid(), time: '00:00', text: 'text' });
    return (
      <Stamp
        video={document.createElement('video')}
        timestamp={timestamp}
        onChange={(timestamp) => {
          setTimestamp(timestamp);
        }}
        seek={() => {}}
        onDelete={() => {}}
      />
    );
  },
};

export const Empty: Story = {
  render: () => {
    const [timestamp, setTimestamp] = useState<Timestamp>({ id: nanoid(), time: '', text: '' });
    return (
      <Stamp
        video={document.createElement('video')}
        timestamp={timestamp}
        onChange={(timestamp) => {
          setTimestamp(timestamp);
        }}
        seek={() => {}}
        onDelete={() => {}}
      />
    );
  },
};
