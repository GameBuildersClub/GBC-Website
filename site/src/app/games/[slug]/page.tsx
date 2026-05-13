"use client";

import { useParams } from "next/navigation";
import { GameDetailPage } from "../../components/SitePages";

export default function GameDetail() {
  const params = useParams<{ slug: string }>();
  return <GameDetailPage slug={params.slug} />;
}
