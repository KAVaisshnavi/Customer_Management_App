# Customer Management Application

A full-stack application to manage customers and their addresses. Built with React.js, Node.js (Express), and SQLite.

## Tech Stack
- **Frontend**: React (Vite), React Router DOM, Axios, Vanilla CSS.
- **Backend**: Node.js, Express.js, Sequelize (ORM).
- **Database**: SQLite3.

## Features Implemented
### Customer Management
- **Create Customer**: Form to add customers with basic validation. Creates an initial address automatically.
- **Read Customers**: List view with Search functionality (City, State, Pin Code).
- **Update Customer**: Edit First Name, Last Name, and Phone Number.
- **Delete Customer**: Remove customer (cascades to addresses).

### Multiple Address Management
- **View Addresses**: See all addresses for a customer.
- **Add Address**: Add multiple addresses to a single customer.
- **Update Address**: Edit any existing address.
- **Indicators**: Visual indication of "Single Address" vs "Multiple Addresses".

## Steps to Run Locally

### Prerequisites
- Node.js installed.

### Setup Backend
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   # OR
   node server.js
   ```
   The server runs on `http://localhost:5000`. Database `database.sqlite` will be created automatically.

### Setup Frontend
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173` (typically).

## Screenshots
*(Add screenshots here after running the application)*

## Deployment

This application is configured to be deployed as a monolithic application where the Node.js server serves the React frontend.

### Pre-deployment Steps/Checks
1.  **Build the Frontend**: The `client/dist` folder is required.
    ```bash
    cd client
    npm install
    npm run build
    ```
2.  **Database**: Note that SQLite is a file-based database. On ephemeral hosting (like Render Free Tier, Vercel, Heroku), **data will be lost on restart**.

### Deploy to Render (Example)
1.  Push this repository to GitHub.
2.  Create a new **Web Service** on Render.
3.  Connect your GitHub repository.
4.  **Build Command**: `cd client && npm install && npm run build && cd ../server && npm install`
5.  **Start Command**: `cd server && npm start`
6.  **Environment Variables**: Add any needed (e.g., `PORT` is handled automatically, but if you have secrets, add them).

### Deploy to Vercel (Backend may require Serverless functions adaption)
*Note: This specific setup is optimized for a continuously running Node server. For Vercel, you often deploy the `client` as a static site and `server` as serverless functions, which requires a different configuration (e.g., specific `vercel.json`).*

### Universal/Manual Deployment
1.  Run `npm run build` in `client/`.
2.  Copy or ensure `client/dist` exists relative to `server/`.
3.  Run `npm start` in `server/`.
4.  The server will serve the app on port `5000` (or `process.env.PORT`).
