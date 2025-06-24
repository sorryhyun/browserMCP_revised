import { z } from 'zod';

// Helper to create tool shape
const createToolShape = (name: string, description: string, args: any) => ({
  shape: {
    name: { value: name },
    description: { value: description },
    arguments: args
  }
});

// Common tools
export const NavigateTool = createToolShape(
  "browser_navigate",
  "Navigate to a URL in the browser",
  z.object({
    url: z.string().describe("The URL to navigate to")
  })
);

export const GoBackTool = createToolShape(
  "browser_go_back",
  "Navigate back in the browser history",
  z.object({})
);

export const GoForwardTool = createToolShape(
  "browser_go_forward",
  "Navigate forward in the browser history",
  z.object({})
);

export const WaitTool = createToolShape(
  "browser_wait",
  "Wait for a specified amount of time",
  z.object({
    time: z.number().describe("Time to wait in milliseconds")
  })
);

export const PressKeyTool = createToolShape(
  "browser_press_key",
  "Press a keyboard key",
  z.object({
    key: z.string().describe("The key to press")
  })
);

// Custom tools
export const GetConsoleLogsTool = createToolShape(
  "browser_get_console_logs",
  "Get browser console logs",
  z.object({})
);

export const ScreenshotTool = createToolShape(
  "browser_screenshot",
  "Take a screenshot of the current page",
  z.object({})
);

// Snapshot tools
export const SnapshotTool = createToolShape(
  "browser_snapshot",
  "Capture an ARIA accessibility snapshot of the current page",
  z.object({})
);

export const ClickTool = createToolShape(
  "browser_click",
  "Click on an element",
  z.object({
    element: z.string().describe("The element to click")
  })
);

export const DragTool = createToolShape(
  "browser_drag",
  "Drag from one element to another",
  z.object({
    startElement: z.string().describe("The element to start dragging from"),
    endElement: z.string().describe("The element to drag to")
  })
);

export const HoverTool = createToolShape(
  "browser_hover",
  "Hover over an element",
  z.object({
    element: z.string().describe("The element to hover over")
  })
);

export const TypeTool = createToolShape(
  "browser_type",
  "Type text into an element",
  z.object({
    element: z.string().describe("The element to type into"),
    text: z.string().describe("The text to type")
  })
);

export const SelectOptionTool = createToolShape(
  "browser_select_option",
  "Select an option in a dropdown",
  z.object({
    element: z.string().describe("The dropdown element or option to select")
  })
);