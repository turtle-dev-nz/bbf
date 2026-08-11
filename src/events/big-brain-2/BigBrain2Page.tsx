import { useState } from "react";
import { DonationNav } from "./components/DonationNav";
import { DonationModal } from "./components/DonationModal";
import { StoryModal } from "./components/StoryModal";
import { HeroSection } from "./sections/HeroSection";
import { DonationSection } from "./sections/DonationSection";
import { DonationImpactSection } from "./sections/DonationImpactSection";
import { StorySection } from "./sections/StorySection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { SamPreviewSection } from "./sections/SamPreviewSection";
import { ChooseSection } from "./sections/ChooseSection";
import { FollowJourneySection } from "./sections/FollowJourneySection";
import { PartnersSection } from "./sections/PartnersSection";
import "./styles/base.css";

export function BigBrain2Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="bbr">
      <DonationNav onOpenModal={openModal} />

      <main>
        <HeroSection />
        <DonationSection onOpenModal={openModal} />
        <DonationImpactSection />
        <SponsorsSection />
        <SamPreviewSection />
        <StorySection onReadMore={() => setStoryOpen(true)} />
        <ChooseSection onDonate={openModal} />
        <FollowJourneySection />
        <PartnersSection />
      </main>

      <footer className="bbr-footer">
        <p>
          Powered by <a href="#">Raisley</a> · Funds managed by the Big Brain Foundation
          <br />
          Questions? <a href="mailto:hello@bigbrainfoundation.org">hello@bigbrainfoundation.org</a>
        </p>
      </footer>

      <DonationModal isOpen={modalOpen} onClose={closeModal} />
      <StoryModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
        onDonate={() => {
          setStoryOpen(false);
          openModal();
        }}
      />
    </div>
  );
}
