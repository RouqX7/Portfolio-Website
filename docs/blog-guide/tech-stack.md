PayLite - Technology Stack

Frontend Stack

Core Framework
- Next.js 14.1.3: React framework with App Router
  - Server-side rendering
  - API routes
  - Middleware support
  - Optimized performance

Language & Type Safety
- TypeScript 5.8.3: Type-safe development
- Zod: Runtime schema validation

UI Framework
- Tailwind CSS 3.4.1: Utility-first CSS framework
- Radix UI: Accessible component primitives
  - Dialog, Dropdown, Select, Toast, etc.
- Lucide React: Icon library
- next-themes: Dark/light mode support

State & Data Management
- React Query (TanStack Query): Server state management
- React Context: Global state (authentication)
- React Hook Form: Form state management

Additional Libraries
- Sonner: Toast notifications
- Recharts: Data visualization
- date-fns: Date manipulation

Backend Stack

Runtime & Framework
- Node.js: JavaScript runtime
- Express.js 5.1.0: Web framework
- TypeScript 5.8.3: Type-safe backend development

Databases

PostgreSQL
- pg 8.15.6: PostgreSQL client
- Purpose: Financial data storage
  - Accounts and balances
  - Transactions
  - KYC records
  - Cards

Firebase
- firebase-admin 13.3.0: Server-side Firebase SDK
- firebase 11.7.0: Client SDK
- Purpose: User management
  - Authentication
  - User profiles
  - Session management

Validation & Schema
- Joi 17.13.3: Schema validation
- TypeScript: Compile-time type checking

Security
- bcrypt 6.0.0: Password hashing
- CORS: Cross-origin resource sharing
- Firebase Auth: Authentication service

Utilities
- uuid 11.1.0: Unique identifier generation
- dotenv: Environment variable management
- env-cmd: Environment-specific configurations

Development Tools

Testing
- Jest 29.7.0: Testing framework
- ts-jest: TypeScript support for Jest
- jest-mock-extended: Advanced mocking
- Postman: API testing and documentation

Code Quality
- ESLint: Linting
- TypeScript Compiler: Type checking
- Prettier: Code formatting (via ESLint)

Development Experience
- nodemon: Auto-restart on file changes
- ts-node: TypeScript execution
- tsconfig-paths: Path aliases

DevOps & CI/CD

Version Control
- Git: Source control
- GitHub: Repository hosting

Continuous Integration
- GitHub Actions: CI/CD pipelines
  - Automated linting
  - Automated testing
  - Build verification
  - Branch protection

Containerization
- Docker: Containerization (WIP)
- docker-compose: Multi-container orchestration

Project Management
- Trello: Task management
- Notion: Documentation and planning

Architecture Decisions

Why TypeScript?
- Type safety reduces runtime errors
- Better IDE support and autocomplete
- Easier refactoring
- Self-documenting code

Why Next.js?
- Server-side rendering for SEO
- Built-in API routes
- Middleware for route protection
- Optimized performance out of the box

Why Hybrid Database?
- PostgreSQL: ACID compliance for financial data
- Firebase: Real-time capabilities and easy authentication
- Best of both worlds approach

Why Interface-Based Design?
- Future-proofing: Easy to swap implementations
- Testability: Easy to mock dependencies
- Maintainability: Clear contracts between layers
