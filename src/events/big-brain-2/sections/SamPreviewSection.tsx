import "./SamPreviewSection.css";
import "./SamPreviewSection.css";
import samHero from "../../../assets/campaigns/bigBrainRun/sam-hero.jpeg";

export function SamPreviewSection() {
  return (
    <section className="bbr-sam-preview-section">
      <div className="bbr-sam-preview">
        <img
          className="bbr-sam-preview-image"
          src={samHero}
          alt="A runner sprints on a track in golden sunlight"
          loading="lazy"
        />
      </div>
    </section>
  );
}
