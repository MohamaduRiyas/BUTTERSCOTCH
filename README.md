# Butterscotch Departmental Store Web App

This is the complete full-stack code for the Butterscotch Departmental Store, a modern e-commerce application. It features a **React/TypeScript** frontend and a **Node.js/Express/MongoDB** backend. The application is fully functional, with real data persistence, user authentication, a product catalog, a shopping cart, and an admin dashboard for managing products and orders.

## ✨ Features

- **Full-Stack Integration**: A seamless connection between the React frontend and the Node.js backend API.
- **Persistent Data**: All data (users, products, orders) is stored and managed in a MongoDB Atlas database.
- **JWT Authentication**: Secure user registration and login with JSON Web Tokens, including role-based access control.
- **Dynamic Product Catalog**: Products are fetched live from the database, allowing for real-time updates.
- **Complete Order System**: Users can place orders, which are saved to the database. Logged-in users can view their order history.
- **Admin Dashboard**: A protected area for admins to view all products and customer orders directly from the database.

## Frontend Tech Stack

- **React 18** & **TypeScript**
- **Tailwind CSS**
- **React Router v6**
- **React Context API** for state management
- **Axios** for API communication

## Backend Tech Stack

- **Node.js** & **Express**
- **MongoDB** with **Mongoose** for data modeling
- **JSON Web Tokens (JWT)** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variable management

## 🚀 Getting Started

To get the full-stack application running locally, follow these steps.

### 1. Backend Setup

First, navigate into the backend directory and set up the server.

```bash
cd backend
```

**a. Create `.env` file:**

Create a new file named `.env` in the `backend` directory and paste the following content into it. This file securely stores your database connection string and other secret keys.

```.env
# Environment - set to 'development' or 'production'
NODE_ENV=development

# Server Port
PORT=5000

# Your MongoDB Connection URI from MongoDB Atlas
MONGO_URI=mongodb+srv://riyasmd1368_db_user:14sHAzZ0CYKKHrLx@cluster0.pnjxejw.mongodb.net/butterscotch?retryWrites=true&w=majority&appName=Cluster0

# Your secret key for signing JSON Web Tokens
JWT_SECRET=super_secret_butterscotch_key
```

> **Important:** Make sure your `MONGO_URI` includes the database name (`/butterscotch`) after the cluster address and before the query parameters (`?retryWrites...`). A missing database name is a common cause of connection errors.

**b. Install Dependencies:**

```bash
npm install
```

**c. Seed the Database:**

Run the following command to populate your MongoDB database with initial data (products and sample users).

```bash
npm run data:import
```

This will create an admin user (`admin@butterscotch.com`) and a regular user (`john@example.com`).

**d. Start the Backend Server:**

```bash
npm run server
```

Your backend API will now be running on `http://localhost:5000`.

### 2. Frontend Setup

The frontend is pre-configured to connect to the backend. You just need to start it. *Open a new terminal window* for this step.

The frontend uses an `importmap`, so no `npm install` is needed. Simply serve the `index.html` file. You can use any simple static server, like the "Live Server" extension in VS Code.

Once the frontend is running, it will automatically proxy API requests to your backend server.

You can now:
- **Register** a new account.
- **Login** as an admin using `admin@butterscotch.com` with password `adminpassword`.
- **Shop**, **add items to your cart**, and **place orders**!