CI/CD Documentation for PayLite

This document outlines the Continuous Integration and Continuous Deployment (CI/CD) setup used in the PayLite FinTech platform.

Tools & Services Used

Tool: GitHub Actions
Purpose: CI/CD automation

Tool: ESLint
Purpose: Code linting (frontend & backend)

Tool: Jest
Purpose: Unit testing (backend)

Tool: Docker
Purpose: Containerization (planned)

Tool: Prettier
Purpose: Code formatting

Workflow Overview

GitHub Actions workflows live in:
.github/workflows/
├── frontend.yml   # CI for Next.js (frontend)
├── backend.yml    # CI for Express.js (backend)
├── devops-check.yml # Basic CI presence check

Each workflow runs on:
- Push to dev or main
- Pull requests into dev or main
- Only if relevant files (frontend/** or backend/**) are changed

What Each Workflow Does

frontend.yml
- Triggers on frontend changes
- Runs:
  - npm ci
  - npm run lint
  - npm run build

backend.yml
- Triggers on backend changes
- Runs:
  - npm ci
  - npm run lint
  - tsc --noEmit
  - npm test

devops-check.yml
- Basic test CI (used to register status check for branch protection)

Branch Strategy

Branch: main
Purpose: Production-ready code
CI Enforced: Yes

Branch: dev
Purpose: Staging branch for PRs
CI Enforced: Yes

Branch: feature/*
Purpose: Developer feature branches
CI Enforced: Optional

CI runs automatically for PRs into main and dev.

Branch Protection Rules (Recommended)

For main and dev, enable:
- Require PRs before merge
- Require status checks (CI) to pass
- Optional: Require review before merge

How to Add a New Workflow

1. Create a new file under .github/workflows/
2. Define your trigger (on: push, pull_request, etc.)
3. Add your jobs and steps
4. Push to a feature branch
5. Open a PR to dev — verify CI runs

Future CI/CD Additions

- Docker build test + lint
- Deploy backend to staging (Elastic Beanstalk or Kubernetes)
- Deploy frontend to Vercel or S3 + CloudFront
- SonarQube for code quality metrics
- Preview URLs per PR (Vercel or Netlify)

Last updated: Phase 1 – Planning & Setup
