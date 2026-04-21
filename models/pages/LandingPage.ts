import { Locator, Page } from "@playwright/test";
import { logger } from "@utils/helpers/logger.util";
import { Template } from "./Template";

export class LandingPage extends Template {
  readonly createPHeroButton: Locator;

  constructor(page: Page) {
    super(page);
    this.createPHeroButton = page.locator(".hero__live--cta").getByRole("link", { name: "Create my personalised" });
  }
  async goto(): Promise<void> {
    await super.goto("/uk/en/inspiration/future-menus-4/", { waitUntil: "networkidle" });
  }
}
