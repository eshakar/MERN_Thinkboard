## 🧠 ThinkBoard – Notes with Role-Based Access & Analytics

A modern full-stack **Notes App** built with:

* ⚙️ **Node.js + Express + MongoDB**
* ⚛️ **React + Tailwind CSS + DaisyUI**
* 🔐 **JWT Authentication (Admin/User roles)**
* 📊 **Admin Analytics Dashboard**
* 🚦 **Rate Limiting with Upstash Redis**

---

### 🚀 Features

| Feature            | Description                                             |
| ------------------ | ------------------------------------------------------- |
| 🔐 JWT Auth        | Role-based login (Admin/User) with secure token storage |
| 📝 Notes CRUD      | Create, edit, delete, and view notes                    |
| ⚠️ Rate Limiting   | Prevent abuse by limiting rapid requests                |
| 📈 Admin Analytics | Dashboard for Admin showing user activity, tags, trends |
| 🎨 Stylish UI      | TailwindCSS + DaisyUI theme (`forest`)                  |
| ☁️ MongoDB Atlas   | Cloud DB to persist notes and users                     |

---

## 📁 Project Structure

```
thinkboard/
├── backend/
│   ├── config/           # MongoDB connection
│   ├── controllers/      # Logic for auth, notes, analytics
│   ├── middleware/       # Auth, rateLimiter
│   ├── models/           # User.js, Note.js
│   ├── routes/           # Express routes
│   └── server.js         # Main server
├── frontend/
│   ├── components/       # Navbar, NoteCard, etc.
│   ├── lib/              # Axios, Auth helper
│   ├── pages/            # Login, Register, Dashboard, etc.
│   ├── App.jsx           # Routes
│   └── main.jsx          # Entry point
└── README.md             # This file
```

---

## 🛠️ Installation

### 🧩 Prerequisites

* Node.js `v18+`
* MongoDB Atlas account (or local)
* Upstash Redis account (for rate limiting)

---

### 🔌 Backend Setup

```bash
cd backend
npm install
```

#### 🔐 Create `.env` in `/backend`:

```env
PORT=5001
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_super_secret_jwt_key
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

#### ▶ Start Backend:

```bash
npm run dev
```

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
```

#### ▶ Start Frontend:

```bash
npm run dev
```

> App will open at `http://localhost:5173`

---

## 🧪 Usage Flow

### 👤 Authentication

* On **Register Page**, choose:

  * 👤 `User` → can manage personal notes.
  * 🛡️ `Admin` → can access Analytics.

### 🧭 Navigation

| Page         | Description                      |
| ------------ | -------------------------------- |
| `/register`  | Register as User or Admin        |
| `/login`     | Login with email/password        |
| `/`          | Home page (Dashboard with notes) |
| `/create`    | Add a new note                   |
| `/notes/:id` | View/update note                 |
| `/analytics` | Admin-only dashboard with charts |

---

## 📊 Admin Analytics

Shows:

* Top 5 active users
* Most used tags
* Notes created per day (last 7 days)

Built with [Recharts](https://recharts.org/).

---

## 🔐 Auth Helpers

**lib/auth.js** handles token:

```js
import jwt_decode from "jwt-decode";

export const saveToken = (t) => localStorage.setItem("token", t);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

export const getUserRole = () => {
  try {
    const token = getToken();
    return token ? jwt_decode(token).role : null;
  } catch {
    return null;
  }
};
```

---

## 📦 Dependencies

### Backend

* `express`
* `mongoose`
* `jsonwebtoken`
* `bcryptjs`
* `cors`
* `dotenv`
* `express-rate-limit`
* `axios`
* `ioredis` (for Upstash Redis)

### Frontend

* `react`
* `react-router-dom`
* `axios`
* `tailwindcss`
* `daisyui`
* `jwt-decode`
* `react-hot-toast`
* `recharts`
* `lucide-react`

---

## 👥 Admin Creation Guide

If you're not marked as `admin` in MongoDB, you can update your user:

1. Go to MongoDB Atlas → Collections → `users`
2. Find your user and update:

```json
{ "role": "admin" }
```

---

## ✅ To-Do / Enhancements

* 🔒 Password Reset
* 🔍 Search notes by keyword
* 📌 Tags and filters
* 🌍 Deploy (e.g. Vercel + Render)

---

## 🧑‍💻 Author

Made by [Esha Kar](https://github.com/eshakar001) – passionate about building secure and scalable full-stack apps.

---


