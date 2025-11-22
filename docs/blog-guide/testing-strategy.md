PayLite - Testing Strategy

Testing Philosophy

PayLite maintains a 90% minimum code coverage requirement to ensure reliability, especially critical for financial applications where bugs can have serious consequences.

Testing Pyramid

        /\
       /  \      E2E Tests (Few)
      /____\
     /      \    Integration Tests (Some)
    /________\
   /          \  Unit Tests (Many)
  /____________\

Unit Testing

Framework
- Jest 29.7.0: Primary testing framework
- ts-jest: TypeScript support
- jest-mock-extended: Advanced mocking capabilities

What We Test
- Services: Business logic and data transformation
- Utilities: Helper functions and validators
- Models: Data structure validation
- Controllers: Request/response handling

Example Test Structure

describe('AccountService', () => {
  describe('createAccount', () => {
    it('should create account with valid data', async () => {
      // Arrange
      const accountData = { ... };
      
      // Act
      const result = await accountService.createAccount(userId, accountData);
      
      // Assert
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
    
    it('should reject invalid account data', async () => {
      // Test validation
    });
  });
});

Mocking Strategy
- Database Operations: Mock interface implementations
- External Services: Mock Firebase and PostgreSQL calls
- Dependencies: Mock service dependencies

Integration Testing

What We Test
- API Endpoints: Full request/response cycle
- Database Operations: Real database interactions (test DB)
- Service Integration: Multiple services working together

Tools
- Jest: Integration test runner
- Test Database: Separate PostgreSQL instance
- Test Firebase Project: Isolated Firebase environment

Example

describe('POST /api/v1/transfers', () => {
  it('should create transfer between accounts', async () => {
    // Setup test data
    // Make API request
    // Verify database state
    // Cleanup
  });
});

API Testing

Postman

Postman is our primary tool for API endpoint testing, providing comprehensive testing capabilities for all our REST API endpoints.

Collections
- Organized API endpoint tests grouped by feature or resource
- Each collection contains related requests (e.g., Account Management, Transactions, KYC)
- Collections can be shared across the team for consistency
- Version control through Postman's collection format (JSON)

Environment Variables
- Different configurations for dev, staging, and production environments
- Base URLs, API keys, and authentication tokens stored as variables
- Easy switching between environments without changing requests
- Secure storage of sensitive credentials

Automated Tests
- Test scripts written in JavaScript using Postman's test framework
- Assertions validate response status codes, response times, and data structure
- Tests run automatically after each request execution
- Test results displayed in Postman's test results panel

Example Test Script

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Response has required fields", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('id');
    pm.expect(jsonData).to.have.property('accountNumber');
});

Pre-request Scripts
- Automatically set authentication tokens before requests
- Generate dynamic test data
- Set up test prerequisites
- Extract values from previous requests for chaining tests

Test Automation
- Run entire collections via Postman CLI (Newman)
- Integrate with CI/CD pipelines for automated testing
- Generate test reports in various formats (HTML, JSON, JUnit)
- Schedule test runs for continuous monitoring

Documentation
- Auto-generated API documentation from collections
- Request examples and response schemas
- Parameter descriptions and validation rules
- Shareable documentation for team and stakeholders

Test Coverage
- All CRUD operations (Create, Read, Update, Delete)
- Error scenarios (400, 401, 403, 404, 500 status codes)
- Authentication flows (login, token refresh, logout)
- Edge cases (empty payloads, invalid data, boundary conditions)
- Business logic validation (transfer limits, account balances)
- Security testing (unauthorized access, SQL injection attempts)

Coverage Requirements

Minimum Standards
- Overall Coverage: 90%
- Critical Paths: 95%+
  - Financial transactions
  - Account operations
  - Authentication flows
  - KYC processing

Coverage Reports
npm run coverage

Generates reports showing:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

Coverage Exclusions
- Configuration files
- Type definitions
- Test files themselves
- Migration scripts

Test Categories

Unit Tests
- Location: *.test.ts files alongside source
- Speed: Fast (< 100ms per test)
- Isolation: Fully isolated, no external dependencies
- Focus: Individual functions and methods

Integration Tests
- Location: __tests__/integration/
- Speed: Moderate (100ms - 1s per test)
- Dependencies: Test database, mocked external services
- Focus: Component interactions

E2E Tests
- Location: __tests__/e2e/
- Speed: Slow (1s+ per test)
- Dependencies: Full stack running
- Focus: User workflows

Continuous Integration Testing

GitHub Actions
Every pull request triggers:
1. Lint Check: Code style validation
2. Type Check: TypeScript compilation
3. Unit Tests: Fast feedback loop
4. Integration Tests: Comprehensive validation
5. Coverage Check: Ensure 90%+ maintained
6. Postman API Tests: Automated endpoint validation via Newman

Test Execution

# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Check coverage
  run: npm run coverage
  # Fails if coverage < 90%

- name: Run Postman tests
  run: |
    npm install -g newman
    newman run postman-collection.json -e postman-environment.json
  # Runs all Postman collection tests in CI pipeline

Testing Best Practices

1. Arrange-Act-Assert Pattern

it('should do something', () => {
  // Arrange: Set up test data
  const input = { ... };
  
  // Act: Execute the function
  const result = functionUnderTest(input);
  
  // Assert: Verify the result
  expect(result).toBe(expected);
});

2. Descriptive Test Names
- Clear what is being tested
- Include expected behavior
- Example: should return error when account not found

3. Test Isolation
- Each test is independent
- No shared state between tests
- Clean up after each test

4. Test Data Management
- Use factories for test data
- Avoid hardcoded values
- Use realistic test scenarios

5. Mock External Dependencies
- Database calls
- API requests
- File system operations
- Time-dependent functions

Future Testing Enhancements

- E2E testing with Playwright/Cypress
- Visual regression testing
- Performance testing
- Security testing automation
- Load testing for API endpoints
- Mutation testing for quality assurance
