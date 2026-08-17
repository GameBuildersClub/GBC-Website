import projectsData from "../data/projects";

export const BASE_URL = "https://ugagbc.com";
export const SITE_NAME = "Game Builders Club";
export const SITE_DESC =
  "The University of Georgia's student-run game development club. We build games, run jams, and teach each other everything from code to art to music.";
export const OG_IMAGE = "/assets/og-default.jpg";
export const OG_IMAGE_W = 1200;
export const OG_IMAGE_H = 630;
export const FOUNDED = "2021";
export const CONTACT_EMAIL = "ugagbc@gmail.com";
export const SOCIAL_URLS = [
  "https://discord.gg/ZZU5xQbv8K",
  "https://www.instagram.com/gamebuildersclub/",
  "https://x.com/GameBuilderClub",
];

export const ORG_ID = `${BASE_URL}/#organization`;
export const SITE_ID = `${BASE_URL}/#website`;

/**
 * openGraph block for a static page. A page-level `openGraph` replaces the root
 * layout's rather than merging into it, so the default image has to be repeated
 * or the page unfurls with no graphic at all.
 */
export function pageOg(path: string, title: string, description: string) {
  return {
    url: path,
    title: `${title} | ${SITE_NAME}`,
    description,
    siteName: SITE_NAME,
    type: "website" as const,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: OG_IMAGE_W, height: OG_IMAGE_H, alt: `${SITE_NAME} — UGA` }],
  };
}

type Game = {
  slug: string;
  title: string;
  tagline: string;
  semester: string;
  semesters?: string[];
  kind: string;
  engine: string;
  genres: string[];
  image: string | null;
  team: number;
  itchUrl?: string;
  steamUrl?: string;
};

const ENGINE_NAMES: Record<string, string> = {
  godot: "Godot Engine",
  unity: "Unity",
  unreal: "Unreal Engine",
  custom: "Custom engine",
};

/** Renders a JSON-LD block. Server-only; the payload is serialised at build time. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped below so it cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "GBC",
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: `${BASE_URL}/assets/logo.svg` },
  image: `${BASE_URL}${OG_IMAGE}`,
  description: SITE_DESC,
  foundingDate: FOUNDED,
  email: CONTACT_EMAIL,
  sameAs: SOCIAL_URLS,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "University of Georgia",
    url: "https://www.uga.edu",
  },
  location: {
    "@type": "Place",
    name: "University of Georgia",
    address: { "@type": "PostalAddress", addressLocality: "Athens", addressRegion: "GA", addressCountry: "US" },
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: BASE_URL,
  name: SITE_NAME,
  description: SITE_DESC,
  inLanguage: "en-US",
  publisher: { "@id": ORG_ID },
};

/** Site-wide graph, emitted once from the root layout. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organizationSchema, websiteSchema],
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${BASE_URL}${t.path}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function gameSchema(game: Game) {
  const playUrl = game.steamUrl ?? game.itchUrl;
  return {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.tagline,
    url: `${BASE_URL}/games/${game.slug}`,
    ...(game.image ? { image: `${BASE_URL}${game.image}` } : {}),
    genre: game.genres,
    gamePlatform: game.itchUrl ? ["Web browser", "PC"] : ["PC"],
    applicationCategory: "Game",
    inLanguage: "en",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(ENGINE_NAMES[game.engine] ? { gameEngine: ENGINE_NAMES[game.engine] } : {}),
    ...(playUrl ? { sameAs: playUrl } : {}),
    isAccessibleForFree: true,
    ...(game.team > 0
      ? { contributor: { "@type": "Organization", name: `${SITE_NAME} team of ${game.team}` } }
      : {}),
  };
}

/** ItemList of every game, for the /games index. */
export function gamesListSchema() {
  const games = projectsData as Game[];
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Games | ${SITE_NAME}`,
    description: "Games built by University of Georgia Game Builders Club members.",
    url: `${BASE_URL}/games`,
    isPartOf: { "@id": SITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: games.length,
      itemListElement: games.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/games/${g.slug}`,
        name: g.title,
      })),
    },
  };
}
