//Flow 1 business name capturing:

import { test, expect } from "@utils/helpers/pageFixtures.util";
import { getResponseData } from "@utils/helpers/api.util";
import { logger } from "@utils/helpers/logger.util";

test.describe("Business name capturing flow", () => {
  test.beforeEach(async ({ landingPage }) => {
    await landingPage.goto();
  });

  //happy path From Hero CTA
  test("should capture business name starting from Hero CTA", async ({
    landingPage,
    page,
    template,
    chatModal,
    sneakPeekPage,
  }) => {
    //Results card business address
    const businessAddress = "1702 Liberty Rd, Sykesville, MD 21784, USA";
    const bnNameInput = "Wendy's";
    //Start bussiness name capturing from Hero CTA
    await landingPage.createPHeroButton.click();
    await expect(template.aiConsentModal).toBeVisible();
    await page.waitForLoadState("networkidle");
    await expect(template.aiConsentModal).toHaveScreenshot("01-consent-modal.png");
    //Accepting consent
    await template.acceptAiConsentModal();
    await chatModal.expectModalVisibility();
    //Verifing chat modal
    const responseBody = await getResponseData(page, "api/v1/chat/message", 200);
    expect(responseBody.response.suggested_prompts.length).toBeGreaterThan(0);
    await expect(chatModal.chatModal).toHaveScreenshot("02-business-name-modal.png", {
      mask: [page.locator(".message-bubble div").nth(1)],
    });
    //Inputing bussines name
    await chatModal.fillBnInput(bnNameInput);
    //Result selection
    await chatModal.selectResult(businessAddress);
    expect(await chatModal.isCardSelected(businessAddress)).toBeTruthy();
    //confirming Search result
    const bnSourceImage = await chatModal.getBnImageSource(businessAddress);
    const bnName = await chatModal.getSelectedBnName();
    await chatModal.confirmResult();
    //Sneak-peak elements validation
    await page.waitForURL("**/sneak-peek");
    await expect(sneakPeekPage.imageLogo).toBeVisible();
    const logoSource = await sneakPeekPage.getLogoImageSource();
    expect(bnSourceImage).toBe(logoSource);
    expect(await sneakPeekPage.getBnLogoTitle()).toBe(bnName);
    expect(await sneakPeekPage.getBnBlockRightText()).toBe("25+recommendations generated...");
    expect(await sneakPeekPage.insightCard.count()).toBe(3);
    logger.info("Insights recomandation cards are visible");
    await expect(sneakPeekPage.unlockCTA).toBeVisible();
    logger.info("Unlock my personal Hub button is visible");
    await expect(sneakPeekPage.ctaContainer).toHaveScreenshot("03-sneak-peek-unlock-my-personal-hub.png");
  });
});

//sa mai facem pasii pt multi si single results si mai jos sa facem alt test cu happy flow rapid

//happy path From Hero CTA
test("Should Quickly capture business name starting from Hero CTA", async ({
  landingPage,
  page,
  template,
  chatModal,
  sneakPeekPage,
}) => {});
