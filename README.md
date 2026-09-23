# QA Technical Assessment

**Playwright + TypeScript**

Automated end-to-end testing for:

- **Web:** DemoBlaze
- **API:** Restful-Booker

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | UI & API automation |
| TypeScript | Test implementation |
| Node.js | Runtime |
| Page Object Model | UI test structure |
| REST API | API automation |

---

## Project Structure

```text
qa-technical-assessment/
│
├── config/
│   └── environment.ts
│
├── docs/
│   └── test-design.md
│
├── fixtures/
│   └── testData.json
│
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── CartPage.ts
│   └── components/
│       ├── AuthModal.ts
│       └── PlaceOrderModal.ts
│
├── tests/
│   ├── api/
│   │   └── booking.spec.ts
│   └── web/
│       ├── auth.spec.ts
│       └── checkout.spec.ts
│
├── utils/
│   └── apiClient.ts
│
├── .env.example
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
