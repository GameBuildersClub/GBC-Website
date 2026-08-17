import type { Metadata } from "next";
import projectsData from "../../data/projects";
import { GameDetailPage } from "../../components/SitePages";
import { JsonLd, OG_IMAGE, breadcrumbSchema, gameSchema } from "../../lib/seo";

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
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return (projectsData as Game[]).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = (projectsData as Game[]).find((g) => g.slug === slug);
  if (!game) return { title: "Game Not Found", robots: { index: false, follow: true } };
  const image = game.image ?? OG_IMAGE;
  const kindLabel = game.kind === "jam" ? "game jam project" : "long-term project";
  return {
    title: game.title,
    description: `${game.tagline} A ${kindLabel} by UGA Game Builders Club, ${game.semester}.`,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      url: `/games/${game.slug}`,
      title: `${game.title} | Game Builders Club`,
      description: game.tagline,
      type: "article",
      images: [{ url: image, alt: `${game.title} cover art` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | Game Builders Club`,
      description: game.tagline,
      images: [image],
    },
  };
}

export default async function GameDetail({ params }: Props) {
  const { slug } = await params;
  const game = (projectsData as Game[]).find((g) => g.slug === slug);
  return (
    <>
      <GameDetailPage slug={slug} />
      {game && (
        <>
          <JsonLd data={gameSchema(game)} />
          <JsonLd
            data={breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Games", path: "/games" },
              { name: game.title, path: `/games/${game.slug}` },
            ])}
          />
        </>
      )}
    </>
  );
}
