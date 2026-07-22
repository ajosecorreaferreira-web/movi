import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/index.css'

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
    viewport: {
      viewports: {
        mobile390: {
          name: 'Mobile 390px (iPhone 14)',
          styles: { width: '390px', height: '844px' },
        },
        mobile375: {
          name: 'Mobile 375px (iPhone SE)',
          styles: { width: '375px', height: '667px' },
        },
        tablet768: {
          name: 'Tablet 768px (iPad)',
          styles: { width: '768px', height: '1024px' },
        },
        desktop1440: {
          name: 'Desktop 1440px',
          styles: { width: '1440px', height: '900px' },
        },
      },
      defaultViewport: 'desktop1440',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
