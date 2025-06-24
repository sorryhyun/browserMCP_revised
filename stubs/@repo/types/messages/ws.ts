export type SocketMessageMap = {
  browser_navigate: { url: string };
  browser_go_back: {};
  browser_go_forward: {};
  browser_wait: { time: number };
  browser_press_key: { key: string };
  browser_get_console_logs: {};
  browser_screenshot: {};
  browser_click: { element: string };
  browser_drag: { startElement: string; endElement: string };
  browser_hover: { element: string };
  browser_type: { element: string; text: string };
  browser_select_option: { element: string };
  browser_snapshot: {};
};