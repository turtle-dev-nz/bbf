import bigbrainLogo from "../../assets/bigbrain-logo-dk_bg-web.webp";
import { Navbar } from "../../components/layout/Navbar";
import { RunFooter } from "./components/RunFooter";
import { ContactSection } from "./sections/ContactSection";
import { EventStatsSection } from "./sections/EventStatsSection";
import { HeroSection } from "./sections/HeroSection";
import { PartnerSection } from "./sections/PartnerSection";
import { PartnerStripSection } from "./sections/PartnerStripSection";
import { StorySection } from "./sections/StorySection";
import { TiersSection } from "./sections/TiersSection";
import { runNavLinks } from "./data/content";
import "./styles/runTheme.css";

export function SamsBigBrainRunPage() {
  return (
    <div className="run-theme">
      <Navbar
        logoSrc={bigbrainLogo}
        logoAlt="Big Brain Foundation logo"
        homeHref="#about"
        ariaLabel="Campaign navigation"
        mobileMenuId="run-mobile-navigation"
        navLinks={runNavLinks}
        secondaryAction={{ label: "Partner", href: "#partner", variant: "ghost" }}
        primaryAction={{ label: "Donate", href: "#contact" }}
      />

      <main className="run-main">
        <HeroSection />
        <PartnerStripSection />
        <EventStatsSection />
        <PartnerSection />
        <TiersSection />
        <StorySection />
        <ContactSection />
      </main>

      <RunFooter />
    </div>
  );
}
