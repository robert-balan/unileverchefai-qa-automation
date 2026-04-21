import { type Page, test as base } from "@playwright/test";
import { Template } from "@pages/Template";
import { LandingPage } from "@pages/LandingPage";
import { ChatModal } from "@models/components/ChatModal";
import { SneakPeekPage } from "@pages/SneakPeekPage";

type PageFixtures = {
  page: Page;
  template: Template;
  landingPage: LandingPage;
  chatModal: ChatModal;
  sneakPeekPage: SneakPeekPage;
};

export const test = base.extend<PageFixtures>({
  template: async ({ page }, use) => {
    await use(new Template(page));
  },
  landingPage: async ({ page }, use) => {
    await use(new LandingPage(page));
  },
  chatModal: async ({ page }, use) => {
    await use(new ChatModal(page));
  },
  sneakPeekPage: async ({ page }, use) => {
    await use(new SneakPeekPage(page));
  },
});

export { expect } from "@playwright/test";
