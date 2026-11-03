import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Foundations", "UI", "Rooms", "Admin", "Shell"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "390px",
            height: "844px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
      },
    },
    backgrounds: {
      options: {
        canvas: {
          name: "bg/canvas",
          value: "#FCFBF7",
        },
      },
    },
  },
  initialGlobals: {
    backgrounds: {
      value: "canvas",
    },
  },
};

export default preview;
