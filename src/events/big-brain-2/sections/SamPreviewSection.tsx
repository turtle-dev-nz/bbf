import "./SamPreviewSection.css";

export function SamPreviewSection() {
  return (
    <section className="bbr-sam-preview-section">
      <div className="bbr-sam-preview">
        <img
          className="bbr-sam-preview-image"
          src="https://images.unsplash.com/photo-1744060204728-f68e434a3edf?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0"
          alt="A runner sprints on a track in golden sunlight"
          loading="lazy"
        />
        <p className="bbr-sam-preview-copy">
          By collecting better data, researchers can better understand brain cancer, improve treatment, and create more
          hope for the future patients and their families.
        </p>
      </div>
    </section>
  );
}
