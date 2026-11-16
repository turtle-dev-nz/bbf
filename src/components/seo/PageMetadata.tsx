import { useEffect } from "react";
import { ROUTES } from "../../app/routes";

const SITE_URL = "https://www.bigbrainfoundation.org";
const SHARE_IMAGE = `${SITE_URL}/social/sams-big-brain-run.webp`;

type Metadata = {
  title: string;
  description: string;
  path: string;
  type: "website" | "article";
  schema: Record<string, unknown>;
  noindex?: boolean;
};

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(url: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = url;
}

function setStructuredData(schema: Record<string, unknown>) {
  let element = document.head.querySelector<HTMLScriptElement>('script[data-page-schema="true"]');

  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.pageSchema = "true";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(schema);
}

const RUN_DESCRIPTION =
  "Sam is running 25 ultramarathons in 25 days, Cape Reinga to Wellington, to help give New Zealand's brain tumour registry a running start. 100% of donations go to NANOS.";

function metadataForPath(pathname: string): Metadata {
  const organization = {
    "@type": "Organization",
    name: "Big Brain Foundation",
    url: SITE_URL,
  };

  const page = (title: string, description: string, type: Metadata["type"] = "website", extra = {}): Metadata => ({
    title: `${title} | Sam's Big Brain Run`,
    description,
    path: pathname,
    type,
    schema: {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "WebPage",
      name: title,
      description,
      url: `${SITE_URL}${pathname}`,
      publisher: organization,
      ...extra,
    },
  });

  switch (pathname) {
    case ROUTES.samsBigBrainRun:
      return {
        title: "Sam's Big Brain Run | Back Sam. It's a no-brainer.",
        description: RUN_DESCRIPTION,
        path: pathname,
        type: "website",
        schema: {
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Sam's Big Brain Run",
          description: RUN_DESCRIPTION,
          startDate: "2027-01",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Cape Reinga to Wellington, New Zealand",
            address: { "@type": "PostalAddress", addressCountry: "NZ" },
          },
          organizer: organization,
          url: `${SITE_URL}${pathname}`,
        },
      };
    case ROUTES.theRun:
      return page(
        "The Run",
        "The route, the documentary and the crew: 25 ultramarathons in 25 days, Cape Reinga to Wellington.",
      );
    case ROUTES.follow:
      return page("Follow Sam", "Follow Sam's run down the North Island, and find ways to get involved.");
    case ROUTES.registry:
      return page(
        "The Registry",
        "Why NANOS is developing a national brain tumour registry for New Zealand, and how your donation helps.",
      );
    case ROUTES.faq:
      return page("FAQ", "Where your donation goes, who NANOS are, and other questions about Sam's Big Brain Run.");
    case ROUTES.georgiesStory:
      return page("Georgie's Story", "Georgie's story, in her own words: why Sam's family started the Big Brain Run.", "article", {
        headline: "Georgie's Story",
        author: organization,
      });
    case ROUTES.liveDashboard:
      return { ...page("Live dashboard", "Internal."), noindex: true };
  }

  return {
    title: "Big Brain Foundation | Better Brain Health for New Zealand",
    description:
      "Big Brain Foundation connects people, research and communities to improve brain health across New Zealand.",
    path: "/",
    type: "website",
    schema: { "@context": "https://schema.org", ...organization },
  };
}

export function PageMetadata({ pathname }: { pathname: string }) {
  useEffect(() => {
    const metadata = metadataForPath(pathname);
    const url = `${SITE_URL}${metadata.path}`;

    document.title = metadata.title;
    setCanonical(url);
    setMeta("name", "description", metadata.description);
    setMeta("property", "og:title", metadata.title);
    setMeta("property", "og:description", metadata.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", metadata.type);
    setMeta("property", "og:image", SHARE_IMAGE);
    setMeta("property", "og:image:alt", "Sam running down New Zealand's North Island");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SHARE_IMAGE);
    setStructuredData(metadata.schema);
    setMeta("name", "robots", metadata.noindex ? "noindex, nofollow" : "index, follow");
  }, [pathname]);

  return null;
}