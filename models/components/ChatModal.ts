import { Page, Locator, expect } from "@playwright/test";
import { CHAT_MODAL_LOCATORS, LANDING_PAGE_LOCATORS } from "@utils/helpers/locators.util";
import { logger } from "@utils/helpers/logger.util";

export class ChatModal {
  readonly page: Page;
  readonly chatModal: Locator;
  readonly bnInput: Locator;
  readonly resultCard: Locator;
  readonly confirmButton: Locator;
  readonly noneButton: Locator;
  readonly yesButton: Locator;
  readonly noButton: Locator;
  readonly recommendationModal: Locator;

  constructor(page: Page) {
    this.chatModal = page.getByRole("dialog");
    this.bnInput = page.getByRole("textbox", { name: "Type your business name" });
    this.page = page;
    this.resultCard = page.getByRole("listitem");
    this.confirmButton = page.getByRole("button", { name: "I confirm this is my business" });
    this.noneButton = page.getByRole("button", { name: "None of them" });
    this.yesButton = page.getByRole("button", { name: "Yes, it's correct" });
    this.noButton = page.getByRole("button", { name: "No, it's wrong" });
    this.recommendationModal = page.locator(CHAT_MODAL_LOCATORS.phModalRoot);
  }
  async expectModalVisibility() {
    await this.chatModal.waitFor({ state: "visible", timeout: 5000 });
  }
  async fillBnInput(businessName: string) {
    logger.info(`Filling business name: ${businessName}`);
    await this.bnInput.fill(businessName);
    await this.page.getByRole("button", { name: "Submit" }).click();
    await this.page.waitForLoadState("networkidle");
  }
  async selectResult(resultCardText: string) {
    logger.info(`Result selection: ${resultCardText}`);
    await this.resultCard.filter({ hasText: ` ${resultCardText}` }).click();
    await this.page.waitForLoadState("domcontentloaded");
  }
  async isCardSelected(resultCardText: string) {
    const cardLocator = this.resultCard.filter({ hasText: ` ${resultCardText}` });
    const classAttribute = await cardLocator.getAttribute("class");
    const hasClassSelected = classAttribute?.includes("ph-business-card--selected") || false;
    return hasClassSelected;
  }
  async confirmResult() {
    await this.confirmButton.click();
    logger.info("Business name confirmed");
    await this.recommendationModal.waitFor({ state: "visible", timeout: 3000 });
  }
  async getBnImageSource(resultCardText: string) {
    const cardImageLocator = this.resultCard.filter({ hasText: ` ${resultCardText}` }).getByRole("img");
    const imageSource = await cardImageLocator.getAttribute("src");
    return imageSource;
  }
  async getSelectedBnName() {
    const cardNameLocator = this.page
      .locator(CHAT_MODAL_LOCATORS.bnCardSelected)
      .locator(CHAT_MODAL_LOCATORS.cardBussinesName);
    const bnText = await cardNameLocator.textContent();
    logger.info(`Selected card bussiness name is: ${bnText}`);
    return bnText;
  }
}
