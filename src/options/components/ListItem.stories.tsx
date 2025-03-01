import type { Meta, StoryObj } from '@storybook/react';

import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  component: ListItem,
};

export default meta;

type Story = StoryObj<typeof ListItem>;

export const Primary: Story = {
  render: () => (
    <ListItem
      videoId="videoId"
      videoTimestamps={{
        list: [],
        videoDetails: {
          videoId: 'videoId',
          title: 'title',
          author: 'author',
          channelId: 'channelId',
          lengthSeconds: 'lengthSeconds',
          publishedAt: new Date('2025-02-14T10:00:00+00:00'),
        },
      }}
      onDelete={() => {}}
    />
  ),
};
