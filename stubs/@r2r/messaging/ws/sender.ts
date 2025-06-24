import type { WebSocket } from 'ws';

export function createSocketMessageSender<T>(ws: WebSocket) {
  return {
    sendSocketMessage: async (
      type: string,
      payload: any,
      options?: { timeoutMs?: number }
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        const timeout = options?.timeoutMs || 30000;
        
        const timer = setTimeout(() => {
          reject(new Error(`Request timed out after ${timeout}ms`));
        }, timeout);

        ws.send(JSON.stringify({ type, payload }), (err) => {
          if (err) {
            clearTimeout(timer);
            reject(err);
          }
        });

        ws.once('message', (data) => {
          clearTimeout(timer);
          try {
            const response = JSON.parse(data.toString());
            resolve(response);
          } catch (e) {
            reject(new Error('Failed to parse response'));
          }
        });
      });
    }
  };
}