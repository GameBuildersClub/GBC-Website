import type { Metadata } from "next";
import projectsData from "../../data/projects";
import { GameDetailPage } from "../../components/SitePages";

type Game = { slug: string; title: string; tagline: string; image: string | null };
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return (projectsData as Game[]).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const game = (projectsData as Game[]).find((g) => g.slug === slug);
  if (!game) return { title: "Game Not Found" };
  return {
    title: game.title,
    description: game.tagline,
    openGraph: {
      title: `${game.title} | Game Builders Club`,
      description: game.tagline,
      images: game.image ? [{ url: game.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${game.title} | Game Builders Club`,
      description: game.tagline,
      images: game.image ? [game.image] : [],
    },
  };
}

export default async function GameDetail({ params }: Props) {
  const { slug } = await params;
  return <GameDetailPage slug={slug} />;
}
