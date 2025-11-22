Contributing to PayLite

Welcome! We're excited to have you contribute to the PayLite FinTech platform. This guide explains how to get started, branch properly, write good commits, and open great pull requests.

Getting Started

1. Clone the repo
   git clone https://github.com/<your-org-or-user>/paylite.git
   cd paylite

2. Install dependencies
   cd frontend && npm install
   cd ../backend && npm install

3. Run the app locally
   - Frontend: npm run dev
   - Backend: npm run dev

Branching Strategy

Use the following naming conventions:

Branch Type: Feature
Naming Example: feature/devops-simon

Branch Type: Bugfix
Naming Example: fix/login-error

Branch Type: Refactor
Naming Example: refactor/transaction-api

Branch Type: Docs
Naming Example: docs/setup-update

Always branch off of dev
Never commit directly to main

Commit Message Guidelines (Optional but Recommended)

We follow Conventional Commits to keep history readable.

Examples:
feat(wallet): add support for multiple addresses
fix(auth): resolve token expiration bug
docs(ci): update GitHub Actions section

Code Style

- Frontend: ESLint + Prettier (npm run lint)
- Backend: ESLint (npm run lint)
- Format on save is enabled in .vscode/settings.json (optional but recommended)
- Add or update unit tests where applicable

Pull Request Process

1. Push your feature branch:
   git push origin feature/your-branch-name

2. Open a PR targeting dev

3. Make sure CI passes (you'll see checks for lint, test, build)

4. Request a review from a teammate

5. Once approved, merge into dev

CI/CD Requirements

- All commits should pass GitHub Actions checks:
  - Linting
  - Build/Test
- Failing pipelines block merges to main or dev

Need Help?

Ping the DevOps lead (Simon) or tag teammates in the PR.

Last updated: Phase 1 – Planning & Setup
