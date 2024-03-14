import { APIResponse, expect } from "@playwright/test";

export class APIBaseTest {
    /**
     * Veryfi that response's code matches with the code
     * @param response 
     * @param code 
     */
    async verifyStatusCode(response: APIResponse, code: number) {
        expect(response.status()).toEqual(code);
    }

    /**
     * Verified that response's status matches with message.
     * @param response 
     * @param message 
     */
    async verifyStatusText(response: APIResponse, message: string) {
        expect(response.statusText()).toEqual(message);
    }

    /**
     * Verify that response's body matches with provided string
     * @param response 
     * @param body 
     */
    async verifyResponseBody(response: APIResponse, body: string) {
        expect(await response.text()).toEqual(body);
    }
}