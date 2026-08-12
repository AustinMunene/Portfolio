import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 8,
    title: "How to Bag That QA Automation Dream Job: Cypress Edition",
    excerpt: "Cypress interview prep: project structure, best practices, common questions, CI/CD setup, and how to explain your test architecture clearly.",
    date: "May 20, 2025",
    readTime: "20 min read",
    category: "QA & Testing",
    imageUrl: "/automation.JPG",
    content: `
<p>If Cypress is on the job description, expect questions about architecture, selectors, API mocking, and how you keep suites maintainable. This post covers the topics that come up most often in QA automation interviews, with examples you can adapt to your own projects.</p>

<h2>Why Cypress?</h2>
<p>When someone asks why you chose Cypress, go beyond "it's popular." Tie your answer to how the tool fits your stack:</p>
<ul>
  <li><strong>Runs inside the browser.</strong> Unlike Selenium's out-of-process model, Cypress executes in the same run loop as your app, which often means faster feedback and fewer timing issues.</li>
  <li><strong>Live debugging.</strong> The Test Runner lets you watch tests execute and inspect DOM state at each step.</li>
  <li><strong>Automatic waiting.</strong> Cypress retries commands until assertions pass. Avoid fixed sleeps like <code>cy.wait(3000)</code> unless you're waiting on something external.</li>
  <li><strong>Command log.</strong> Each step is recorded so you can see what the page looked like when a test failed.</li>
  <li><strong>JavaScript-first.</strong> If the app is JS/TS, tests use the same language and tooling.</li>
  <li><strong>Strong local DX.</strong> The interactive runner is one of the main reasons teams adopt it for web E2E work.</li>
</ul>

<h2>Core Best Practices</h2>
<p>Interviewers often probe whether you've run suites in production, not just followed a tutorial. These habits matter:</p>
<ul>
  <li><strong>Keep tests independent.</strong> Tests must not rely on state from other tests. Reset state between test cases using <code>beforeEach()</code>. A test that only passes when run after another test is a ticking time bomb.</li>
  <li><strong>Use <code>data-cy</code> attributes for selectors.</strong> Never rely on CSS classes, IDs, or text content that designers and devs can change freely. <code>data-cy</code> attributes are test-only contracts.</li>
  <li><strong>Never use arbitrary waits.</strong> <code>cy.wait(3000)</code> is not a solution. It's a symptom. Use assertions and let Cypress's retry-ability do its job.</li>
  <li><strong>Abstract repeated actions into custom commands.</strong> Login, navigation, form filling - anything you do in more than two tests belongs in <code>commands.js</code>.</li>
  <li><strong>Keep your test files focused.</strong> Group related tests into folders by feature, not by type. A test file that tests login should only test login.</li>
  <li><strong>Test at the right layer.</strong> Don't E2E everything. Unit tests for logic, integration tests for components, E2E for critical user journeys only.</li>
</ul>

<h2>Project Structure</h2>
<p>A clear folder layout makes suites easier to onboard to and maintain. A structure that works well for many teams:</p>

<pre><code class="language-bash">
project-root/
├── cypress/
│   ├── e2e/                         # All test files live here
│   │   ├── auth/
│   │   │   ├── login.cy.js
│   │   │   └── logout.cy.js
│   │   ├── dashboard/
│   │   │   ├── overview.cy.js
│   │   │   └── analytics.cy.js
│   │   └── smoke/                   # Smoke test suite (critical paths only)
│   │       └── smoke.cy.js
│   │
│   ├── fixtures/                    # Static test data (JSON)
│   │   ├── users.json
│   │   └── products.json
│   │
│   ├── pages/                       # Page Object Models
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   └── BasePage.js              # Shared methods all pages inherit
│   │
│   ├── support/
│   │   ├── commands.js              # Custom Cypress commands
│   │   ├── e2e.js                   # Global hooks (beforeEach, afterEach)
│   │   └── selectors.js             # Centralised data-cy selector map
│   │
│   └── reports/                     # Generated test reports (gitignored)
│
├── cypress.config.js                # Main Cypress configuration
├── .env                             # Environment variables (gitignored)
└── package.json
</code></pre>

<p>Call out three things: <strong>separate smoke tests</strong> from full regression, <strong>Page Objects</strong> in their own folder, and a <strong>central selectors file</strong> so you never have magic strings scattered across test files.</p>

<h2>cypress.config.js</h2>
<p>Interviewers often ask what goes in the config. Here's a production-ready example:</p>

<pre><code class="language-js">
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://staging.myapp.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 8000,     // ms before cy.get() times out
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,                     // record video of test runs
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,                    // retry failing tests in CI (cypress run)
      openMode: 0,                   // no retries in interactive mode
    },
    env: {
      apiUrl: 'https://api.staging.myapp.com',
    },
    setupNodeEvents(on, config) {
      // Plugin hooks go here (e.g. code coverage, custom tasks)
      return config;
    },
  },
});
</code></pre>

<p>The <code>retries</code> config is worth calling out specifically - it shows you think about CI stability without papering over real bugs.</p>

<h2>Page Object Model (POM)</h2>
<p>POM separates <em>what you're testing</em> (the spec) from <em>how you interact with the UI</em> (the page object). When markup changes, you update selectors in one place instead of across every test file.</p>

<pre><code class="language-js">
// cypress/pages/LoginPage.js
class LoginPage {
  get emailInput()    { return cy.get('[data-cy=email-input]'); }
  get passwordInput() { return cy.get('[data-cy=password-input]'); }
  get submitButton()  { return cy.get('[data-cy=submit-btn]'); }
  get errorMessage()  { return cy.get('[data-cy=error-message]'); }

  visit() { cy.visit('/login'); }

  login(email, password) {
    this.emailInput.type(email);
    this.passwordInput.type(password);
    this.submitButton.click();
  }

  assertError(message) {
    this.errorMessage.should('be.visible').and('contain', message);
  }
}

export default new LoginPage();
</code></pre>

<pre><code class="language-js">
// cypress/e2e/auth/login.cy.js
import LoginPage from '../../pages/LoginPage';

describe('Login', () => {
  beforeEach(() => LoginPage.visit());

  it('logs in with valid credentials', () => {
    LoginPage.login('user@test.com', 'Password123');
    cy.url().should('include', '/dashboard');
  });

  it('shows error with invalid password', () => {
    LoginPage.login('user@test.com', 'wrongpassword');
    LoginPage.assertError('Invalid credentials');
  });
});
</code></pre>

<p>Specs stay short; page objects hold the selector and interaction details.</p>

<h2>Common Interview Questions</h2>

<h3>1. "How do you handle dynamic elements or flaky tests?"</h3>
<p>Don't say waits. Say <strong>assertions and retry-ability</strong>. Cypress retries automatically until the assertion passes or times out. You can also extend the timeout for specific elements:</p>
<pre><code class="language-js">
cy.get('[data-cy=submit-btn]', { timeout: 10000 }).should('be.visible').click();
</code></pre>

<h3>2. "How do you select elements?"</h3>
<p>Always use <code>data-cy</code> attributes. This makes your tests immune to CSS class changes. Never rely on auto-generated class names - that's how you end up debugging at 2am wondering why CI broke.</p>
<pre><code class="language-js">
// ❌ Fragile
cy.get('.btn-primary-v2-final')

// ✅ Stable
cy.get('[data-cy=login-button]')
</code></pre>

<h3>3. "How do you avoid repeating login in every test?"</h3>
<p>Two answers, both worth knowing:</p>
<p><strong>Option A - Custom command (UI login):</strong></p>
<pre><code class="language-js">
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('[data-cy=email]').type(email);
  cy.get('[data-cy=password]').type(password);
  cy.get('[data-cy=submit]').click();
});
</code></pre>
<p><strong>Option B - API login (faster, preferred):</strong> Hit the auth API directly to set the token, skipping the UI entirely. Dramatically speeds up test suites.</p>
<pre><code class="language-js">
Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password },
  }).then((response) => {
    window.localStorage.setItem('authToken', response.body.token);
  });
});
</code></pre>
<p><strong>Option C - cy.session() (best for suites):</strong> Cypress caches and restores the browser session between tests so you only authenticate once per suite:</p>
<pre><code class="language-js">
beforeEach(() => {
  cy.session('user-session', () => {
    cy.loginViaApi('user@test.com', 'pass123');
  });
});
</code></pre>

<h3>4. "How do you handle API calls in tests?"</h3>
<p>Cypress can intercept and stub network requests using <code>cy.intercept()</code>. Know it deeply - it's one of Cypress's most powerful features:</p>
<pre><code class="language-js">
// Stub a GET request with fixture data
cy.intercept('GET', '/api/users', { fixture: 'users.json' }).as('getUsers');

// Stub with inline data
cy.intercept('POST', '/api/orders', {
  statusCode: 201,
  body: { id: 'order-123', status: 'confirmed' }
}).as('createOrder');

// Spy on a real request without stubbing
cy.intercept('GET', '/api/analytics/**').as('analytics');

// Wait for a request to complete before asserting
cy.visit('/dashboard');
cy.wait('@getUsers');
cy.get('[data-cy=user-list]').should('have.length', 3);

// Assert on the request itself
cy.wait('@createOrder').its('request.body').should('include', { productId: 'p-1' });

// Simulate API failure
cy.intercept('GET', '/api/data', { statusCode: 500, body: 'Server Error' }).as('failedRequest');
</code></pre>

<h3>5. "What's the difference between cy.get() and cy.find()?"</h3>
<p><code>cy.get()</code> queries from the root of the document. <code>cy.find()</code> queries within a previously yielded subject. Use <code>find()</code> to scope searches inside a component:</p>
<pre><code class="language-js">
cy.get('[data-cy=user-card]').find('[data-cy=user-name]').should('contain', 'Austin');
</code></pre>

<h3>6. "What are aliases and why use them?"</h3>
<pre><code class="language-js">
// Alias a DOM element to avoid re-querying
cy.get('[data-cy=submit-btn]').as('submitBtn');
cy.get('@submitBtn').should('be.disabled');
cy.get('@submitBtn').click();

// Alias a request
cy.intercept('GET', '/api/users').as('users');
cy.wait('@users').its('response.statusCode').should('eq', 200);
</code></pre>

<h3>7. "How do you manage test data?"</h3>
<p>Use <strong>fixtures</strong> for static data and <strong>API seeding</strong> for dynamic data. Avoid depending on live production data - your tests should be deterministic. If data can change under your tests, your tests will be flaky.</p>

<h3>8. "How do you test file uploads?"</h3>
<pre><code class="language-js">
// Using cypress-file-upload plugin
cy.get('[data-cy=upload-input]').attachFile('test-document.pdf');
</code></pre>

<h3>9. "How do you test across multiple viewports?"</h3>
<pre><code class="language-js">
const viewports = [
  { device: 'mobile', width: 375, height: 812 },
  { device: 'tablet', width: 768, height: 1024 },
  { device: 'desktop', width: 1440, height: 900 },
];

viewports.forEach(({ device, width, height }) => {
  it(\`renders correctly on \${device}\`, () => {
    cy.viewport(width, height);
    cy.visit('/');
    cy.get('[data-cy=nav-menu]').should('be.visible');
  });
});
</code></pre>

<h2>Smoke Testing vs Regression Testing</h2>
<p>This comes up constantly. Know the distinction cold:</p>

<ul>
  <li><strong>Smoke Tests:</strong> A small, fast subset that verifies the application is fundamentally working - did the build deploy? Can users log in? Does the homepage load? Run after every deployment. Should complete in under 5 minutes. If smoke fails, skip the full suite.</li>
  <li><strong>Regression Tests:</strong> The full suite - every test, every feature, every edge case. Run on a schedule (nightly or pre-release) to catch anything that's broken since last release. Can take 30–60+ minutes.</li>
  <li><strong>Sanity Tests:</strong> A targeted subset run after a specific bug fix to verify that fix works without running everything.</li>
</ul>

<pre><code class="language-js">
// cypress/e2e/smoke/smoke.cy.js
describe('[SMOKE] Core User Journeys', () => {
  it('homepage loads', () => {
    cy.visit('/');
    cy.get('[data-cy=hero-section]').should('be.visible');
  });

  it('user can log in', () => {
    cy.login('smoke@test.com', 'SmokePass123');
    cy.url().should('include', '/dashboard');
  });

  it('key API endpoint responds', () => {
    cy.request('GET', '/api/health').its('status').should('eq', 200);
  });
});
</code></pre>

<h2>Headless Mode vs Interactive Mode</h2>
<ul>
  <li><strong>Interactive mode (<code>cypress open</code>):</strong> Opens the Cypress Test Runner UI. Watch tests run in real time, use the time-travel debugger, click on commands to inspect state. For local development and debugging.</li>
  <li><strong>Headless mode (<code>cypress run</code>):</strong> Runs tests in a browser with no visible UI. Faster, less memory, results to the terminal. This is what CI/CD pipelines use.</li>
</ul>

<pre><code class="language-bash">
# Interactive - local dev/debug
npx cypress open

# Headless - CI or quick local run
npx cypress run

# Headless, specific browser
npx cypress run --browser chrome

# Run only smoke suite
npx cypress run --spec "cypress/e2e/smoke/**/*.cy.js"
</code></pre>

<h2>Environment Variables and Multi-Environment Testing</h2>
<p>The same suite should run against dev, staging, or production by changing config, not by editing tests:</p>

<pre><code class="language-bash">
# Override base URL for staging
CYPRESS_BASE_URL=https://staging.myapp.com npx cypress run

# Pass multiple env vars
npx cypress run --env baseUrl=https://staging.myapp.com,apiKey=abc123
</code></pre>

<pre><code class="language-js">
// Access env vars in tests
cy.visit(Cypress.env('baseUrl') || '/');
cy.request({
  url: \`\${Cypress.env('apiUrl')}/users\`,
  headers: { Authorization: \`Bearer \${Cypress.env('apiKey')}\` }
});
</code></pre>

<h2>Test Reporting</h2>
<p>Raw terminal output isn't enough for teams. Add proper reporting so results are visible without digging through logs:</p>

<pre><code class="language-bash">
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
</code></pre>

<pre><code class="language-js">
// cypress.config.js
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
},
</code></pre>

<p>In CI, merge reports and publish them as build artifacts. Every stakeholder can see results with a click.</p>

<h2>CI/CD Integration</h2>
<pre><code class="language-yaml">
# .github/workflows/cypress.yml
name: Cypress E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Smoke Tests
        uses: cypress-io/github-action@v6
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
          spec: 'cypress/e2e/smoke/**/*.cy.js'
        env:
          CYPRESS_BASE_URL: \$\{{ secrets.STAGING_URL }}

      - name: Upload screenshots on failure
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots

      - name: Upload videos
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: cypress-videos
          path: cypress/videos
</code></pre>

<h2>Topics Worth Mentioning</h2>
<ul>
  <li>Knowing <strong>cy.session()</strong> for caching authentication state across tests</li>
  <li>Mentioning <strong>cypress-axe</strong> for accessibility testing as part of your automation strategy</li>
  <li>Knowing the difference between <code>cy.intercept()</code> and the deprecated <code>cy.route()</code></li>
  <li>Understanding Cypress's <strong>async nature</strong> - commands are queued, not executed immediately; Cypress builds a command chain and executes it</li>
  <li>Having opinions on <strong>when NOT to use Cypress</strong> - it doesn't support multi-tab testing or multi-browser-context scenarios (Playwright handles those better)</li>
  <li>Mentioning <strong>Cypress Component Testing</strong> - Cypress can test React/Vue/Angular components in isolation without a full browser stack</li>
  <li>Understanding <strong>loginViaApi vs UI login</strong> - hitting the API directly for auth is faster and doesn't create test dependency on the login UI</li>
  <li>Discussing a <strong>central selectors file</strong> - keeping all <code>data-cy</code> values in one place means one change when a selector needs to update</li>
</ul>

<h2>Before the Interview</h2>
<p>Interviewers care less about memorizing the docs and more about how you reason about risk: what you'd test first, how you'd reduce flakiness, and how you'd structure a suite for a team. Asking clarifying questions about the product and calling out edge cases is as important as naming Cypress APIs.</p>

<h2>Conclusion</h2>
<p>Be ready to walk through project layout, stable selectors, <code>cy.intercept()</code>, custom commands, and the difference between smoke and regression runs. If you can explain those in the context of a real app you've tested, you'll be in good shape.</p>
    `
  },
  {
    id: 10,
    title: "Playwright: The Power Tool Every Modern QA Engineer Needs (+ How It Stacks Up Against Cypress)",
    excerpt: "How Playwright works, how to structure a project, and when to choose it over Cypress — with code examples and a side-by-side comparison.",
    date: "May 20, 2025",
    readTime: "12 min read",
    category: "QA & Testing",
    imageUrl: "/playwright.jpg",
    content: `
<p>Playwright handles multi-tab flows, cross-browser runs, and parallel workers more naturally than Cypress in many setups. Microsoft maintains it, and it shows up regularly in QA job postings alongside Cypress.</p>

<p>Below: how to structure a Playwright project, patterns that come up in interviews, and a practical comparison so you can pick the right tool for the job.</p>

<h2>What Makes Playwright Different?</h2>
<p>Playwright was built from the ground up to support the modern web. Its architecture is fundamentally different from Cypress:</p>
<ul>
  <li><strong>Multi-browser natively:</strong> Chromium, Firefox, and WebKit (Safari) - all supported, all maintained by the Playwright team. Real cross-browser coverage, not an afterthought.</li>
  <li><strong>Out-of-process architecture:</strong> Playwright controls the browser via the Chrome DevTools Protocol (CDP) from outside the browser process. This means it can handle multiple tabs, multiple browser contexts, and even multiple browsers in one test.</li>
  <li><strong>Auto-waiting built in:</strong> Like Cypress, Playwright auto-waits - but with a more granular actionability model. Before clicking, it checks: is the element visible? Is it enabled? Is it stable (not animating)? Is it in the viewport?</li>
  <li><strong>True parallelism:</strong> Tests run in parallel by default across multiple workers. No extra config required.</li>
  <li><strong>Multi-language:</strong> JavaScript/TypeScript, Python, Java, C#. One framework, your team's preferred language.</li>
</ul>

<h2>Project Structure</h2>
<pre><code class="language-bash">
project-root/
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts
│   │   └── logout.spec.ts
│   ├── dashboard/
│   │   └── overview.spec.ts
│   └── smoke/
│       └── smoke.spec.ts
│
├── pages/                           # Page Object Models
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   └── DashboardPage.ts
│
├── fixtures/                        # Test data
│   └── users.json
│
├── helpers/                         # Utility functions
│   └── auth.helper.ts
│
├── playwright.config.ts             # Main config
├── .env                             # Environment variables
└── package.json
</code></pre>

<h2>playwright.config.ts</h2>
<pre><code class="language-ts">
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,               // run tests in parallel
  forbidOnly: !!process.env.CI,      // fail CI if test.only is committed
  retries: process.env.CI ? 2 : 0,  // retry on CI only
  workers: process.env.CI ? 4 : 2,  // parallel workers
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'results.xml' }],  // for CI integration
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',         // capture trace on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],
});
</code></pre>

<p>The <code>projects</code> array lets you run the same tests across Chromium, Firefox, WebKit, and mobile profiles from one config. Cypress supports multiple browsers, but Playwright's cross-browser matrix is a core part of the design.</p>

<h2>Page Object Model in Playwright</h2>
<pre><code class="language-ts">
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput    = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton  = page.getByTestId('submit-btn');
    this.errorMessage  = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async assertError(message: string) {
    await this.errorMessage.waitFor({ state: 'visible' });
    await this.errorMessage.isVisible();
  }
}
</code></pre>

<pre><code class="language-ts">
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await loginPage.login('user@test.com', 'Password123');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('shows error with invalid credentials', async () => {
    await loginPage.login('user@test.com', 'wrong');
    await loginPage.assertError('Invalid credentials');
  });
});
</code></pre>

<h2>Playwright-Only Features</h2>

<h3>1. Multi-Tab Testing</h3>
<pre><code class="language-ts">
test('link opens in new tab', async ({ browser }) => {
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto('/');

  // Wait for new page to open
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page1.click('[data-testid=external-link]'),
  ]);

  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('expected-url');
});
</code></pre>

<h3>2. Multiple Browser Contexts (Simulate Two Users)</h3>
<pre><code class="language-ts">
test('admin and user see different dashboards', async ({ browser }) => {
  const adminContext = await browser.newContext({ storageState: 'admin-auth.json' });
  const userContext  = await browser.newContext({ storageState: 'user-auth.json' });

  const adminPage = await adminContext.newPage();
  const userPage  = await userContext.newPage();

  await adminPage.goto('/dashboard');
  await userPage.goto('/dashboard');

  await expect(adminPage.getByTestId('admin-panel')).toBeVisible();
  await expect(userPage.getByTestId('admin-panel')).not.toBeVisible();
});
</code></pre>

<h3>3. API Authentication (Store & Reuse State)</h3>
<pre><code class="language-ts">
// global-setup.ts - runs once before all tests
import { chromium } from '@playwright/test';

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('/login');
  await page.fill('[data-testid=email]', 'user@test.com');
  await page.fill('[data-testid=password]', 'pass123');
  await page.click('[data-testid=submit]');

  // Save auth state to file - reused by all tests
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}
</code></pre>

<pre><code class="language-ts">
// playwright.config.ts
globalSetup: './global-setup.ts',
use: {
  storageState: 'auth.json',   // all tests start authenticated
}
</code></pre>

<h3>4. Network Interception</h3>
<pre><code class="language-ts">
// Mock an API response
await page.route('/api/users', route => {
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Austin' }]),
  });
});

// Abort a request (simulate network failure)
await page.route('/api/analytics', route => route.abort());

// Modify a response
await page.route('/api/config', async route => {
  const response = await route.fetch();
  const body = await response.json();
  body.featureFlag = true;
  route.fulfill({ response, body: JSON.stringify(body) });
});
</code></pre>

<h2>Trace Viewer</h2>
<p>When a test fails in CI, Playwright can capture a trace — a recording of actions, network requests, console output, and DOM snapshots. Open it with:</p>
<pre><code class="language-bash">
npx playwright show-trace trace.zip
</code></pre>
<p>Useful for debugging failures you can't reproduce locally. Video recordings help too, but traces give you step-by-step context.</p>

<h2>Cypress vs Playwright</h2>

<table>
  <thead>
    <tr><th>Feature</th><th>Cypress</th><th>Playwright</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Browser support</strong></td><td>Chrome, Edge, Firefox (limited)</td><td>Chromium, Firefox, WebKit - all first-class</td></tr>
    <tr><td><strong>Multi-tab testing</strong></td><td>Not supported</td><td>Native support</td></tr>
    <tr><td><strong>Multiple browser contexts</strong></td><td>One context per test</td><td>Multiple contexts in one test</td></tr>
    <tr><td><strong>Parallelism</strong></td><td>Paid (Cypress Cloud) or complex setup</td><td>Built-in, free</td></tr>
    <tr><td><strong>Language support</strong></td><td>JavaScript/TypeScript only</td><td>JS/TS, Python, Java, C#</td></tr>
    <tr><td><strong>Developer Experience</strong></td><td>Best-in-class UI</td><td>Great but more code-first</td></tr>
    <tr><td><strong>Debugging</strong></td><td>Time-travel in Test Runner</td><td>Trace Viewer (excellent for CI failures)</td></tr>
    <tr><td><strong>Auto-waiting</strong></td><td>Excellent</td><td>Excellent + actionability checks</td></tr>
    <tr><td><strong>Mobile testing</strong></td><td>Viewport emulation only</td><td>Device emulation + WebKit (real Safari engine)</td></tr>
    <tr><td><strong>Network mocking</strong></td><td>cy.intercept() - excellent</td><td>page.route() - equally excellent</td></tr>
    <tr><td><strong>CI speed</strong></td><td>Slower (single-threaded by default)</td><td>Faster (parallel workers by default)</td></tr>
    <tr><td><strong>Learning curve</strong></td><td>Gentle - great docs, great UI</td><td>Steeper - more concepts upfront</td></tr>
    <tr><td><strong>Community</strong></td><td>Larger, more Stack Overflow answers</td><td>Growing fast, Microsoft-backed</td></tr>
    <tr><td><strong>Best for</strong></td><td>Web apps, teams new to automation</td><td>Complex apps, cross-browser, enterprise scale</td></tr>
  </tbody>
</table>

<h2>Which Should You Use?</h2>
<p>Many teams use both, for different jobs:</p>
<ul>
  <li><strong>Cypress</strong> fits well when the team is JavaScript-first and wants a polished local debugging experience for core web flows.</li>
  <li><strong>Playwright</strong> fits when you need Safari/WebKit coverage, multi-tab or multi-user scenarios, or parallel runs without extra infrastructure.</li>
  <li>Starting fresh with a Safari requirement? Playwright is often the simpler path. Onboarding a team new to automation? Cypress's runner can be easier to learn.</li>
</ul>

<h2>Conclusion</h2>
<p>Playwright and Cypress solve overlapping but not identical problems. Knowing both — and being able to explain the tradeoffs for a given product — is more useful than treating either as a universal default.</p>
  `
  },
  {
    id: 11,
    title: "AI in Software Testing: What's Already Here, What's Coming, and How to Stay Ahead",
    excerpt: "What AI tools are already doing in QA, workflows you can use today, and skills that still require a human tester.",
    date: "May 20, 2025",
    readTime: "11 min read",
    category: "AI",
    imageUrl: "/AIBasedTesting.jpeg",
    content: `
<p>AI is already involved in how test cases get written, how failures get triaged, and how brittle selectors get maintained. The useful question is not whether it will change QA, but where it saves time today and where it still needs a human review.</p>

<p>This post covers tools and workflows that are working now, not speculative predictions.</p>

<h2>What AI Is Doing in Testing Today</h2>

<h3>1. AI-Assisted Test Generation</h3>
<p>The most immediate impact. Tools like GitHub Copilot, Cursor, and Claude can generate test cases, fixtures, and page objects from a description or from reading your existing code:</p>

<pre><code class="language-ts">
// Prompt: "Write Cypress tests for a login form with email, 
// password, submit button, and error handling"

// AI generates:
describe('Login Form', () => {
  beforeEach(() => cy.visit('/login'));

  it('successfully logs in with valid credentials', () => {
    cy.get('[data-cy=email]').type('user@example.com');
    cy.get('[data-cy=password]').type('ValidPass123');
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
  });

  it('shows validation error for empty fields', () => {
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=error]').should('contain', 'required');
  });

  it('shows error for invalid credentials', () => {
    cy.get('[data-cy=email]').type('wrong@example.com');
    cy.get('[data-cy=password]').type('wrongpass');
    cy.get('[data-cy=submit]').click();
    cy.get('[data-cy=error]').should('be.visible');
  });
});
</code></pre>

<p>AI is good at scaffolding — generating boilerplate specs, fixtures, or page objects from a prompt or existing code. You still decide what to test and whether the generated cases match real user risk.</p>

<h3>2. Self-Healing Tests</h3>
<p>One of the biggest time sinks in test automation is maintaining selectors. A developer renames a class or restructures the DOM, and suddenly 30 tests fail - not because the feature is broken, but because your selectors are stale.</p>

<p>Tools like Testim, Mabl, and Healenium attempt to recover when selectors break by matching elements on context and attributes. That can cut maintenance time after UI refactors, though you should still review what changed.</p>

<h3>3. Visual Testing with AI</h3>
<p>Traditional visual testing tools (screenshot diffing) are brittle - they fail on any pixel change, including intentional ones like font rendering or anti-aliasing differences across environments.</p>

<p>AI-powered visual testing (Applitools Eyes, Percy) uses neural networks to distinguish between meaningful visual regressions and irrelevant pixel noise. It understands layout, spacing, and content at a semantic level - not just a pixel level.</p>

<pre><code class="language-js">
// Applitools integration with Cypress
import '@applitools/eyes-cypress/commands';

describe('Visual regression', () => {
  it('dashboard looks correct', () => {
    cy.visit('/dashboard');
    cy.eyesOpen({ appName: 'MyApp', testName: 'Dashboard' });
    cy.eyesCheckWindow('Dashboard Main View');
    cy.eyesClose();
  });
});
</code></pre>

<h3>4. AI-Powered Test Analysis and Failure Triage</h3>
<p>When your CI pipeline fails with 47 test failures, figuring out the root cause manually is painful. AI tools are beginning to cluster failures, identify shared root causes, and distinguish between a flaky test and a real regression - automatically.</p>

<p>Tools like <strong>Sentry</strong>, <strong>Datadog</strong>, and <strong>BuildPulse</strong> use ML to detect flaky tests, group related failures, and surface the most likely root cause. Instead of reading 200 lines of stack traces, you get: "3 tests are failing due to a timeout on the /api/checkout endpoint."</p>

<h3>5. AI Test Coverage Analysis</h3>
<p>AI tools can analyse your codebase, map it against your existing test suite, and identify untested code paths, high-risk areas, and coverage gaps - much more intelligently than traditional coverage percentage metrics.</p>

<h2>Practical AI Workflows for QA Engineers Right Now</h2>

<h3>Workflow 1: Use AI to Generate Test Cases from User Stories</h3>
<pre><code class="language-markdown">
Prompt to Claude/ChatGPT:
"Given this user story: 'As a user, I want to reset my password via email 
so that I can regain access to my account if I forget my password.'
Generate a comprehensive list of test cases covering happy path, 
edge cases, and error states. Format as Gherkin scenarios."

AI output:
Scenario: Successful password reset
  Given I am on the login page
  When I click "Forgot Password"
  And I enter my registered email address
  Then I should receive a password reset email
  And the email should contain a valid reset link

Scenario: Reset link expires after 24 hours
  Given I received a password reset email
  When I click the reset link after 24 hours
  Then I should see "This link has expired"
  And I should be prompted to request a new link

Scenario: Invalid email address format
  Given I am on the forgot password page
  When I enter "notanemail"
  Then I should see an inline validation error
  And the submit button should remain disabled
</code></pre>

<h3>Workflow 2: AI-Assisted Debugging</h3>
<p>When a test fails with a cryptic error, paste the error and your test code into Claude and ask "why is this failing and how do I fix it?" The quality of debugging assistance from modern AI is genuinely impressive for test automation scenarios.</p>

<h3>Workflow 3: Generate Page Objects from HTML</h3>
<p>Paste a component's HTML into an AI tool and ask it to generate a Page Object. A task that took 20 minutes now takes 2.</p>

<h3>Workflow 4: Test Data Generation</h3>
<pre><code class="language-js">
// Prompt: "Generate realistic fixture data for 10 users with 
// name, email, role (admin/user), and createdAt date"

// AI generates your fixtures/users.json:
[
  { "id": 1, "name": "Sarah Chen",    "email": "s.chen@example.com",   "role": "admin", "createdAt": "2024-01-15" },
  { "id": 2, "name": "James Okonkwo", "email": "j.okonkwo@example.com", "role": "user",  "createdAt": "2024-02-03" },
  ...
]
</code></pre>

<h2>What's on the Horizon</h2>

<h3>Autonomous Test Generation from User Sessions</h3>
<p>The next frontier: AI agents that watch real user sessions (with consent), identify untested user journeys, and automatically generate and validate test cases for them. No human writing a single line of test code.</p>

<h3>AI Test Architects</h3>
<p>AI that doesn't just generate individual tests but designs entire test strategies - recommending what to test at unit vs integration vs E2E level, based on code complexity, change frequency, and business risk.</p>

<h3>Conversational Test Creation</h3>
<p>Tell an AI agent: "Make sure that when a user with a free plan tries to access premium features, they see an upgrade prompt." The agent writes the tests, runs them, and reports back - all through conversation.</p>

<h3>Predictive Defect Detection</h3>
<p>AI that analyses a pull request's changes and predicts which existing tests are most likely to fail - before you even run them. Prioritise your test runs intelligently rather than running everything every time.</p>

<h2>How to Stay Useful as Tools Improve</h2>

<h3>1. Write Better Prompts for Test Work</h3>
<p>Clear prompts with acceptance criteria, edge cases, and framework context produce better output. Treat AI like a fast junior — review everything before it lands in your repo.</p>

<h3>2. Learn the AI Testing Tools</h3>
<p>Get hands-on with at least one of these now:</p>
<ul>
  <li><strong>Applitools</strong> - AI visual testing (free tier available)</li>
  <li><strong>Mabl</strong> - AI-powered E2E testing with self-healing</li>
  <li><strong>Testim</strong> - ML-based test authoring and maintenance</li>
  <li><strong>Healenium</strong> - open-source self-healing for Selenium/Playwright</li>
  <li><strong>GitHub Copilot</strong> - for AI-assisted test writing in your IDE</li>
</ul>

<h3>3. Double Down on What AI Can't Replace</h3>
<p>AI is excellent at execution. It's weak at:</p>
<ul>
  <li><strong>Test strategy</strong> - deciding what matters most to test and why</li>
  <li><strong>Domain knowledge</strong> - understanding the business context behind a feature</li>
  <li><strong>Exploratory testing</strong> - the creative, intuition-driven discovery of unexpected bugs</li>
  <li><strong>Stakeholder communication</strong> - translating QA findings into business language</li>
  <li><strong>Risk assessment</strong> - knowing which untested scenarios could actually hurt users</li>
</ul>

<p>Invest deeply in these. They're your moat.</p>

<h3>4. Build an AI-Augmented Workflow, Not an AI-Dependent One</h3>
<p>The risk of over-relying on AI is subtle but real. If you stop understanding <em>why</em> a test is written a certain way because you always just accept the AI output, you lose the ability to debug it, maintain it, or improve it when it inevitably breaks in a complex edge case.</p>

<p>Use AI to go faster. Maintain the understanding to go deeper.</p>

<h3>5. Document What Works for Your Team</h3>
<p>Shared prompt templates and review checklists help more than individual experiments. If your team adopts AI-assisted test writing, write down what you expect people to verify before merging.</p>

<h2>Conclusion</h2>
<p>AI can speed up repetitive QA work — generating cases, fixtures, and first-pass debugging — but strategy, domain knowledge, and exploratory testing still belong to humans. Use the tools to move faster; keep ownership of what "done" means for your product.</p>

<p>If you're experimenting already, note what saved time and what needed correction. That feedback loop matters more than adopting every new tool on launch day.</p>
  `
  },
  {
    id: 1,
    title: "Building Modern Web Applications",
    excerpt: "Component architecture, performance, state management, and tooling choices for shipping maintainable web apps.",
    date: "April 14, 2024",
    readTime: "5 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Modern web apps are built from small, composable pieces rather than monolithic pages. The patterns below are ones I reach for on most projects — not because they're trendy, but because they keep codebases easier to change over time.</p>

<h2>The Component Mindset</h2>
<p>React, Vue, and Svelte all encourage the same idea: isolate UI into components that own their markup, styling, and local state. A button becomes a component with variants, sizes, and loading states instead of one-off markup copied across pages.</p>

<pre><code class="language-jsx">
// ✅ Think like this
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => (
  &lt;button className={cn(baseStyles, variants[variant], sizes[size])} {...props}&gt;
    {children}
  &lt;/button&gt;
);
</code></pre>

<h2>Performance</h2>
<p>Slow loads hurt retention. A few levers that consistently matter:</p>
<ul>
  <li><strong>Code splitting:</strong> Only ship the JavaScript the current page actually needs. React's <code>lazy()</code> and <code>Suspense</code> make this straightforward.</li>
  <li><strong>Image optimization:</strong> Use modern formats (WebP, AVIF), lazy load below-the-fold images, and always specify dimensions to prevent layout shift.</li>
  <li><strong>Caching:</strong> Leverage browser caching with proper cache headers and service workers for offline capability.</li>
  <li><strong>Bundle analysis:</strong> Run <code>npx vite-bundle-visualizer</code> or similar tools regularly. You'll be shocked what's hiding in your node_modules.</li>
</ul>

<h2>State Management</h2>
<p>Not every app needs Redux. In fact, most don't. Start with React's built-in <code>useState</code> and <code>useContext</code>. Reach for Zustand or Jotai when things get complex. Only bring in Redux or TanStack Query when you genuinely need server state synchronization at scale.</p>

<p>The rule of thumb: if your state lives in one component, keep it there. If two siblings need it, lift it up. If your whole app needs it, use context or a store.</p>

<h2>Tooling</h2>
<p>A stack I default to on new frontend work:</p>
<ul>
  <li><strong>Vite</strong> over Create React App - faster cold starts, instant HMR, better DX</li>
  <li><strong>TypeScript</strong> from day one - your future self will thank you</li>
  <li><strong>ESLint + Prettier</strong> - automate the style debates so you can focus on real problems</li>
  <li><strong>Vitest</strong> for unit tests - it shares Vite's config and is significantly faster than Jest</li>
</ul>

<h2>Deployment</h2>
<p>Vercel, Netlify, and Cloudflare Pages make shipping straightforward, but convenience shouldn't skip preview environments, basic error monitoring, and a rollback plan.</p>

<h2>Conclusion</h2>
<p>Reusable components, measured performance, and a lean stack until you need more — that covers most of what keeps a frontend codebase healthy. Start there before adding complexity.</p>
    `
  },
  {
    id: 2,
    title: "The Future of AI in Software Development",
    excerpt: "Where AI coding assistants help today, where they fall short, and what that means for how you work.",
    date: "April 10, 2024",
    readTime: "7 min read",
    category: "AI",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>GitHub Copilot, Cursor, and chat-based assistants are part of many developers' daily workflow now. They're useful for specific tasks — and unreliable for others. It helps to be explicit about which is which.</p>

<h2>What AI Can and Can't Do Today</h2>
<p>AI assistants handle boilerplate well: scaffolding components, writing tests for small functions, explaining unfamiliar code, and completing patterns they've seen many times. They struggle with novel architecture, nuanced business rules, and anything that depends on undocumented context in your codebase.</p>

<p>Think of them as a fast collaborator on well-defined tasks, not a substitute for understanding what you're shipping.</p>

<h2>Tools Worth Trying</h2>
<ul>
  <li><strong>GitHub Copilot:</strong> The most mature option. Deep IDE integration, decent multi-file context, and it's getting better at understanding your codebase over time.</li>
  <li><strong>Cursor:</strong> A Copilot competitor built as a full IDE fork of VS Code. Its "composer" feature for multi-file edits is genuinely impressive for refactoring tasks.</li>
  <li><strong>Claude / ChatGPT:</strong> Better for architectural discussions, debugging sessions, writing documentation, and tasks that benefit from back-and-forth conversation.</li>
  <li><strong>Codeium:</strong> Free alternative to Copilot that's worth a look if you're budget-conscious.</li>
</ul>

<h2>AI in Testing (Developer View)</h2>
<p>From a development side, AI can draft test cases from user stories or suggest coverage gaps. Tools like Testim and Mabl add self-healing selectors on the QA side. Generated tests still need review — passing tests that assert the wrong thing are worse than no tests.</p>

<h2>Career Impact</h2>
<p>Developers who use AI well tend to spend less time on syntax and boilerplate and more on design, review, and communication. Those skills become more important, not less, when generation gets cheaper.</p>

<h2>Risks to Watch</h2>
<p>Over-reliance shows up as subtle bugs in code that looks correct at a glance. Juniors who skip foundational debugging practice may also miss the mental models that make senior work possible. Use AI to move faster — not to skip understanding.</p>

<h2>Conclusion</h2>
<p>AI in development is an amplification layer, not a replacement story. The practical move is to learn where it helps your workflow and keep reviewing everything it produces.</p>
    `
  },
  {
    id: 3,
    title: "Creating Responsive UIs with Tailwind CSS",
    excerpt: "Utility-first styling, responsive layouts, design tokens, and dark mode with Tailwind CSS.",
    date: "April 5, 2024",
    readTime: "6 min read",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Tailwind puts styling in the markup as small utility classes instead of pre-built components you fight against. The first reaction is often skepticism; after a project or two, the workflow usually clicks.</p>

<h2>Utility-First Styling</h2>
<p>Bootstrap gives you opinionated components. Tailwind gives you primitives — <code>flex</code>, <code>pt-4</code>, <code>text-gray-700</code> — that you compose into whatever layout you need. You trade separate CSS files for co-located styling decisions.</p>

<h2>Responsive Layouts</h2>
<p>Tailwind's responsive system uses a mobile-first approach with intuitive breakpoint prefixes. You define the base style (mobile), then override at larger sizes:</p>

<pre><code class="language-html">
&lt;div class="
  flex flex-col          /* mobile: stack vertically */
  md:flex-row            /* tablet+: side by side */
  gap-4
  p-4 md:p-8            /* more padding on larger screens */
"&gt;
  ...
&lt;/div&gt;
</code></pre>

<p>Base styles target mobile; breakpoint prefixes (<code>md:</code>, <code>lg:</code>) override at larger widths. Responsive rules sit next to the element they affect.</p>

<h2>Design Tokens</h2>
<p>Tailwind's spacing scale and config file keep teams aligned. Define colors and fonts once in <code>tailwind.config.js</code> and reuse them everywhere.</p>

<pre><code class="language-js">
// tailwind.config.js - your design tokens live here
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  }
}
</code></pre>

<h2>Dark Mode</h2>
<p>Add <code>darkMode: 'class'</code>, then prefix utilities with <code>dark:</code>. No separate stylesheet required.</p>

<pre><code class="language-html">
&lt;div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-fg"&gt;
  Reads perfectly in both modes.
&lt;/div&gt;
</code></pre>

<h2>Extracting Patterns with @apply</h2>
<p>When the same utility combination repeats, extract it — but sparingly. Tailwind works best when most styling stays inline.</p>

<pre><code class="language-css">
.btn-primary {
  @apply px-4 py-2 rounded-lg bg-accent-500 text-fg font-medium
         hover:bg-accent-400 transition-colors duration-200;
}
</code></pre>

<p>Use this sparingly - the whole point of Tailwind is keeping styles local - but it's perfect for high-frequency patterns.</p>

<h2>Conclusion</h2>
<p>Tailwind is a different way to think about CSS: utilities in markup, tokens in config, responsive rules at the point of use. Give it a few projects before deciding whether it fits your team.</p>
    `
  },
  {
    id: 4,
    title: "TypeScript: Why You Should Use It",
    excerpt: "How TypeScript catches bugs early, improves editor support, and fits into existing JavaScript projects.",
    date: "March 28, 2024",
    readTime: "4 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Most JavaScript developers hit a familiar bug: <code>Cannot read properties of undefined (reading 'map')</code> in production, traced back to a string passed where an array was expected. TypeScript would have flagged that at edit time.</p>

<h2>Types as Documentation</h2>
<p>The best documentation is the kind that stays up to date automatically. When you type a function in TypeScript, the signature <em>is</em> the documentation:</p>

<pre><code class="language-ts">
// Anyone calling this knows exactly what goes in and what comes out
async function fetchUserById(id: string): Promise&lt;User | null&gt; {
  // ...
}
</code></pre>

<p>Compare that to a JSDoc comment that someone wrote 18 months ago and may or may not reflect what the function actually does today. Types enforce the contract. Comments suggest it.</p>

<h2>Editor Support</h2>
<p>TypeScript gives you autocomplete on object properties, inline errors for wrong arguments, safe renames across files, and jump-to-definition that actually works across modules.</p>

<h2>Interfaces and Generics</h2>
<p>Once you move past basic types, TypeScript's interfaces and generics let you model your domain precisely:</p>

<pre><code class="language-ts">
interface ApiResponse&lt;T&gt; {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: number;
}

// Reuse it for anything
const userResponse: ApiResponse&lt;User&gt; = await api.getUser(id);
const postsResponse: ApiResponse&lt;Post[]&gt; = await api.getPosts();
</code></pre>

<p>You write the shape once. TypeScript enforces it everywhere. Change the interface and every usage site flags immediately if it breaks the contract.</p>

<h2>The Learning Curve</h2>
<p>The first week with TypeScript can feel slower. By the time you're a few weeks in, untyped JavaScript often feels like working without guardrails. You don't need <code>strict</code> mode on day one — adopt it incrementally as the team gets comfortable.</p>

<h2>Adoption in the Ecosystem</h2>
<p>Most major JavaScript libraries ship TypeScript types now, and many greenfield projects start with TS by default. On job boards it's often listed alongside JavaScript itself.</p>

<h2>Conclusion</h2>
<p>TypeScript trades a bit of upfront typing for fewer runtime surprises and better tooling. For most teams building anything beyond a small script, that trade is worth it.</p>
    `
  },
  {
    id: 5,
    title: "Building a Portfolio That Stands Out",
    excerpt: "How to structure a developer portfolio so hiring managers understand your work quickly.",
    date: "March 20, 2024",
    readTime: "8 min read",
    category: "Career",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Many developer portfolios read like resumes with CSS: skills list, project grid, contact form. Hiring managers often spend under a minute on a first pass. Yours should answer what you build and why someone should care, quickly.</p>

<h2>Lead With What You Do</h2>
<p>Generic hero copy — "passionate full-stack developer who loves building things" — doesn't differentiate you. State the problems you solve and the kind of work you want:</p>

<pre><code class="language-markdown">
❌ "Passionate developer who loves building things"
✅ "I build fast, accessible React applications with a focus on QA and test coverage"
</code></pre>

<h2>Fewer, Stronger Projects</h2>
<p>Three excellent projects beat ten mediocre ones every time. Hiring managers don't have time to review a portfolio gallery - they'll look at one or two things, and those things need to be impressive. Choose projects that:</p>
<ul>
  <li>Solve a real problem you actually care about</li>
  <li>Demonstrate technical depth, not just technical breadth</li>
  <li>Have live demos (this is non-negotiable - dead links kill interest instantly)</li>
  <li>Show your decision-making, not just the end result</li>
</ul>

<p>That last point matters more than most developers realize. Write a short case study for each project. What was the challenge? What did you consider? What tradeoffs did you make? This is what distinguishes a portfolio from a GitHub link dump.</p>

<h2>Write About Your Decisions</h2>
<p>A short blog or case study per project shows how you think, not just what you shipped. Even a handful of technical posts helps — you don't need a weekly publishing schedule.</p>

<h2>Performance Counts</h2>
<p>If you're claiming frontend skills, a slow portfolio undercuts the message. Run Lighthouse, fix the obvious issues, and treat load time as part of the work sample.</p>

<h2>Design Without Overdoing It</h2>
<p>You don't need custom illustration work. Pick one accent color, use a consistent type scale, leave whitespace, and borrow layout patterns from sites you like. Dark themes work well for dev portfolios because code and UI both read clearly.</p>

<h2>Make Contact Easy</h2>
<p>Email, LinkedIn, and GitHub should be visible without hunting through a form. Remove friction between interest and reply.</p>

<h2>Conclusion</h2>
<p>A good portfolio tells a clear story: what you build, how you think, and how to reach you. Ship something live — an imperfect site beats a perfect one that never leaves localhost.</p>
    `
  },
  {
    id: 6,
    title: "The Rise of Web Components",
    excerpt: "Custom elements, Shadow DOM, and where Web Components fit alongside React or Vue.",
    date: "March 15, 2024",
    readTime: "6 min read",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    content: `
<p>Frameworks come and go, but browsers now ship APIs for building reusable custom elements without picking a library. Web Components aren't a replacement for React — they're a different layer of the stack.</p>

<h2>What Are Web Components?</h2>
<p>Web Components is an umbrella term for three browser APIs that work together to let you create custom, reusable HTML elements:</p>
<ul>
  <li><strong>Custom Elements:</strong> Define your own HTML tags with their own behavior. <code>&lt;my-button&gt;</code> becomes a real element the browser understands.</li>
  <li><strong>Shadow DOM:</strong> Encapsulate your component's internals. Styles inside don't leak out. Styles outside don't bleed in. True encapsulation - no CSS specificity battles.</li>
  <li><strong>HTML Templates:</strong> Define inert markup with <code>&lt;template&gt;</code> that gets cloned and stamped into the DOM on demand.</li>
</ul>

<pre><code class="language-js">
class MyButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = \`
      &lt;style&gt;button { background: #0ea5e9; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }&lt;/style&gt;
      &lt;button&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/button&gt;
    \`;
  }
}

customElements.define('my-button', MyButton);
// Now usable as &lt;my-button&gt;Click me&lt;/my-button&gt; anywhere
</code></pre>

<h2>Framework Independence</h2>
<p>A custom element works in React, Vue, Angular, or plain HTML. Large orgs (Google/Lit, Microsoft/Fluent, Adobe/Spectrum) use them as portable design-system primitives across teams on different stacks.</p>

<h2>Web Components vs Framework Components</h2>
<p>Web Components work well for leaf UI — buttons, inputs, badges. They're verbose for complex app logic and lack the ecosystem of a full framework. The practical split: Web Components for shared design tokens and primitives; React/Vue/etc. for application state and routing.</p>

<h2>Lit</h2>
<p>Lit adds reactive properties and declarative templates on top of the raw APIs while still outputting standard custom elements:</p>

<pre><code class="language-js">
import { LitElement, html, css } from 'lit';

class MyCard extends LitElement {
  static properties = { title: { type: String } };
  static styles = css\`div { border: 1px solid #eee; padding: 16px; border-radius: 8px; }\`;

  render() {
    return html\`&lt;div&gt;&lt;h2&gt;\${this.title}&lt;/h2&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/div&gt;\`;
  }
}
customElements.define('my-card', MyCard);
</code></pre>

<h2>Browser Support</h2>
<p>All major browsers have supported Web Components since around 2020. The remaining friction is usually tooling and team familiarity, not platform gaps.</p>

<h2>Conclusion</h2>
<p>Web Components fill a specific niche: portable, encapsulated UI that belongs to the platform. Worth knowing even if your day-to-day work stays inside a framework.</p>
    `
  },
];

/**
 * One chip style for every category, shared by the blog index, a post header and
 * the homepage preview.
 *
 * It used to be a per-category colour map - purple for AI, amber for Career, and
 * so on - written at the 300 weight, which only ever had contrast against a dark
 * surface. In light mode those chips were pastel-on-white and close to
 * illegible, and five hues fought the one-accent rule the palette is built on.
 * Frosted neutral reads the same in both themes, and the category is still named
 * in the label, which is where the information actually lives.
 */
export const CATEGORY_CHIP = 'glass-pill text-fg-muted';

const Blog: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="section-glow relative min-h-screen bg-surface overflow-hidden">

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-fg-muted text-sm font-medium tracking-wider uppercase mb-4 block">
              Writing
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Blog</h1>
            <p className="text-fg-muted max-w-lg mx-auto">
              Thoughts, ideas, and insights about technology, development, and design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => navigate(`/blog/${post.id}`)}
                className="glass group cursor-pointer rounded-2xl overflow-hidden hover:border-brand-line"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${CATEGORY_CHIP}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-fg-subtle mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2 text-brand-line">|</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-fg group-hover:text-fg transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-fg-muted leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <span className="inline-block mt-4 text-sm text-fg-muted group-hover:translate-x-1 transition-transform">
                    Read more →
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
