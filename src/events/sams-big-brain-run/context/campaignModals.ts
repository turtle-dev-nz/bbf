import { createContext, useContext } from "react";
import type { ContactTopic } from "../components/ContactModal";

export type CampaignModals = {
  openDonate: () => void;
  openContact: (topic?: ContactTopic) => void;
  openStory: () => void;
};

export const CampaignModalsContext = createContext<CampaignModals | null>(null);

export function useCampaignModals(): CampaignModals {
  const ctx = useContext(CampaignModalsContext);
  if (!ctx) throw new Error("useCampaignModals must be used inside <CampaignLayout>");
  return ctx;
}
