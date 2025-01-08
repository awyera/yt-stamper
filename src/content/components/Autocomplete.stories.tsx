import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete } from './Autocomplete';
import { TrieProvider } from '../../context/TrieContext';
import { useState } from 'react';

const meta: Meta<typeof Autocomplete> = {
  component: Autocomplete,
  decorators: [
    (Story) => (
      <TrieProvider>
        <div className="w-20">
          <Story />
        </div>
      </TrieProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Autocomplete>;

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState('text');
    return <Autocomplete value={value} onChange={setValue} />;
  },
};
