# CollegeCompass 🎓

A comprehensive, full-stack College Discovery and Admission Predictor platform. Designed to help students search, compare, and predict admissions for 75+ top Indian colleges including IITs, NITs, IIMs, and premium private institutions.

## 🌟 Key Features

*   **Smart College Search**: Filter through 75+ colleges by state, course type, and fees.
*   **Rank Predictor Engine**: Input your JEE Main, JEE Advanced, CAT, or WBJEE rank to see Safe, Moderate, and Reach chances. Shareable prediction results via custom URLs.
*   **Side-by-Side Comparison**: Compare colleges based on fees, placements, ratings, and NIRF rankings.
*   **Placement Insights**: Interactive charts (Recharts) displaying average and highest package trends over the years.
*   **Real-time Status Monitor**: Built-in Socket.IO keep-alive system to ensure the backend remains awake and responsive during demonstrations.
*   **Wishlist System**: Save and track your favorite colleges easily.

## 🛠️ Tech Stack

**Frontend (Client)**
*   [Next.js 15](https://nextjs.org/) (React Framework)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Recharts](https://recharts.org/) (Data Visualization)
*   [Lucide React](https://lucide.dev/) (Icons)
*   [Socket.IO Client](https://socket.io/)

**Backend (API & Database)**
*   [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
*   [PostgreSQL](https://www.postgresql.org/) (Relational Database)
*   [Prisma ORM](https://www.prisma.io/) (Database Access & Migrations)
*   [Socket.IO](https://socket.io/) (Real-time Keep-Alive Heartbeat)

---

## 🚀 Getting Started (Local Development)

### Prerequisites
*   Node.js (v18 or higher)
*   PostgreSQL running locally or via a managed provider (e.g., Neon, Supabase)

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/neerajsongade25-ops/College-Discovery-Platform.git
cd College-Discovery-Platform

# Install dependencies for both frontend and backend
npm install --workspace=backend
npm install --workspace=frontend
```

### 2. Database Setup
Create a `.env` file in the `backend/` directory (see `backend/.env.example`):
```env
DATABASE_URL="postgresql://username:password@localhost:5432/college_discovery"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Run Prisma migrations and seed the database with the 75+ colleges:
```bash
# Apply schema to database
npm run prisma:migrate --workspace=backend

# Seed the database with colleges, courses, and predictor rules
npm run seed --workspace=backend
```

### 3. Frontend Setup
Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Run the Application
You can run both servers concurrently from the root directory using the provided workspace scripts:

```bash
# Terminal 1: Start Backend
npm run dev:backend

# Terminal 2: Start Frontend
npm run dev:frontend
```
*   Frontend: `http://localhost:3000`
*   Backend API: `http://localhost:5000`

---

## 🌍 Deployment Guide

### Backend (Render)
1. Set the **Root Directory** to `backend`
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`
4. Set Environment Variables (`DATABASE_URL`, `FRONTEND_URL`, `NODE_ENV=production`).
*(Note: The server uses a self-ping mechanism combined with Socket.IO to prevent sleep on the free tier).*

### Frontend (Vercel)
1. Import the repository to Vercel.
2. Set the **Root Directory** to `frontend`.
3. Framework Preset: `Next.js`.
4. Add the `NEXT_PUBLIC_API_URL` environment variable pointing to your deployed Render backend.

## 📄 License
This project is for educational and portfolio demonstration purposes. Placement data and predictor cutoffs are based on approximations of historical trends and should be verified with official sources.
