import cactusLogo from "../../../assets/campaigns/bigBrainRun/sponsors/cactus-logo-horz.avif";
import drymaxLogo from "../../../assets/campaigns/bigBrainRun/sponsors/drymax_logo_hi-res-scaled.webp";
import garminLogo from "../../../assets/campaigns/bigBrainRun/sponsors/garmin-logo-black.png";
import icebreakerLogo from "../../../assets/campaigns/bigBrainRun/sponsors/icebreaker-MTN-Logo-Black (1).avif";
import mizunoLogo from "../../../assets/campaigns/bigBrainRun/sponsors/mizuno-logo.png";
import shoeClinicLogo from "../../../assets/campaigns/bigBrainRun/sponsors/shoe-clinic-diamond-logo-round.webp";
import vwLogo from "../../../assets/campaigns/bigBrainRun/sponsors/vw-logo.png";
import neversecondLogo from "../../../assets/campaigns/bigBrainRun/sponsors/nvr2nd_02_Black.png";
import southlandLogo from "../../../assets/campaigns/bigBrainRun/sponsors/sourthland-logo.jpg";
import { ROUTE_TOTAL_KM_ROUNDED } from "./route";

/* ─────────────────────────────────────────
   Core facts and lines used across pages
───────────────────────────────────────── */

export const BBR_TAGLINE = "It's a no-brainer.";

export const BBR_FACTS = {
  days: 25,
  ultras: 25,
  distanceKm: ROUTE_TOTAL_KM_ROUNDED,
  start: "Cape Reinga",
  finish: "Wellington",
  when: "January 2027",
} as const;

export const BBR_MONEY_LINE = "100% of donations go to NANOS";

/* ─────────────────────────────────────────
   Why Sam runs (approved wording from the live site, lightly reframed)
───────────────────────────────────────── */

export const BBR_WHY_SAM_RUNS = {
  heading: "He started running for himself. Now he's running for all of us.",
  paragraphs: [
    "After facing his own mental health struggles, Sam realised life was too short to stand still. He chose to push himself beyond his limits, challenging both his mind and body, and to dedicate that journey to making a difference for others.",
    "Then his cousin Georgie, in the UK, was diagnosed with brain cancer. The family asked what they could do to help people affected by brain cancer here in New Zealand.",
    "So Sam chose to run, with the whole family behind him.",
  ],
} as const;

/** Sam's full story, in his own words (StoryModal). */
export const BBR_STORY = {
  pullQuote: '"This is about far more than running. This is a story about people."',
  paragraphs: [
    "I'm Sam Saunt-Lord, 20 years old from Wellington. In January 2027, I will run 25 consecutive ultra-marathons down New Zealand's North Island to raise awareness and support for brain cancer research.",
    "I'm inspired by my cousin Georgie, who lives in the UK and was diagnosed with glioblastoma, the most aggressive form of brain cancer. I'm running to support NANOS's work to develop a national brain tumour registry here in Aotearoa.",
    "Along the way, I'll be sharing kōrero with patients, whānau, caregivers, clinicians and researchers whose lives have been touched by this disease.",
    "A documentary is being made and filming has started. It will follow the physical challenge of running around 1,200 kilometres in 25 days, and the human stories of resilience, determination, hope and courage in the brain cancer community of Aotearoa.",
    "This run will push me to the edge of my physical and emotional limits: fatigue, injury, weather and the relentless demands of consecutive ultra-marathons.",
    "But this is about far more than running. It is a story about Kiwis coming together, about bravery in the face of adversity, and about finding hope when the odds seem overwhelming.",
  ],
} as const;

/** Georgie's story, in her own words. She lives in the UK. */
export const BBR_GEORGIE = {
  pullQuote:
    '"I will fight for as long as I possibly can but want to ensure that the best is being done for the whole brain cancer community."',
  context:
    "Georgie lives in the UK and is not being treated in New Zealand. Her story is why the family asked what they could do here at home.",
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

/* ─────────────────────────────────────────
   Why it matters: sourced, non-critical facts
───────────────────────────────────────── */

export type SourcedStat = { value: string; label: string; source: string; href: string };

export const BBR_STATS: SourcedStat[] = [
  {
    value: "#1",
    label: "cancer killer of people under 40",
    source: "Brain Tumour Support NZ",
    href: "https://www.braintumoursupport.org.nz/ten-facts",
  },
  {
    value: "42%",
    label: "of cancer deaths in New Zealand children aged 14 and under",
    source: "Brain Tumour Support NZ",
    href: "https://www.braintumoursupport.org.nz/ten-facts",
  },
  {
    value: "2,400+",
    label: "New Zealanders diagnosed with a brain tumour every year",
    source: "Health Research Council",
    href: "https://hrc.govt.nz/node/46443",
  },
];

export const BBR_REGISTRY_POINTS = [
  {
    title: "Data that reflects New Zealand.",
    body: "Our own people and our own services, including Māori and Pasifika communities.",
  },
  {
    title: "Patients and families at the centre.",
    body: "Over time, lived experience alongside clinical information.",
  },
  {
    title: "A stronger case for research and trials.",
    body: "Better evidence to pursue clinical trials and better care here.",
  },
] as const;

export const BBR_REGISTRY_WHAT_IF = [
  "What if we could understand how symptoms change, not just the diagnosis?",
  "What if we knew what support patients, carers and families actually need?",
  "What if that helped bring more clinical trials to New Zealand?",
  "What if what we learn here helped people around the world?",
] as const;

export const BBR_REGISTRY_CARE = [
  { title: "Privacy first", body: "Public reports protect identities. No individual records are ever made public." },
  {
    title: "Informed consent",
    body: "Clear choices for patients about taking part in research and sharing their experience.",
  },
  { title: "Māori data sovereignty", body: "Respecting the interests and authority Māori have over Māori data." },
] as const;

/* ─────────────────────────────────────────
   FAQ (public). Bracketed answers still need confirming.
───────────────────────────────────────── */

export const BBR_FAQS = [
  {
    q: "Where does my donation go?",
    a: "100% of donations made through this site go to NANOS, the New Zealand Aotearoa Neuro-Oncology Society, to support its work developing a national brain tumour registry. [Confirm: Raisely fees and who issues receipts.]",
  },
  {
    q: "Does Sam have brain cancer?",
    a: "No. Sam's cousin Georgie, who lives in the UK, has brain cancer. Her experience inspired the family to ask what they could do to help people affected by brain cancer here in New Zealand.",
  },
  {
    q: "Who are NANOS?",
    a: "A national society that brings together brain tumour clinicians, researchers, patients and patient support groups. It was launched in 2023 to improve brain tumour care and research in Aotearoa.",
  },
  {
    q: "What is a brain tumour registry?",
    a: "An organised collection of information that builds a clearer picture of a condition and the people affected by it. NANOS's registry aims to bring together information about brain tumours in New Zealand so it can be used for research and for understanding care.",
  },
  {
    q: "Doesn't New Zealand already collect cancer data?",
    a: "Yes. The registry builds on that foundation with more detailed information specific to brain tumours: tumour type, treatment, progress and, over time, people's experience.",
  },
  {
    q: "Will people's information be protected?",
    a: "Yes. The registry is being designed around privacy, informed consent and Māori data sovereignty. Anything shared publicly would be reports and summaries that protect people's identities, never individual records.",
  },
  { q: "Is my donation tax-deductible?", a: "[Confirm with NANOS.]" },
  {
    q: "Can I run with Sam?",
    a: "To keep everyone safe on the road, only a small number of people will join Sam on the run, by arrangement. If you'd like to be considered, get in touch. You can always cheer from the roadside.",
  },
] as const;

/* ─────────────────────────────────────────
   Socials and sponsors
───────────────────────────────────────── */

export const BBR_SOCIAL = [
  { platform: "instagram", handle: "@sams_bigbrainrun", href: "https://instagram.com/sams_bigbrainrun" },
  { platform: "facebook", handle: "@samsbigbrainrun", href: "https://www.facebook.com/profile.php?id=61574269924245" },
] as const;

export const BBR_SPONSORS = [
  { name: "Cactus", logoSrc: cactusLogo, link: "https://cactusoutdoor.co.nz" },
  { name: "Drymax", logoSrc: drymaxLogo, link: "https://shoeclinic.co.nz/accessories/drymax-socks" },
  { name: "Garmin", logoSrc: garminLogo, link: "https://garmin.com" },
  { name: "Icebreaker", logoSrc: icebreakerLogo, link: "https://ap.icebreaker.com/en-nz" },
  { name: "Mizuno", logoSrc: mizunoLogo, link: "https://nzl.mizuno.com" },
  { name: "Shoe Clinic", logoSrc: shoeClinicLogo, link: "https://shoeclinic.co.nz" },
  { name: "Volkswagen", logoSrc: vwLogo, link: "https://volkswagen.co.nz" },
  { name: "NeverSecond", logoSrc: neversecondLogo, link: "https://www.never2.co.nz/" },
  { name: "Southland", logoSrc: southlandLogo, link: "https://www.locatorbeacons.co.nz/" },
] as const;

/** Crew placeholders until names and photos are confirmed. */
export const BBR_CREW = [
  { name: "[Name]", role: "Director", bio: "[One line on who they are]" },
  { name: "[Name]", role: "Camera", bio: "[One line]" },
  { name: "[Name]", role: "Support driver", bio: "[One line]" },
  { name: "[Name]", role: "Physio", bio: "[One line]" },
] as const;
