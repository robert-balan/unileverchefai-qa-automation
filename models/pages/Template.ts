import { FrameLocator, Locator, Page } from "@playwright/test";
import { logger } from "@utils/helpers/logger.util";

export class Template {
  readonly page: Page;
  readonly navButton: Locator;
  readonly navMenu: Locator;
  readonly createPFloatButton: Locator;
  readonly aiConsentModal: Locator;
  readonly aiConsentAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navButton = page.getByRole("button", { name: "Open navigation" });
    this.navMenu = page.getByRole("paragraph").filter({ hasText: "Home" });
    this.createPFloatButton = page.locator(".floating-cta__cta").getByRole("link", { name: "Create my personalised" });
    this.aiConsentModal = page.locator(".cookie-agreement-modal");
    this.aiConsentAcceptButton = page.getByRole("button", { name: "I agree" });
  }

  async goto(
    url: string,
    options?: {
      waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
      timeout?: number;
    },
  ) {
    logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, options);
  }

  async openNav() {
    logger.info("Opening burger menu");
    await this.navButton.click();
    await this.navMenu.waitFor({
      state: "visible",
      timeout: 2000,
    });
  }
  async acceptAiConsentModal() {
    logger.info("Consenting AI agreement");
    await this.aiConsentModal.waitFor({ state: "visible", timeout: 2000 });
    await this.aiConsentAcceptButton.click();
  }
}
