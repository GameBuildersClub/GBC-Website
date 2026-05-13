import projectsData from "../../data/projects";
import { GameDetailPage } from "../../components/SitePages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return (projectsData as { slug: string }[]).map((g) => ({ slug: g.slug }));
}

export default async function GameDetail({ params }: Props) {
  const { slug } = await params;
  return <GameDetailPage slug={slug} />;
}
