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
<img width="1970" height="1494" alt="Screenshot 2026-01-05 131551" src="https://github.com/user-attachments/assets/6ee69ba6-3d51-490e-8d91-b2a6f24645fa" />
<img width="1806" height="1517" alt="Screenshot 2026-01-05 131610" src="https://github.com/user-attachments/assets/9a848869-39d3-4102-b009-8ee5114e4b44" />

<img width="1799" height="1411" alt="Screenshot 2026-01-05 131635" src="https://github.com/user-attachments/assets/6f997b7b-73a0-44a6-8e43-f3220178d47e" />
<img width="1777" height="1492" alt="Screenshot 2026-01-05 131701" src="https://github.com/user-attachments/assets/1c285faf-096a-40da-b945-20f1d07c9c1c" />
<img width="1598" height="1459" alt="Screenshot 2026-01-05 131818" src="https://github.com/user-attachments/assets/01ffbf22-39b1-42a4-9521-dc1d290ef3f2" />
<img width="1563" height="1484" alt="Screenshot 2026-01-05 131832" src="https://github.com/user-attachments/assets/2cd85d0d-a67d-4915-a51d-20282023120e" />
<img width="1568" height="753" alt="Screenshot 2026-01-05 131852" src="https://github.com/user-attachments/assets/7cf88f4f-3dc1-4131-8399-81b03c3ab642" />
<img width="1574" height="1161" alt="Screenshot 2026-01-05 131940" src="https://github.com/user-attachments/assets/deb2e8a8-80f1-46c6-98eb-fbe5dc531c93" />
<img width="1549" height="1123" alt="Screenshot 2026-01-05 132029" src="https://github.com/user-attachments/assets/adac0863-12ed-4ebe-9b35-ba49d4db0f68" />

<img width="1602" height="951" alt="image" src="https://github.com/user-attachments/assets/080d26bd-84f6-4f7f-9a70-aab8f407778c" />


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
