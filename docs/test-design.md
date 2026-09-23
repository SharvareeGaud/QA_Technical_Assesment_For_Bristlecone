# Test Design for DemoBlaze Product Store

## 1. Scope and Application Overview

The application under test is the DemoBlaze Product Store, available at [https://www.demoblaze.com/](https://www.demoblaze.com/).

This is a demo e-commerce site used to validate customer flows such as sign-up, login, product browsing, cart updates, and checkout. The application relies on asynchronous UI updates, browser alerts, and Bootstrap modal dialogs, so the testing approach must account for dynamic behavior rather than standard page reloads.

## 2. Test Scenario Matrix

| Category | Test Scenario | Expected Result | Priority | Automation |
| --- | --- | --- | --- | --- |
| Auth | Sign up with a unique username and password | Alert: “Sign up successful” | High | Yes |
| Auth | Sign up with an existing username | Alert: “This user already exists” | High | Yes |
| Auth | Login with an incorrect password | Alert: “Wrong password” | High | Yes |
| Auth | Login with valid credentials | Welcome message and Log out link appear | Critical | Yes |
| Catalog | Filter products by category | Only products from the selected category are shown | High | Yes |
| Cart | Add a product from the details page | Alert: “Product added.” | Critical | Yes |
| Cart | Remove an item from the cart | Item is deleted and total updates | High | Yes |
| Checkout | Complete purchase with valid details | Confirmation dialog shows order ID and amount | Critical | Yes |
| Checkout | Submit checkout with missing required fields | Validation or alert for missing information | Medium | Yes |
| Contact | Submit the contact form with valid details | Alert: “Thanks for the message!!” | Low | Manual |
| UI/UX | Check carousel and responsive layout | Layout remains aligned and visuals are stable | Medium | Manual |

## 3. Automation vs. Manual Testing

Automation should focus on critical and repeatable user journeys such as login, product selection, cart updates, and checkout. These flows directly affect conversion and are highly suitable for regression testing.

Manual testing is still useful for areas that are more visual or subjective, such as carousel behavior, responsive layout, and media playback in the About Us section. These checks are better evaluated by human observation and visual review.

## 4. Assumptions and Ambiguities

- The site is public and shared, so test usernames must be unique and generated dynamically.
- Alerts are handled with JavaScript dialogs, so automation must listen for browser dialogs before triggering actions.
- There is no real payment gateway, so checkout validation is limited to sample card data and UI logic.

## 5. Overall Testing Approach

The test strategy should prioritize critical end-to-end flows for automation and keep manual validation for visual and usability-focused checks. This provides strong regression coverage while still addressing subjective UX elements.
