# 🧠 Mem0 Setup Guide - Quick Start

## ⚡ 5-Minute Setup

### Step 1: Get Mem0 API Key (2 minutes)

1. Go to: https://app.mem0.ai/dashboard/api-keys
2. Sign up or log in
3. Click "Create New API Key"
4. Copy the key

### Step 2: Add to Backend `.env` (1 minute)

```bash
# backend/.env
MEM0_API_KEY=your_mem0_api_key_here
```

### Step 3: Restart Backend (1 minute)

```bash
cd backend
npm run dev
```

### Step 4: Test It! (1 minute)

Generate a fullstack project and check console for:
```
💾 STEP 1.5: Storing backend knowledge in Mem0...
✅ Backend knowledge stored in Mem0 (Memory ID: xxx)
```

---

## 🎯 How It Works

### Without Mem0 (BROKEN ❌)
```
Backend Code (50k chars)
    ↓
Frontend Generation
    ↓
RECITATION FILTER TRIGGERED
    ↓
Frontend: 0 chars ❌
```

### With Mem0 (WORKING ✅)
```
Backend Code (50k chars)
    ↓
Extract Knowledge (2-5k chars)
    ↓
Store in Mem0
    ↓
Frontend Generation (independent)
    ↓
Frontend: 35k+ chars ✅
```

---

## 📊 Two Endpoints

### 1. `/build/separate` - Generate Backend + Frontend

**When:** First time generating a project

**Request:**
```json
{
  "backendContext": "Create an e-commerce API...",
  "frontendContext": "Create a product listing page...",
  "projectId": "project_1763139138035"
}
```

**Response:**
```json
{
  "backend": "...backend code...",
  "frontend": "...frontend code..."
}
```

**What Happens:**
1. ✅ Backend generated
2. ✅ Backend knowledge stored in Mem0
3. ✅ Frontend generated (independent)

---

### 2. `/build/frontend-with-mem0` - Generate Frontend Only

**When:** Need to generate additional frontend for same backend

**Request:**
```json
{
  "projectId": "project_1763139138035",
  "frontendContext": "Create a user dashboard page..."
}
```

**Response:**
```json
{
  "frontend": "...frontend code with API integration...",
  "projectId": "project_1763139138035"
}
```

**What Happens:**
1. ✅ Retrieve backend knowledge from Mem0
2. ✅ Generate frontend with integration
3. ✅ No content filter triggered!

---

## 🧪 Quick Test

### Test 1: Generate Fullstack

```bash
# 1. Go to frontend app
# 2. Create fullstack project: "Create an e-commerce platform"
# 3. Check console for:

✅ Backend code generated: 45810 chars
💾 STEP 1.5: Storing backend knowledge in Mem0...
✅ Backend knowledge stored in Mem0 (Memory ID: mem_xxx)
✅ Frontend code generated: 35000 chars
✅ SEPARATE GENERATION COMPLETE!
```

### Test 2: Generate Frontend Only

```bash
# 1. Copy projectId from previous test
# 2. Call endpoint:

curl -X POST http://localhost:3000/build/frontend-with-mem0 \
  -H "Content-Type: application/json" \
  -d '{
    "projectId": "project_1763139138035",
    "frontendContext": "Create a user dashboard page"
  }'

# 3. Check console for:

🧠 /BUILD/FRONTEND-WITH-MEM0 ENDPOINT CALLED
🔍 STEP 1: Retrieving backend knowledge from Mem0...
✅ Retrieved backend knowledge (2500 chars)
🎨 STEP 2: Generating frontend with Mem0 backend knowledge...
✅ Frontend code generated: 30000 chars
✅ FRONTEND GENERATION WITH MEM0 COMPLETE!
```

---

## 🎯 Key Points

### ✅ What Works Now

- ✅ Backend generation (independent)
- ✅ Frontend generation (independent)
- ✅ Backend knowledge stored in Mem0
- ✅ Frontend retrieved with backend knowledge
- ✅ **NO content filter triggered!**

### ✅ What You Can Do

- ✅ Generate backend once
- ✅ Generate multiple frontends for same backend
- ✅ Generate at different times
- ✅ Scale to unlimited projects
- ✅ Avoid content filter completely

### ✅ What's Stored in Mem0

- API endpoints (GET, POST, PUT, DELETE)
- Authentication method (JWT, Bearer token)
- Features (validation, hashing, CORS, etc.)
- Data models (Product, User, Order, etc.)
- Base URL and API prefix

---

## 🚨 Troubleshooting

### Problem: "MEM0_API_KEY not set"

**Solution:**
1. Get key from https://app.mem0.ai/dashboard/api-keys
2. Add to `backend/.env`: `MEM0_API_KEY=your_key`
3. Restart backend: `npm run dev`

### Problem: "No backend knowledge found in Mem0"

**Solution:**
1. Make sure you generated backend using `/build/separate`
2. Check that Mem0 API key is correct
3. Check Mem0 dashboard for stored memories

### Problem: Frontend still getting RECITATION filter

**Solution:**
1. Make sure you're using `/build/separate` endpoint
2. Check that backend knowledge is being stored
3. Use `/build/frontend-with-mem0` for subsequent frontends

---

## 📚 Files

- **`backend/src/services/mem0.service.ts`** - Mem0 integration
- **`backend/src/index.ts`** - Updated endpoints
- **`MEM0_INTEGRATION.md`** - Full documentation
- **`MEM0_SETUP.md`** - This file

---

## 🎉 You're All Set!

1. ✅ Add Mem0 API key to `.env`
2. ✅ Restart backend
3. ✅ Generate fullstack project
4. ✅ Watch the magic happen!

**Your fullstack generator now works perfectly!** 🚀🔥

For detailed documentation, see `MEM0_INTEGRATION.md`
