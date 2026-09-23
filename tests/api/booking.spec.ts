import { test, expect } from '@playwright/test';
import { RestfulBookerClient, BookingPayload } from '../../utils/apiClient';

test.describe('Restful-Booker API Automation Suite', () => {
  let apiClient: RestfulBookerClient;
  let authToken: string;

  const initialBookingData: BookingPayload = {
    firstname: 'Sharvaree',
    lastname: 'Gaud',
    totalprice: 250,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-10-01',
      checkout: '2026-10-05',
    },
    additionalneeds: 'Late Checkout',
  };

  test.beforeAll(async ({ playwright }) => {
    const requestContext = await playwright.request.newContext();
    apiClient = new RestfulBookerClient(requestContext);
    // Step: Authenticate once for the test run
    authToken = await apiClient.createToken('admin', 'password123');
    expect(authToken).toBeTruthy();
  });

  test('Request Chaining: Auth -> Create -> Retrieve -> Validate -> Update -> Validate -> Delete -> Verify', async () => {
    // 1. Create Booking
    const createRes = await apiClient.createBooking(initialBookingData);
    expect(createRes.status()).toBe(200);
    const createdBody = await createRes.json();
    const bookingId = createdBody.bookingid;
    expect(bookingId).toBeGreaterThan(0);
    expect(createdBody.booking.firstname).toBe(initialBookingData.firstname);

    // 2. Retrieve Booking
    const getRes = await apiClient.getBooking(bookingId);
    expect(getRes.status()).toBe(200);
    const getBody = await getRes.json();

    // 3. Validate Retrieved Details
    expect(getBody.firstname).toBe(initialBookingData.firstname);
    expect(getBody.totalprice).toBe(initialBookingData.totalprice);

    // 4. Update Booking
    const updatedPayload: BookingPayload = {
      ...initialBookingData,
      firstname: 'Sharvaree-Updated',
      totalprice: 400,
    };
    const updateRes = await apiClient.updateBooking(bookingId, authToken, updatedPayload);
    expect(updateRes.status()).toBe(200);

    // 5. Validate Updated Details
    const updatedBody = await updateRes.json();
    expect(updatedBody.firstname).toBe('Sharvaree-Updated');
    expect(updatedBody.totalprice).toBe(400);

    // 6. Delete Booking
    const deleteRes = await apiClient.deleteBooking(bookingId, authToken);
    expect(deleteRes.status()).toBe(201); // Restful-Booker returns 201 Created on delete

    // 7. Verify Booking No Longer Exists
    const verifyRes = await apiClient.getBooking(bookingId);
    expect(verifyRes.status()).toBe(404);
  });

  test('Negative: should return bad credentials on invalid auth', async ({ request }) => {
    const invalidClient = new RestfulBookerClient(request);
    const response = await request.post('https://restful-booker.herokuapp.com/auth', {
      headers: { 'Content-Type': 'application/json' },
      data: { username: 'wrong_user', password: 'bad_password' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

  test('Negative: should return 403 Forbidden when deleting without auth token', async () => {
    // Create a temporary booking first
    const createRes = await apiClient.createBooking(initialBookingData);
    const { bookingid } = await createRes.json();

    // Attempt delete without token
    const deleteRes = await apiClient.deleteBooking(bookingid, '');
    expect(deleteRes.status()).toBe(403);

    // Clean up created booking with token
    await apiClient.deleteBooking(bookingid, authToken);
  });

  test('Negative: should return 404 for non-existent booking ID', async () => {
    const response = await apiClient.getBooking(99999999);
    expect(response.status()).toBe(404);
  });
});