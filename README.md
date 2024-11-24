
# Inventory Management System

A comprehensive **Inventory Management System** built with **TypeScript**, designed for efficient inventory, sales, and customer management. This project ensures streamlined operations, allowing businesses to manage products, track sales, and maintain customer records effectively.

## 🌟 Features

### **Authentication**
- Secure user authentication using **JWT**.
- User login with token-based authorization.

### **Inventory Management**
- Add, edit, and delete products with proper validation.
- Notifications for actions using **React Toastify**.
- Export inventory reports in:
  - **PDF**
  - **Excel**
  - **Printable formats**

### **Sales Management**
- Sales list with pagination and detailed tracking.
- Generate sales reports with options to export as:
  - **PDF**
  - **Excel**
  - **Printable formats**
- **Checkout System**:
  - Add products to the checkout with **quantity validation**.
  - Select or create a customer for the purchase.

### **Customer Management**
- Create, edit, and delete customer records.
- Track customer activity through reports.
- Export customer data as:
  - **PDF**
  - **Excel**
  - **Printable formats**

### **Reusable Components**
- Designed with reusable UI components:
  - **Modal**
  - **Button**
  - **Input Field**
  - **Wrapper**
- Ensures clean and modular code.

---

## 🛠️ Tech Stack

### **Frontend**
- React with **TypeScript**
- **Vite** for fast development builds
- **TailwindCSS** for styling
- **Redux Toolkit** for state management
- **Axios Interceptors** for secure and consistent API handling

### **Backend**
- Node.js with **Express**
- MongoDB for database management
- **JWT** for secure authentication
- **Mongoose** for schema modeling

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
Install dependencies:
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
Install dependencies:
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
Create a `.env` file in the `client` directory with the following:
```env
VITE_SERVER_URL=http://localhost:4000/api
```

### **Server**
Create a `.env` file in the `server` directory with the following:
```env
MONGODB_URI=mongodb://localhost:27017/Inventory-Management-MT
JWT_SECRET=ifkdsafkjuds234oifjadskflug0r3982
```

---

## 📂 Project Structure

```
Inventory-Management-MT/
├── client/       # Frontend application
│   ├── src/      # React components, hooks, utils
│   ├── .env      # Client environment variables
│   ├── package.json
│   └── ...
├── server/       # Backend application
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

## 🎨 Key Highlights
- **TypeScript Integration**: Strongly typed code for better maintainability.
- **Toast Notifications**: For instant feedback on actions.
- **Reusable Components**: Modular approach with common UI elements.
- **Data Exports**: Unified PDF, Excel, and Print functionalities across **products**, **sales**, and **customers**.
- **Checkout System**: Handles customer creation and product quantity validation during sales.

---

## 🤝 Contributions
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

---

## 🔗 Links
- **GitHub Repository**: [Inventory Management System](https://github.com/DhishonThomas/Inventory-Management-MT)

---

## 📧 Contact
For any queries, reach out to **[Dhishon Thomas](https://github.com/DhishonThomas)**.

---