# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Browser MCP server - a Model Context Protocol (MCP) implementation that enables AI assistants to automate browser actions through a Chrome extension. The server acts as a bridge between MCP clients (VS Code, Claude, Cursor, Windsurf) and the browser.

## Development Commands

```bash
# Build the project
npm run build

# Type check without emitting files
npm run typecheck

# Watch mode for development
npm run watch

# Run MCP inspector for debugging
npm run inspector
```

Note: No test or lint commands are currently configured. When implementing new features, ensure TypeScript compilation passes with `npm run typecheck`.

## Architecture

### Core Components

1. **MCP Server** (`src/server.ts`): Handles MCP protocol communication and WebSocket connections to the browser extension
2. **Tools** (`src/tools/`): Browser automation actions organized in three categories:
   - **Common**: Basic navigation and interaction (navigate, goBack, goForward, wait, pressKey)
   - **Custom**: Extended functionality (getConsoleLogs, screenshot)
   - **Snapshot**: ARIA-based element interaction (click, hover, type, selectOption, drag)
3. **Context** (`src/utils/context.ts`): Manages WebSocket connection state and message passing
4. **ARIA Snapshots** (`src/utils/aria-snapshot.ts`): Captures accessibility tree for element targeting

### Key Patterns

- **Tool Factory Pattern**: Tools that support optional snapshot mode use factories (e.g., `navigate(true)`)
- **Message Protocol**: All browser commands go through typed WebSocket messages via `context.sendSocketMessage()`
- **Timeout Handling**: Default 30-second timeout for all browser operations
- **Single Connection**: Only one browser tab can be connected at a time

### Important Dependencies

This project currently depends on workspace packages from its original monorepo:
- `@repo/config` - Application configuration
- `@repo/messaging` - Message type definitions
- `@repo/types` - Shared TypeScript types
- `@repo/utils` - Utility functions

These dependencies prevent standalone builds until resolved.

## Tool Implementation Guide

When adding new tools:
1. Define the tool in the appropriate category file (`common.ts`, `custom.ts`, or `snapshot.ts`)
2. Use the `Tool` interface with proper input/output schemas using Zod
3. Send messages to the browser via `context.sendSocketMessage()`
4. Handle errors and timeouts appropriately
5. Add the tool to the appropriate tools array in `index.ts`

Example tool structure:
```typescript
export const myTool: Tool = {
  name: "tool_name",
  description: "What this tool does",
  inputSchema: z.object({
    param: z.string().describe("Parameter description"),
  }),
  handler: async ({ input, context }) => {
    const result = await context.sendSocketMessage("browser_action", input);
    return { content: [{ type: "text", text: result }] };
  },
};
```

## WebSocket Communication

The server communicates with the browser extension via WebSocket:
- Server listens on a configurable port (from `mcpConfig.defaultWsPort`)
- Messages follow the `SocketMessageMap` type definitions
- Browser must be connected before tools can be used
- Connection status is managed by the Context class