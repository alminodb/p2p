# P2P-Chatbox

**P2P-Chatbox** is a peer-to-peer chat application designed for real-time messaging. Built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Socket.IO**, this project provides a seamless, interactive chat experience. The backend and frontend are hosted in separate repositories to ensure modularity and ease of deployment.

### Project Repositories

- **Frontend**: [p2p-chat](https://github.com/alminodb/p2p-chat)
- **Backend**: [p2p-chat-backend](https://github.com/alminodb/p2p-chat-backend)

---

### Features

- **Real-time Messaging**: Enabled by Socket.IO, allowing instant message delivery.
- **Authentication**: Secure login and registration with JWT.
- **Persistent Chat History**: MongoDB stores user data and message history for easy retrieval.
- **Responsive Interface**: Built with React to support both mobile and desktop-friendly use.
- **Scroll-Based Message Loading**: Loads older messages as the user scrolls, reducing initial load time.
- **Group chat**: Ability to chat with multiple users at the same time.
- **User activity**: Shows if user is currently online.
- **Friends system**: Ability to add someone as a friend.

---

### Technologies Used

- **Frontend**: React with Chakra UI for styling, providing a modern and accessible design.
- **Backend**: Node.js and Express, with RESTful API endpoints and WebSocket integration via Socket.IO.
- **Database**: MongoDB for reliable data storage.

---

### Installation and Setup

To set up the project locally, follow these steps for both the frontend and backend.

#### 1. Clone and Set Up the Frontend

Repository: [Frontend](https://github.com/alminodb/p2p-chat)

```bash
git clone https://github.com/alminodb/p2p-chat.git
cd p2p-chat
npm install
npm start
```

#### 2. Clone and Set Up the Backend

Repository: [Backend](https://github.com/alminodb/p2p-chat-backend)

```bash
git clone https://github.com/alminodb/p2p-chat-backend.git
cd p2p-chat-backend
npm install
npm start
```

#### 3. Configure the Connection\

Update the backend URL in the frontend code to ensure both parts connect successfully.

