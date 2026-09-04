import { useEffect } from "react";

const SITE_URL = "https://www.bigbrainfoundation.org";
const SHARE_IMAGE = `${SITE_URL}/social/sams-big-brain-run.webp`;

type Metadata = {
  title: string;
  description: string;
  path: string;
  type: "website" | "article";
  schema: Record<string, unknown>;
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

function metadataForPath(pathname: string): Metadata {
  const organization = {
    "@type": "Organization",
    name: "Big Brain Foundation",
    url: SITE_URL,
  };

  if (pathname === "/sams-big-brain-run/georgies-story") {
    return {
      title: "Georgie's Story | Sam's Big Brain Run",
      description:
        "Read Georgie's story and support Sam's Big Brain Run to fund New Zealand's first national brain tumour registry.",
      path: pathname,
      type: "article",
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Georgie's Story",
        description:
          "Georgie's story is part of Sam's Big Brain Run, raising funds for New Zealand's first national brain tumour registry.",
        author: organization,
        publisher: organization,
        mainEntityOfPage: `${SITE_URL}${pathname}`,
      },
    };
  }

  if (pathname === "/sams-big-brain-run") {
    return {
      title: "Sam's Big Brain Run | Fund NZ's First Brain Tumour Registry",
      description:
        "In January 2027, Sam will run 25 ultramarathons in 25 days to fund New Zealand's first national brain tumour registry.",
      path: pathname,
      type: "website",
      schema: {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Sam's Big Brain Run",
        description:
          "Sam Saunt-Lord will run 25 consecutive ultramarathons down New Zealand's North Island to fund New Zealand's first national brain tumour registry.",
        startDate: "2027-01",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "New Zealand's North Island",
          address: { "@type": "PostalAddress", addressCountry: "NZ" },
        },
        organizer: organization,
        url: `${SITE_URL}${pathname}`,
      },
    };
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
    setMeta("property", "og:image:alt", "Sam running for New Zealand's first national brain tumour registry");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", metadata.title);
    setMeta("name", "twitter:description", metadata.description);
    setMeta("name", "twitter:image", SHARE_IMAGE);
    setStructuredData(metadata.schema);
  }, [pathname]);

  return null;
}