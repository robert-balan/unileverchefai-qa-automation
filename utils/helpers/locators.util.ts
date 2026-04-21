import { type Page, test as base } from "@playwright/test";
import { Template } from "@pages/Template";
import { LandingPage } from "@pages/LandingPage";
import { ChatModal } from "@models/components/ChatModal";
import { SneakPeekPage } from "@pages/SneakPeekPage";

export const CHAT_MODAL_LOCATORS = {
  phModalRoot: "#personalized-hub-modal-root",
  bnCardSelected: ".ph-business-card--selected",
  cardBussinesName: ".ph-business-name",
};
export const LANDING_PAGE_LOCATORS = {
  landingHeroCTA: ".hero__live--cta",
};

export const HEADER_LOCATORS = {};

export const FOOTER_LOCATORS = {};

export const COMPONENTS_LOCATORS = {
  floatingCTA: ".floating-cta__cta",
  floatCTAContainer: ".floating-cta__container",
};
