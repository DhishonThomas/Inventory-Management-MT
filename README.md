
# Inventory Management System

An **Inventory Management System** built to streamline and optimize inventory tracking, sales reporting, and product management. This system allows users to manage products, track sales, and export data efficiently, providing an all-in-one solution for business operations.

## 🌟 Features
- **Product Management**: Add, edit, delete, and search for products in your inventory.
- **Sales Tracking**: Manage and track sales records with frontend pagination.
- **Data Export**: Export data in multiple formats: 
  - Print
  - Excel
  - PDF
- **User Authentication**: Secure login and management.
- **Dark Mode UI**: Clean and user-friendly interface.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux Toolkit

---

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/DhishonThomas/Inventory-Management-MT.git
```

### Project Setup

#### 1. **Client Setup**
Navigate to the client directory:
```bash
cd client
```
Install the dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```

#### 2. **Server Setup**
Navigate to the server directory:
```bash
cd server
```
Install the dependencies:
```bash
npm install
```
Start the server:
```bash
npm start
```

---

## 🧩 Environment Variables
### **Client**
Create a `.env` file in the `client` directory with the following content:
```env
VITE_SERVER_URL=http://localhost:4000/api
```

### **Server**
Create a `.env` file in the `server` directory with the following content:
```env
MONGODB_URI=mongodb://localhost:27017/Inventory-Management-MT
JWT_SECRET=ifkdsafkjuds234oifjadskflug0r3982
```

---

## 📂 Project Structure
```
Inventory-Management-MT/
├── client/       # Frontend React application
│   ├── src/      # React components, hooks, utils
│   ├── .env      # Client environment variables
│   ├── package.json
│   └── ...
├── server/       # Backend Express application
│   ├── routes/   # API routes
│   ├── models/   # MongoDB models
│   ├── .env      # Server environment variables
│   ├── server.js # Main server file
│   ├── package.json
│   └── ...
└── README.md     # Project documentation
```

---

## 📦 Deployment Instructions
- Ensure MongoDB is running locally or provide a remote MongoDB URI in the server `.env`.
- Start both the **client** and **server** as described in the setup instructions.

---

## 📜 Additional Notes
This system is designed to work locally for development. Ensure proper hosting and configuration when deploying to production.

- **Frontend Port**: `4173`
- **Backend Port**: `4000`

---

## 🤝 Contributions
Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## 🔗 Links
- **GitHub Repository**: [Inventory Management System](https://github.com/DhishonThomas/Inventory-Management-MT)

---

## 📧 Contact
For any queries, reach out to **[Dhishon Thomas](https://github.com/DhishonThomas)**.

---
