PayLite Setup Guide

Welcome to the PayLite FinTech P2P platform! This guide walks you through setting up the project on your local machine for development.

Repository Structure

paylite/
├── frontend/        # Next.js + Tailwind (UI)
├── backend/         # Express + TypeScript (API)
├── docs/            # Project documentation
├── .github/         # GitHub Actions workflows
├── docker-compose.yml  # Multi-service orchestration

Prerequisites

Ensure you have the following installed:

- Node.js (v18 recommended)
- npm (comes with Node.js)
- Docker (for containerized development)
- VS Code with:
  - Prettier
  - ESLint
  - YAML by Red Hat

Getting Started (Without Docker)

1. Clone the Repository

git clone https://github.com/<your-org-or-user>/paylite.git
cd paylite

2. Setup the Frontend (Local)

cd frontend
npm install
npm run dev --turbo

- Runs the Next.js app on http://localhost:3000
- Uses Tailwind CSS and TypeScript

3. Setup the Backend (Local)

cd backend
npm install
npm run dev

- Runs the Express API server on http://localhost:5000
- Uses TypeScript and dotenv for config

4. Environment Variables

For local development:

cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

For Docker:

- Backend uses backend/.env.docker automatically.
- Frontend Docker .env setup coming soon.

Fill in required values like API URLs, Firebase config, etc.

Docker Setup (Recommended)

1. Build & Run Backend Container

cd backend
docker build -t paylite-backend .
docker run --env-file .env.docker -p 5000:5000 paylite-backend

2. Docker Compose (Once Ready)

docker-compose up --build

This will spin up frontend, backend, and database services together.

Run Linters

# Frontend
cd frontend
npm run lint

# Backend
cd backend
npm run lint

Troubleshooting

- Ensure ports 3000 and 5000 are free
- Verify .env or .env.docker variables
- Clear node_modules and reinstall if issues occur
- For Docker, use docker logs <container_id> to debug

Last updated: Phase 2 — Core Auth & Wallet MVP
