import { Page } from "@playwright/test";
import { logger } from "@utils/helpers/logger.util";

export async function getResponseData(page: Page, endpoint: string, status: number) {
  logger.info(`Waiting for response on api: ${endpoint}`);
  const response = await page.waitForResponse((res) => res.url().includes(endpoint) && res.status() === status, {
    timeout: 30000,
  });
  const responseData = await response.json();
  return responseData;
}
