import { APIRequestContext, APIResponse } from '@playwright/test';

export interface BookingDates {
  checkin: string;
  checkout: string;
}

export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export class RestfulBookerClient {
  private baseUrl = 'https://restful-booker.herokuapp.com';

  constructor(private request: APIRequestContext) {}

  /**
   * Authenticate and obtain an auth token
   */
  async createToken(username = 'admin', password = 'password123'): Promise<string> {
    const response = await this.request.post(`${this.baseUrl}/auth`, {
      headers: { 'Content-Type': 'application/json' },
      data: { username, password },
    });
    const body = await response.json();
    return body.token;
  }

  /**
   * Create a new booking
   */
  async createBooking(payload: BookingPayload): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/booking`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: payload,
    });
  }

  /**
   * Retrieve a booking by ID
   */
  async getBooking(bookingId: number): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/booking/${bookingId}`, {
      headers: { Accept: 'application/json' },
    });
  }

  /**
   * Update an existing booking (Full update via PUT)
   */
  async updateBooking(bookingId: number, token: string, payload: BookingPayload): Promise<APIResponse> {
    return await this.request.put(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `token=${token}`,
      },
      data: payload,
    });
  }

  /**
   * Delete a booking by ID
   */
  async deleteBooking(bookingId: number, token: string): Promise<APIResponse> {
    return await this.request.delete(`${this.baseUrl}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}