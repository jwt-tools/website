import ky from 'ky';

const api = ky.extend({
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 2,
    statusCodes: [401, 408, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      // Auto-refresh tokens
      // async (request, options) => {
      //   // request.headers.set('Authorization', `Bearer ${tokenResp.access_token}`);
      // },
    ],
    beforeError: [
      // async (error) => {
      //   // return RowndApiError.create(error);
      // },
    ],
  },
});

export default api;
