import '../out/contentScript.css';
import type { Preview } from '@storybook/addon-essentials'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0f0f0f',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
}

export default preview;
