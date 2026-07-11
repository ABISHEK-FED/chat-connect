<<<<<<< HEAD
# ChatConnect – Real-Time Online Chat Application

A full-stack MERN (MongoDB, Express, React, Node.js) real-time chat app with JWT auth,
Socket.IO messaging, online status, typing indicators, and a WhatsApp-inspired UI.

## Project Structure

```
chatconnect/
├── client/          React (Vite) + Tailwind frontend
└── server/          Express + MongoDB + Socket.IO backend
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)

## 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chatconnect
JWT_SECRET=some_long_random_secret
CLIENT_URL=http://localhost:5173
```

Run it:

```bash
npm run dev      # requires nodemon (npm install -g nodemon), or:
npm start
```

The API runs on `http://localhost:5000`. Visiting `/` returns a JSON health-check message.

## 3. Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Edit `.env` if your backend runs elsewhere:

```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Run it:

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

## 4. Try it out

1. Open two browser windows (or one normal + one incognito).
2. Register two different accounts.
3. Select each other from the sidebar and start chatting — messages arrive instantly,
   with online/offline status and a typing indicator.

## 5. API Endpoints

| Method | Endpoint              | Description                     | Auth |
|--------|------------------------|----------------------------------|------|
| POST   | /api/auth/register     | Register a new user             | No   |
| POST   | /api/auth/login        | Login and receive a JWT         | No   |
| GET    | /api/auth/profile      | Get logged-in user's profile    | Yes  |
| GET    | /api/users             | List all users (supports `?search=`) | Yes |
| GET    | /api/users/:id         | Get a single user                | Yes  |
| POST   | /api/messages/send     | Send a message (`receiverId`, `message`) | Yes |
| GET    | /api/messages/:userId  | Get conversation with a user     | Yes  |

## 6. Socket.IO Events

| Event             | Direction        | Payload                                |
|--------------------|------------------|------------------------------------------|
| `addUser`          | client → server  | `userId`                                 |
| `getOnlineUsers`    | server → client  | `string[]` of online user IDs           |
| `receiveMessage`   | server → client  | full message object                     |
| `typing`            | both directions  | `{ senderId, receiverId }`              |
| `stopTyping`        | both directions  | `{ senderId, receiverId }`              |

## 7. Deployment

- **Frontend (Vercel):** deploy the `client/` folder. Set `VITE_API_URL` and
  `VITE_SOCKET_URL` env vars to your deployed backend's URL.
- **Backend (Render):** deploy the `server/` folder as a Web Service. Set `MONGO_URI`,
  `JWT_SECRET`, and `CLIENT_URL` (your deployed frontend URL) as environment variables.
- **Database (MongoDB Atlas):** create a free cluster, whitelist `0.0.0.0/0` (or Render's
  IPs), and use the connection string as `MONGO_URI`.

## 8. Security Notes (for learning)

- Passwords are hashed with bcrypt before being stored — never in plaintext.
- JWTs are signed with `JWT_SECRET` and expire after 7 days.
- All chat/user routes are protected by an `Authorization: Bearer <token>` header,
  verified by the `protect` middleware.
- CORS is restricted to `CLIENT_URL` on the backend.

## 9. Ideas to Extend This Project

- Group chats
- Message read receipts
- Image/file sharing
- Push notifications
- Message deletion/editing
- Dark mode
=======
# chat-connect
>>>>>>> 317668feb36514c9d08b7b8fb8df66a1e346e0d5
