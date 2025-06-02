# 🧪 Test Automation Framework - AutoTest

This project is designed for testing the [https://demoqa.com](https://demoqa.com) web application.
It demonstrates automated end-to-end testing using **Playwright**, **Cucumber**, **GitHub Actions**, and **Page Object Model (POM)** architecture.

---

## ✅ Prerequisites

- **Node.js** v22+
- **npm** or **yarn**
- **Chrome** and **Firefox** browsers installed

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/AronAriel/AutoTest
cd AutoTest
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers (if not installed):

```bash
npx playwright install --with-deps
```

---

## 🚀 Running Tests

### ➤ Run all Cucumber tests:

```bash
npm test
```

Generates a **JSON report** to `reports/report.json`.

### ➤ Run specific Cucumber tests by tag:

```bash
npx cucumber-js --tags "@alerts"
npx cucumber-js --tags "@checkboxes"
npx cucumber-js --tags "@tooltips and not @skip"
```

### ➤ Run HTML Cucumber report:

```bash
npm run report
```

### ➤ Run all Playwright tests:

```bash
npm run test:playwright
```

### ➤ Show Playwright HTML report:

```bash
npm run report:playwright
```

### ➤ Run tests with custom viewport, grep, and project:

```bash
npx cross-env VIEWPORT_WIDTH=1920 VIEWPORT_HEIGHT=1080 npx playwright test --workers=2 --headed --grep "smoke" --project='chromium'
```

#### Parameters:

- `--workers=2`: Parallel execution
- `--headed`: Shows the browser (headless is default)
- `--grep "smoke"`: Filter test cases by keyword
- `--project='chromium'`: Run only on Chromium
- `cross-env VIEWPORT_WIDTH / HEIGHT`: Sets custom resolution

---

## 🧪 Tagging Strategy

Tags are used to organize and selectively run tests:

- `@alerts` - Alerts tests
- `@checkboxes` - Checkbox scenarios
- `@tooltips` - Tooltip hover validations
- `@date-picker` - Date picker tests
- `@drag-drop` - Drag Drop tests
- `@form` - Form tests
- `@radio` - Radio tests
- `selectmenu` - Select Menu tests
- `slider` - Slider tests
- `textbox` - Text Box tests


You can combine tags:

```bash
npx cucumber-js --tags "@smoke and not @skip"
```

---

## 🧱 Project Structure

```
AutoTest/
│
├── .github/workflows/           # CI/CD GitHub Actions configuration
├── features/                    # Cucumber BDD feature files
│   └── step-definitions/        # Step definitions for features
├── pages/                       # Page Object Model (POM) classes
├── support/                     # Hooks, environment setup
├── test/fixtures/               # Additional reusable components
├── utils/                       # Helpers (adblock, browser setup)
├── reports/                     # JSON test results (cucumber)
└── playwright-report/           # HTML reports for Playwright
```

---

## 🧪 Technologies Used

- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [GitHub Actions](https://github.com/features/actions)
- [Faker.js](https://github.com/faker-js/faker)
- [npm-run-all](https://github.com/mysticatea/npm-run-all)

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

Tests run automatically:

- On **daily schedule** (`main` branch)
- On **pull requests** targeting:
  - `main`
  - `master`
  - `ui-tests`

Artifacts uploaded:

- `playwright-report/` (HTML UI test report)
- `reports/report.json` (Cucumber test result)

---

## 📊 Test Reports

| Type         | Path                         | Format  |
|--------------|------------------------------|---------|
| Playwright   | `playwright-report/`         | HTML    |
| Cucumber     | `reports/report.json`        | JSON    |
| Cucumber HTML| Generated via `npm run report` | HTML |

---

## 📌 Notes

- Make sure to remove deprecated CLI flags (e.g. `--publish-quiet`)
- Use `defaultTimeout: 30000` in `cucumber.config.js` to avoid test timeouts
- To run tests in parallel across browsers: `npm run test:all`

---

© 2025 AutoTest Project 

# Review 06 02

* Remove all locators to the Page Object constructor
* Create BasePage.js and crate repeatable steps Open web page by {string} url. And reuse for every page
*  replace waitForTimeout with waitForSelector
   Playwright automatically waits for elements to be ready before performing actions like click, fill, or type. For example:

The element must be visible and enabled.
The element must not be detached from the DOM.
