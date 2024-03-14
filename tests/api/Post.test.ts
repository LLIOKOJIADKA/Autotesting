import { APIRequestContext, test } from '@playwright/test';
import { APIBaseTest } from '@lib/base/APIBaseTest'

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      // All requests we send go to this API endpoint.
      baseURL: 'https://reqres.in',
      extraHTTPHeaders: {
        // Add authorization token to all requests.
        // Assuming personal access token available in the environment.
        'Authorization': `token`,
      },
    });
});

test.afterAll(async ({ }) => {
    // Dispose all responses.
    await apiContext.dispose();
});

const api = new APIBaseTest();

test(`@API postUsers`, async ({ }) => {

    const requestBody = {
        "name": "pavel",
        "job": "tester"
    };

    const response = await apiContext.post(`/api/users`, { data: requestBody });
    await api.verifyStatusCode(response, 201);
    await api.verifyStatusText(response, 'Created');
});