import type { ReactNode } from "react";
import cactusLogo from "../../../assets/campaigns/bigBrainRun/sponsors/cactus-logo-horz.avif";
import drymaxLogo from "../../../assets/campaigns/bigBrainRun/sponsors/drymax_logo_hi-res-scaled.webp";
import garminLogo from "../../../assets/campaigns/bigBrainRun/sponsors/garmin-logo-black.png";
import icebreakerLogo from "../../../assets/campaigns/bigBrainRun/sponsors/icebreaker-MTN-Logo-Black (1).avif";
import mizunoLogo from "../../../assets/campaigns/bigBrainRun/sponsors/mizuno-logo.png";
import shoeClinicLogo from "../../../assets/campaigns/bigBrainRun/sponsors/shoe-clinic-diamond-logo-round.webp";
import vwLogo from "../../../assets/campaigns/bigBrainRun/sponsors/vw-logo.png";
import southlandLogo from "../../../assets/campaigns/bigBrainRun/sponsors/sourthland-logo.jpg";
import btsLogo from "../../../assets/campaigns/bigBrainRun/sponsors/brain-tumour-support-logo.png";
import nanosLogo from "../../../assets/campaigns/bigBrainRun/sponsors/nano-logo.png";

type BbrCampaign = {
  raised: number;
  goal: number;
  eyebrow: string;
  description: ReactNode;
};

export const BBR_CAMPAIGN: BbrCampaign = {
  raised: 353,
  goal: 100000,
  eyebrow: "Sam's Big Brain Run · 2025",
  description: (
    <>
      <p>
        Supported by{" "}
        <a href="https://www.braintumoursupport.org.nz" target="_blank" rel="noopener noreferrer">
          Brain Tumour Support
        </a>
        , every dollar donated goes directly to{" "}
        <a href="https://www.nanos.co.nz" target="_blank" rel="noopener noreferrer">
          NANOS
        </a>
        , the leading neuro-oncology society in NZ, to help build New Zealand's first national Brain Tumour Registry and
        advance brain cancer research.
      </p>
      <p>
        <strong>Be part of something bigger.</strong>
      </p>
    </>
  ),
};

export const BBR_PHASES = [
  {
    number: 1,
    name: "Registry Planning",
    goal: 25000,
    description: "Establish the foundations and infrastructure for the Registry.",
  },
  {
    number: 2,
    name: "National Data Collection",
    goal: 56000,
    description: "Collect national data to better understand brain tumours across New Zealand.",
  },
  {
    number: 3,
    name: "Research Growth",
    goal: 100000,
    description: "Support research growth and drive future breakthroughs.",
  },
] as const;

export const BBR_CURRENT_PHASE_INDEX = 0;

export const BBR_DONATION_IMPACT = {
  points: ["Building New Zealand's first Brain Tumour Registry", "Supporting NANOS' brain cancer research"],
  summary: `Every dollar helps researchers build evidence on brain
cancer and patients in Aotearoa New Zealand. This world
leading database registry will attract international funding
and accelerate medical research in Aotearoa, and make a
unique contribution to the global fight against this
horrendous disease.`,
  // "Every donation helps create the national evidence researchers need to better understand brain cancer, compare New Zealand internationally, attract future research funding, and improve outcomes for future generations.",
} as const;

export const BBR_PRESET_AMOUNTS = [
  { amount: 5, label: "Supporter" },
  { amount: 15, label: "Contributor" },
  { amount: 30, label: "Champion" },
  { amount: 50, label: "Hero" },
] as const;

export const BBR_IMPACT_MESSAGES: Record<number, string> = {
  5: "$5 helps cover awareness materials shared with local schools.",
  15: "$15 contributes to funding a community support session.",
  30: "$30 funds a neurological research resource for a week.",
  50: "$50 sponsors a family attending a Big Brain Foundation event.",
};

export const BBR_MAIN_PAGE_STORY = {
  pullQuote: (
    <span>
      "I couldn’t change her diagnosis. <br />
      But I could help change what comes next.."
    </span>
  ),
  paragraphs: [
    "After facing his own mental health struggles, Sam realised life was too short to stand still. He chose to change course by pushing himself beyond his limits, challenging both his mind and body, and dedicating that journey to making a difference for others.",
    "Then someone close to him was diagnosed with brain cancer.",
    "So he chose to run..",

    <div className="bbr-story-list">
      <span className="bbr-story-list-item">25 Ultra Marathons</span>
      <span className="bbr-story-list-item">25 Consecutive Days</span>
      <span className="bbr-story-list-final">The length of the North Island</span>
    </div>,
    // <div className="bbr-story-list-section">
    //   <ul className="bbr-story-list">
    //     <li>Twenty-five ultramarathons</li>
    //     <li>Twenty-five consecutive days</li>
    //   </ul>
    //   <span className="bbr-story-list-equals">=</span>
    //   <strong className="bbr-story-list-result">The length of the North Island of New Zealand.</strong>
    // </div>,

    "Not because running will cure brain cancer. But because every kilometre can help build something that will outlast the run itself.",
    "Every donation helps fund New Zealand’s first Brain Tumour Registry and supports NANOS’ research into better diagnosis, treatment, and outcomes for future generations.",
    "This isn’t just about one person running. It’s about thousands of New Zealanders choosing to do something that matters.",
  ],
};

export const BBR_STORY = {
  pullQuote: '"This is about far more than running. This is a story about people."',
  paragraphs: [
    "I'm Sam Saunt-Lord, 20 years old from Wellington. In January 2027, I will run 25 consecutive ultra-marathons down New Zealand's North Island to raise awareness and funding for brain cancer research.",
    "Inspired by my cousin Georgie's diagnosis of Glioblastoma - the most aggressive and incurable brain cancer, with a prognosis of 12–18 months - I am running to raise money for the first National Brain Tumour Registry here in Aotearoa.",
    "Along the way, I'll be sharing kōrero with patients, whānau, caregivers, researchers, and advocates whose lives have been impacted by this devastating disease.",
    "A documentary is being made and filming has started. It will follow my journey and capture the intensely physical challenge of running more than 1,300 kilometres in 25 days, whilst exploring deeply human stories of resilience, determination, hope, and courage that define the brain cancer community of Aotearoa every single day.",
    "This run will push me to the edge of my physical and emotional limits. Battling fatigue, injury, weather, and the relentless demands of consecutive ultra-marathons.",
    "But this is about far more than running. This is a story about people. It is a story about the kiwi community coming together, about bravery and resilience in the face of adversity, and about finding hope when the odds seem overwhelming.",
    "It is a story that celebrates the extraordinary resilience of ordinary New Zealanders and shines a light on an aggressive disease that urgently needs greater awareness, support, and research funding.",
  ],
} as const;

export const BBR_GEORGIE = {
  pullQuote:
    '"I will fight for as long as I possibly can but want to ensure that the best is being done for the whole brain cancer community."',
  paragraphs: [
    "I have had multiple migraines every month for over 20 years, but on this occasion, it was different. It got worse quickly. I came in from outside, sat on the sofa and it exploded in my head. My last thought was, that's it, I'm gone.",
    "The date of the seizure was 20th May 2023. That was the start of my journey. A few days later I was informed about the brain tumour.",
    "My procedure has been the standard approach: operate to remove the big chunk, then radio and chemo, followed by more chemo. The standard procedure has not changed in decades, nor has life expectancy - the average is 18 months. What we need is more research, more trials, more exploration; fundamentally we need more investment.",
    "Whilst I have a GBM (Glioblastoma tumour), I also have a life I love, a world I'm incredibly grateful for, a history that inspires and builds my strength, and a family that I am utterly devoted to.",
    "Limited life expectancy brings forward your priorities. The main one is my family - particularly my kids - being around as long as possible. I was 13 when my father died. It was gutting, he was a wonderful man, and everyone loved being with him. You can focus on the loss, but over time I was able to focus on the strength he gave me.",
    "One fear that stewed a little longer than others was 'discovering you were going to die'. I thought that would be the worst thing to live with. And yet, when that fear became a reality, my biggest fear disappeared. Now I knew I was going to die earlier than scheduled, but now I could make plans!",
  ],
  secondQuote: '"Now I knew I was going to die earlier than scheduled, but now I could make plans!"',
} as const;

export const BBR_SOCIAL = [
  { platform: "instagram", handle: "@sams_bigbrainrun", href: "https://instagram.com/sams_bigbrainrun" },
  { platform: "facebook", handle: "@samsbigbrainrun", href: "https://facebook.com/samsbigbrainrun" },
  { platform: "web", handle: "bigbrainfoundation.org", href: "https://bigbrainfoundation.org" },
] as const;

export const BBR_CHOICES = [
  { icon: "book", text: "Researchers choose to learn." },
  { icon: "heart", text: "Families choose to love." },
  { icon: "activity", text: "Doctors choose to care." },
  { icon: "gift", text: "Volunteers choose to give." },
  { icon: "award", text: "Sponsors choose to contribute." },
  { icon: "people", text: "Supporters choose to take action." },
] as const;

export const BBR_SPONSORS = [
  { name: "Cactus", logoSrc: cactusLogo, link: "https://cactusoutdoor.co.nz" },
  { name: "Drymax", logoSrc: drymaxLogo, link: "https://shoeclinic.co.nz/accessories/drymax-socks" },
  { name: "Garmin", logoSrc: garminLogo, link: "https://garmin.com" },
  { name: "Icebreaker", logoSrc: icebreakerLogo, link: "https://ap.icebreaker.com/en-nz" },
  { name: "Mizuno", logoSrc: mizunoLogo, link: "https://nzl.mizuno.com" },
  { name: "Shoe Clinic", logoSrc: shoeClinicLogo, link: "https://shoeclinic.co.nz" },
  { name: "Volkswagen", logoSrc: vwLogo, link: "https://volkswagen.co.nz" },
  { name: "Southland", logoSrc: southlandLogo, link: "https://www.locatorbeacons.co.nz/" },
] as const;

export const BBR_PARTNERS = [
  {
    initials: "BTS",
    name: "Brain Tumour Support NZ",
    description: "Informing, supporting, and advocating for brain tumour patients and their whānau across New Zealand.",
    href: "https://www.braintumoursupport.org.nz",
    logo: btsLogo,
  },
  {
    initials: "NAN",
    name: "New Zealand Aotearoa Neuro-Oncology Society",
    description: `NANOS is an incorporated national society comprising of over
                  80 members, including clinicians, researchers, and patient
                  support community groups. NANOS is an integrated member of
                  the Asian Society of Neuro-Oncology, which provides access to
                  international collaborations and resources.`,
    href: "https://www.nanos.co.nz",
    logo: nanosLogo,
  },
] as const;
