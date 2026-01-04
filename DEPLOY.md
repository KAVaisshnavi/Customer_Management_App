# Deployment Guide for Customer Management App

This guide explains how to deploy your **Customer Management App** to **Render.com** as a single "Monorepo" web service.

## Prerequisites

1.  **GitHub Account**: Ensure this code is pushed to your GitHub repository.
2.  **Render.com Account**: Sign up for a free account at [render.com](https://render.com).

## Project Setup (Already Done)

We have configured the project for deployment:
*   **Root `package.json`**: orchestrates installing dependencies for both Client and Server, and building the React app.
*   **Server**: Configured to serve the static React files from `client/dist`.
*   **Client**: Configured to use relative API paths in production.

## Deployment Steps

### 1. Push Changes to GitHub
Make sure all your changes (including the new `package.json`) are committed and pushed to GitHub.

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create Web Service on Render

1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub account and select your `Customer_Management_App` repository.
4.  Configure the service with the following settings:
    *   **Name**: `customer-management-app` (or any name you like)
    *   **Region**: Closest to you (e.g., Singapore, Oregon)
    *   **Branch**: `main` (or your default branch)
    *   **Runtime**: **Node**
    *   **Build Command**: `npm install`
        *   *Note: This runs the `postinstall` script in `package.json` which installs all dependencies and builds the React app.*
    *   **Start Command**: `npm start`
    *   **Instance Type**: **Free**

5.  Click **Create Web Service**.

### 3. Monitoring

Render will start the build process:
1.  It will clone the repo.
2.  Run `npm install` (and `postinstall` scripts).
3.  Start the server with `node server.js`.

Watch the logs. Once you see `Server is running on port ...`, your app is live!

## Important Notes

### Database Persistence (SQLite)
Since this app uses **SQLite** (`database.sqlite`) which saves data in a file:
*   **On Render Free Tier**: The filesystem is **ephemeral**. This means every time you redeploy or the server restarts (which happens occasionally on free tier), **your data will be reset**.
*   **Solution for Production**: For a real production app, you should use a hosted database like **PostgreSQL** (Render offers a managed Postgres) or **MongoDB**.
*   **For Demo**: This setup is fine, but be aware that data won't stick around forever.

### Environment Variables
If you need to change the port or other settings, you can add them in the **Environment** tab on Render.
*   `PORT`: defaults to `10000` on Render (Node runtime handles this automatically).
*   `NODE_ENV`: Set to `production`.

## Troubleshooting

*   **Build Fails**: Check the "Logs" tab. Ensure `npm run build` works locally in the `client` folder.
*   **White Screen**: Ensure the server is correctly pointing to `../client/dist`.

Enjoy your deployed app!
