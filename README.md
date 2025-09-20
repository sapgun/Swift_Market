# Swift Market

Swift Market is an XRPL-based Global Peer-to-Peer Marketplace. It aims to revolutionize cross-border e-commerce with near-zero transaction fees and instant settlement by leveraging the power of the XRP Ledger.

---

## 📊 Project Status

**Status:** In Development

This project is currently under active development. Core features are being built and the architecture is being defined.

---

## 🏗️ Architecture Overview

The application is built with a modern web stack, consisting of a React frontend and a serverless backend using Firebase Functions. It interacts with both Firestore for data storage and the XRP Ledger for payment processing.

```
+----------------+      +-----------------------+      +--------------------+
|      User      |----->|    React Frontend     |----->|  Firebase Services |
| (Web Browser)  |      |  (Firebase Hosting)   |      | (Auth, Functions)  |
+----------------+      +-----------------------+      +---------+----------+
                                                                 |
                                     +---------------------------+---------------------------+
                                     |                                                       |
                                     v                                                       v
                             +-----------------+                                 +--------------------+
                             | Firestore DB    |                                 |    XRP Ledger      |
                             | (For Orders)    |                                 | (For Escrow/P2P)   |
                             +-----------------+                                 +--------------------+
```

---

## 🛠️ Technology Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![XRPL](https://img.shields.io/badge/XRP_Ledger-000000?style=for-the-badge&logo=ripple&logoColor=white)

---

## 📂 Project Structure

This repository is a monorepo containing the frontend and backend projects.

```
/
├── functions/              # Main Backend: Firebase Functions (TypeScript, XRPL Integration)
│   ├── src/index.ts
│   └── package.json
├── swift-market/           # Frontend: React Application (TypeScript, Tailwind CSS)
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md               # This file
```

-   **`functions/`**: Contains the primary backend logic. These TypeScript cloud functions handle business logic, interact with the Firestore database, and manage the XRP Ledger escrow transactions.
-   **`swift-market/`**: Contains the client-facing React application, built with TypeScript and styled with Tailwind CSS. This directory is configured for deployment with Firebase Hosting.

---

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or later)
-   [Firebase CLI](https://firebase.google.com/docs/cli)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install Frontend Dependencies:**
    Navigate to the React app directory and install the necessary packages.
    ```bash
    cd swift-market
    npm install
    ```

3.  **Install Backend Dependencies:**
    Navigate to the Firebase Functions directory and install its dependencies.
    ```bash
    cd ../functions
    npm install
    ```

### Running the Application

1.  **Start the Frontend Development Server:**
    From the `swift-market` directory, run:
    ```bash
    npm start
    ```
    This will open the application on `http://localhost:3000`.

2.  **Run Backend Functions Locally:**
    To test the Firebase Functions locally, use the Firebase Emulators. Ensure you have them set up by running `firebase init emulators`. Then, from the root or `functions` directory, run:
    ```bash
    firebase emulators:start
    ```

---

## 📜 Available Scripts

### Frontend (`swift-market/`)

-   `npm start`: Runs the app in development mode.
-   `npm run build`: Builds the app for production.
-   `npm test`: Runs the test suite.

### Backend (`functions/`)

-   `npm run build`: Transpile TypeScript to JavaScript.
-   `npm run serve`: Run functions locally using Firebase emulators.
-   `npm run shell`: Launch a shell with emulated functions.
-   `npm run deploy`: Deploy functions to your Firebase project.
