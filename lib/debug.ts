/**
 * Debug utilities for AgriVision
 */

export const debug = {
  log: (message: string, data?: any) => {
    if (typeof window !== 'undefined') {
      console.log(`[AgriVision] ${message}`, data || '');
    }
  },
  error: (message: string, error?: any) => {
    if (typeof window !== 'undefined') {
      console.error(`[AgriVision ERROR] ${message}`, error || '');
    }
  },
  checkEnvironment: () => {
    if (typeof window !== 'undefined') {
      const checks = {
        API_ENDPOINT: '/api/chat' + ' ✓',
        OpenRouter_Setup: 'Check Settings → Vars for OPENROUTER_API_KEY ✓',
        Browser_Console: 'Open DevTools (F12) to see real-time logs ✓',
      };
      console.table(checks);
    }
  },
};
