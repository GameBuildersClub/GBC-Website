import projectsData from "../data/projects";
import faqs from "../data/faqs";
import { BASE_URL, FOUNDED, SITE_DESC, SITE_NAME } from "../lib/seo";

// Generated from the same data the pages render, so it cannot drift as games are added.
export const dynamic = "force-static";

type Game = {
  slug: string;
  title: string;
  tagline: string;
  semester: string;
  semesters?: string[];
  kind: string;
  engine: string;
  genres: string[];
  itchUrl?: string;
  steamUrl?: string;
};

const ENGINE_NAMES: Record<string, string> = {
  godot: "Godot",
  unity: "Unity",
  unreal: "Unreal Engine",
  custom: "Other",
};

const semesterRank = (semester: string) => {
  const [season, yearText] = semester.split(" ");
  const year = Number(yearText) || 0;
  const seasonOffset = season === "Winter" ? 3 : season === "Fall" ? 2 : season === "Summer" ? 1 : 0;
  return year * 10 + seasonOffset;
};
const latest = (g: Game) => (g.semesters ?? [g.semester]).reduce((b, s) => (semesterRank(s) > semesterRank(b) ? s : b));

export async function GET() {
  const games = [...(projectsData as Game[])].sort(
    (a, b) => semesterRank(latest(b)) - semesterRank(latest(a)) || a.title.localeCompare(b.title),
  );

  const gameLines = games.map((g) => {
    const bits = [
      `${ENGINE_NAMES[g.engine] ?? g.engine}`,
      g.kind === "jam" ? "game jam" : "long-term project",
      latest(g),
      g.genres.slice(0, 3).join("/"),
    ].filter(Boolean);
    const play = g.steamUrl ? ` Play: ${g.steamUrl}` : g.itchUrl ? ` Play: ${g.itchUrl}` : "";
    return `- [${g.title}](${BASE_URL}/games/${g.slug}): ${g.tagline} (${bits.join(", ")}).${play}`;
  });

  const body = `# ${SITE_NAME}

> ${SITE_DESC}

Game Builders Club (GBC) is a free, student-run game development club at the University
of Georgia in Athens, Georgia, founded in ${FOUNDED}. Membership is free, there is no
application, and no prior experience is required. Members work as programmers, artists,
writers, and composers. The club meets weekly, runs game jams, and ships a set of games
each semester. Engines used include Godot, Unity, and Unreal Engine.

## Pages

- [Home](${BASE_URL}/): Club overview, recent releases, and how to join.
- [Games](${BASE_URL}/games): Searchable catalog of all ${games.length} club games, filterable by semester, engine, and play type.
- [About](${BASE_URL}/about): Club history, values, and the current officer board.
- [How It Works](${BASE_URL}/how-it-works): Joining, the semester timeline, meeting schedule, and what the club does.
- [FAQ](${BASE_URL}/frequently-asked-questions): Common questions about experience, commitment, engines, and fees.
- [Contact](${BASE_URL}/contact): Discord, Instagram, and email.

## Games (${games.length})

${gameLines.join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Contact

- Discord (primary hub): https://discord.gg/ZZU5xQbv8K
- Instagram: https://www.instagram.com/gamebuildersclub/
- Email: ugagbc@gmail.com
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
