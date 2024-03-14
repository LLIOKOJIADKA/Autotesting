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

test(`@API getUsers`, async ({ }) => {
    const response = await apiContext.get(`/api/users?per_page=1`);
    const json = '{"page":1,"per_page":1,"total":12,"total_pages":12,"data":[{"id":1,"email":"george.bluth@reqres.in","first_name":"George","last_name":"Bluth","avatar":"https://reqres.in/img/faces/1-image.jpg"}],"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}}';
    await api.verifyStatusCode(response, 200);
    await api.verifyResponseBody(response, json);
});