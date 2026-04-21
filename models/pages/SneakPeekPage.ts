import { Locator, Page } from "@playwright/test";
import { logger } from "@utils/helpers/logger.util";
import { Template } from "./Template";
import { COMPONENTS_LOCATORS } from "@utils/helpers/locators.util";

export class SneakPeekPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly imageLogo: Locator;
  readonly bnBlockLeft: Locator;
  readonly bnBlockRight: Locator;
  readonly insightCard: Locator;
  readonly unlockCTA: Locator;
  readonly ctaContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.imageLogo = page.locator("img.business-logo");
    this.bnBlockLeft = page.locator(".business-block-left");
    this.bnBlockRight = page.locator(".business-block-right");
    this.insightCard = page.locator(".insight-card");
    this.unlockCTA = page.getByRole("link", { name: "Unlock my personal hub" });
    this.ctaContainer = page.locator(COMPONENTS_LOCATORS.floatCTAContainer);
  }

  async getLogoImageSource() {
    const imageSource = await this.imageLogo.getAttribute("src");
    return imageSource;
  }
  async getBnLogoTitle() {
    const logoTitle = await this.bnBlockLeft.locator("h2").textContent();
    logger.info(`Logo title is: ${logoTitle}`);
    return logoTitle;
  }
  async getBnBlockRightText() {
    const blockRightText = await this.bnBlockRight.textContent();
    logger.info(`No. of recomandations is: ${blockRightText}`);
    return blockRightText;
  }
}
