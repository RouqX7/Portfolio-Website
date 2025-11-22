PayLite - Architecture Documentation

Architecture Philosophy

PayLite was designed with future-proofing and maintainability as core principles. The architecture emphasizes modularity, allowing the system to evolve and adapt to changing requirements without major refactoring.

Hybrid Database Strategy

Why Hybrid?

After initial development with Firebase, we identified that financial data (accounts, transactions, balances) required the ACID guarantees and relational capabilities of PostgreSQL. However, Firebase excelled for user profiles and authentication.

Implementation

PostgreSQL: Stores all financial data
- Accounts and balances
- Transactions and transfers
- KYC records
- Cards

Firebase: Handles user management
- User profiles and authentication
- User preferences
- Session management

Linking Strategy: Accounts reference Firebase user IDs via user_id foreign key, maintaining context while leveraging the best of both databases.

MVC Architecture Pattern

Model Layer
- Purpose: Define data structures and business logic
- Location: backend/models/
- Examples: Account, Transaction, KYCInfo, User

Service Layer
- Purpose: Business logic and database abstraction
- Location: backend/services/
- Key Feature: Database-agnostic methods that work through interfaces
- Examples: accountService, transactionService, kycService

Controller Layer
- Purpose: Handle HTTP requests and responses
- Location: backend/controllers/
- Responsibilities: Request validation, service orchestration, error handling

Route Layer
- Purpose: Define API endpoints
- Location: backend/routes/v1/
- Structure: RESTful API design with versioning

Interface-Based Design

The Problem We Solved

Initially built on Firebase, we needed to migrate financial operations to PostgreSQL without rewriting the entire codebase.

The Solution

Created interfaces (IAccount, ITransactions, IKYC, etc.) that abstract database operations. These interfaces define contracts for database operations without being tied to a specific implementation.

Benefits

1. Database Agnostic: Services work with interfaces, not implementations
2. Easy Migration: Swapped Firebase implementation for PostgreSQL without changing service layer
3. Testing: Easy to mock interfaces for unit testing
4. Future Flexibility: Can add MongoDB, DynamoDB, or any database by implementing the interface

Implementation Pattern

Service Layer (Business Logic)
    ↓
Interface (Contract)
    ↓
Database Implementation (PostgreSQL/Firebase)

Data Flow Example: Money Transfer

1. Frontend → Sends transfer request to /api/v1/transfers
2. Route → Routes to transactionsController.createTransfer
3. Controller → Validates request, transforms data format
4. Service → Calls transactionService.createTransfer
5. Service → Uses DataProvider.transactionsDB (interface)
6. Database → PostgreSQL implementation executes transaction
7. Response → Returns success/error through layers

Frontend Architecture

Next.js App Router
- Server-side rendering for performance
- API routes for server-side operations
- Middleware for route protection and KYC checks

Component Structure
- Pages: Route-level components (app/dashboard/)
- Components: Reusable UI components (components/)
- Context: Global state management (context/AuthContext.tsx)
- Hooks: Custom React hooks for data fetching

State Management
- React Context for authentication
- React Query for server state
- Local state for UI interactions

Security Architecture

Authentication Flow
1. User logs in via Firebase Auth
2. JWT token stored in cookies
3. Middleware validates token on protected routes
4. User context loaded from Firebase profile

Route Protection
- Middleware checks authentication status
- KYC status validation for financial operations
- Role-based access control (admin/user)

Data Validation
- Joi schemas for request validation
- TypeScript for compile-time type safety
- Runtime validation in controllers
