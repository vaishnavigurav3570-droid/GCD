# AgriBot Setup & Troubleshooting Guide

## ✅ All Fixes Applied

### 1. **Fixed Viewport Warning**
- **Issue**: Next.js 16 requires viewport configuration to be separate from metadata
- **Fix**: Moved viewport config to a separate `export const viewport` in `app/layout.tsx`
- **File**: `app/layout.tsx`
- **Status**: ✓ FIXED

### 2. **Enhanced ChatBot Component**
- **Issue**: Missing proper error handling and logging
- **Fixes Applied**:
  - Added comprehensive console logging to track message flow
  - Added timeout handling (30 seconds) for API requests
  - Better error messages that include the actual error details
  - Added AbortController for request cancellation
  - Improved error state feedback to user
- **Files**: `components/chatbot/AgriBot.tsx`, `lib/gemini-client.ts`
- **Status**: ✓ FIXED

### 3. **Improved API Route**
- **File**: `app/api/chat/route.ts`
- **Status**: ✓ VERIFIED
- **Features**:
  - Proper OpenRouter API integration
  - Google Gemini 1.5 Pro model
  - System prompt with farmer context (Kolval, Goa, 2.5-acre cashew farm)
  - Error handling and validation

## 🔧 Configuration Checklist

### Required Environment Variable
- [ ] `OPENROUTER_API_KEY` - Set in Settings → Vars

### Verify Setup
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for log messages starting with `[v0]` or `[AgriVision]`
4. Expected logs:
   - "AgriVision Dashboard initialized"
   - "API Endpoint: /api/chat"
   - "Using OpenRouter with Google Gemini 1.5 Pro"

## 🐛 Debugging Steps

### If ChatBot Isn't Responding:

**Step 1: Check Browser Console**
```
Open DevTools → Console tab
Look for any red error messages
```

**Step 2: Verify API Key**
```
Go to Settings → Vars
Confirm OPENROUTER_API_KEY is set
(Should start with: sk-or-v1-...)
```

**Step 3: Check Network Tab**
```
Open DevTools → Network tab
Type a message in the chatbot
Look for POST request to /api/chat
Check response status (should be 200)
```

**Step 4: Review Response Body**
```
In Network tab, click the /api/chat request
Go to Response tab
Should contain the AI response in "response" field
```

## 📝 Component Architecture

```
AgriVision Dashboard
├── Header
│   ├── Language Selector
│   └── User Profile
├── Main Content
│   ├── Weather Card
│   ├── Market Prices Card
│   ├── Disease Scanner Card
│   ├── Crop Selection Card
│   ├── Subsidy Alert Card
│   └── Cultivation Timeline
├── Floating ChatBot (AgriBot)
│   ├── Chat Messages
│   ├── Chat Input
│   └── Message History
└── Footer
```

## 🔌 API Flow

```
User Message (AgriBot.tsx)
    ↓
handleSendMessage()
    ↓
getChatResponse() [lib/gemini-client.ts]
    ↓
POST /api/chat [app/api/chat/route.ts]
    ↓
OpenRouter API (Google Gemini 1.5 Pro)
    ↓
Response → Display in Chat
```

## 📊 Expected Behavior

1. **User types message** → Message appears in chat
2. **Loading indicator** → Three bouncing dots appear
3. **API processes** → Takes 2-5 seconds
4. **Bot responds** → Full response appears below user message
5. **Auto-scroll** → Chat automatically scrolls to latest message

## 🚀 Features

- ✅ Real-time chat with Google Gemini
- ✅ Agricultural context (farmer in Kolval, Goa)
- ✅ Multi-language support (English, Konkani, Marathi)
- ✅ Automatic scrolling to latest message
- ✅ Loading states and error handling
- ✅ Comprehensive debug logging

## 📞 Support

If issues persist:
1. Check console logs for specific error messages
2. Verify OPENROUTER_API_KEY is correctly set
3. Try refreshing the page
4. Check network tab for failed requests
5. Review error message shown in the chatbot
