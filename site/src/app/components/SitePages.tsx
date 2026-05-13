"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import projectsData from "../data/projects";

type IconName = "arrow-right" | "arrow-up-right" | "chevron-right" | "search" | "discord" | "instagram" | "youtube" | "twitter" | "github" | "itch" | "steam" | "mail" | "pin" | "clock" | "controller" | "sparkle" | "users" | "code" | "x" | "unreal" | "custom" | "menu" | "expand";
type Game = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  semester: string;
  semesters?: string[];
  kind: string;
  engine: string;
  genres: string[];
  image: string | null;
  gallery?: string[];
  featured?: boolean;
  team: number;
  itchUrl?: string;
  itchEmbedUrl?: string;
  steamUrl?: string;
  steamVideoUrl?: string;
  steamVideoThumb?: string;
};

const asset = (name: string) => `/assets/${name}`;

const GAMES = projectsData as Game[];
const semesterRank = (semester: string) => {
  const [season, yearText] = semester.split(" ");
  const year = Number(yearText) || 0;
  const seasonOffset = season === "Winter" ? 3 : season === "Fall" ? 2 : season === "Summer" ? 1 : 0;
  return year * 10 + seasonOffset;
};
const latestSemester = (game: Game) => {
  const sems = game.semesters ?? [game.semester];
  return sems.reduce((best, s) => semesterRank(s) > semesterRank(best) ? s : best);
};
const SORTED_GAMES = [...GAMES].sort((a, b) => semesterRank(latestSemester(b)) - semesterRank(latestSemester(a)) || a.title.localeCompare(b.title));

const ENGINES = [
  { id: "godot", label: "Godot", icon: asset("icon-godot.svg") },
  { id: "unity", label: "Unity", icon: asset("icon-unity.svg") },
  { id: "unreal", label: "Unreal", icon: null },
  { id: "custom", label: "Other", icon: null },
];
const SEMESTERS = ["Spring 2026", "Fall 2025", "Spring 2025", "Fall 2024", "Spring 2024", "Fall 2023", "Spring 2023"];
const PAGE_SIZES = [12, 24, 48];
const KINDS = [{ id: "semester", label: "Long-Term Project" }, { id: "jam", label: "Game Jam" }];
const PLAY_TYPES = [{ id: "web", label: "Play in Browser" }, { id: "downloadable", label: "Downloadable" }];
const STORES = [{ id: "itch", label: "itch.io" }, { id: "steam", label: "Steam" }];
const gamePlayTypes = (g: Game): string[] => {
  const t: string[] = [];
  if (g.itchEmbedUrl) t.push("web");
  if (g.steamUrl || (g.itchUrl && !g.itchEmbedUrl)) t.push("downloadable");
  return t;
};
const gameStores = (g: Game): string[] => {
  const s: string[] = [];
  if (g.itchUrl) s.push("itch");
  if (g.steamUrl) s.push("steam");
  return s;
};
const HERO_SLIDES = [
  { caption: "Fall 2025 Showcase", desc: "Members demoing their semester projects at the Fall 2025 GBC showcase.", image: asset("club-fall-2025-showcase.jpg") },
  { caption: "Fall 2023 Showcase", desc: "Members presenting long-term projects at the Fall 2023 showcase.", image: asset("club-fall-2023-showcase.png") },
  { caption: "Spring 2025 Decked Out Team", desc: "The team behind Decked Out, one of GBC's Spring 2025 projects.", image: asset("club-spring-2025-group.png") },
  { caption: "Original Founders of GBC", desc: "The students who founded GBC at UGA in 2021 and got the club off the ground.", image: asset("founders.jpg") },
];
const OFFICERS = [
  { name: "Rawson", initials: "R", role: "President" },
  { name: "Caleb", initials: "C", role: "Vice President" },
  { name: "David", initials: "D", role: "Projects Officer" },
  { name: "Cal", initials: "C", role: "Workshops Officer" },
  { name: "TBD", initials: "?", role: "Finance Officer" },
  { name: "Divesh", initials: "D", role: "Web Dev Officer" },
];
const MEETINGS = [{ day: "Wednesday", kind: "Workshop / Social / Project Work", time: "6:30 - 8:00 PM", location: "SLC 345 · Hybrid" }];
const CLUB_FOUNDED = 2021;
const CLUB_STATS: [IconName, string, string][] = [
  ["controller", "30+", "Games Built"],
  ["users", "200+", "Active Members"],
  ["code", `${new Date().getFullYear() - CLUB_FOUNDED}`, "Years Running"],
];
const STEPS = [{ num: "01", title: "Join the Discord", body: "The fastest way in. Project channels, voice rooms, jam announcements all live there." }, { num: "02", title: "Week 1 is intro night", body: "Come meet the club, learn how the semester works, and get familiar with the project process." }, { num: "03", title: "Week 2 is pitch night", body: "Project leads pitch their game ideas, then members pick preferences through a Google Form." }, { num: "04", title: "Week 3 is team announcements", body: "Teams are announced based on what people selected, then project work days begin." }];
const FAQS = [
  { q: "Do I need programming experience to join?", a: "No programming experience is necessary. About a third of our members are artists, writers, or musicians. We need every one of those skills on a typical project." },
  { q: "I want to lead my own game project. Where do I start?", a: "Talk to the Projects Officer at a Wednesday meetup, or DM them on Discord. Pitches usually happen during the second week of club - all you need is a Game Design Documentation (GDD) and a presentation." },
  { q: "What game engines are used?", a: "We have used Godot, Unity, and Unreal Engine to create games. However, game engine usage is not limited to these three as it is up to a team leader's discretion." },
  { q: "Is there a deadline to join club projects?", a: "Project interest is collected through a Google Form after week 2 pitches, and teams are announced in week 3 based on what people picked. Members can also join long-term project teams midway through the semester when a project has room." },
  { q: "How big of a commitment are the projects?", a: "Whatever you put in. Project teams set their own pace - most meet weekly for a couple hours, plus async work in Discord." },
  { q: "Is there a fee?", a: "No dues, no application fee, no semester fee." },
];
const SOCIALS = [
  { id: "discord", label: "Discord", handle: "Join the server — primary hub", href: "https://discord.gg/ZZU5xQbv8K" },
  { id: "instagram", label: "Instagram", handle: "@gamebuildersclub", href: "https://www.instagram.com/gamebuildersclub/" },
  { id: "twitter", label: "X / Twitter", handle: "@GameBuilderClub", href: "https://x.com/GameBuilderClub" },
];

function Icon({ name, size = 18, stroke = 2 }: { name: IconName; size?: number; stroke?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (name === "discord") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>;
  if (name === "twitter") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
  if (["github", "itch", "steam", "unreal"].includes(name)) return <span className="icon-text-fallback" style={{ fontSize: size * 0.6 }}>{name === "github" ? "GH" : name === "itch" ? "io" : name === "steam" ? "ST" : "UE"}</span>;
  const paths: Partial<Record<IconName, ReactNode>> = {
    "arrow-right": <><path d="M5 12h14" /><path d="M13 5l7 7-7 7" /></>,
    "arrow-up-right": <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    "chevron-right": <path d="m9 6 6 6-6 6" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" /></>,
    youtube: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3z" fill="currentColor" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    pin: <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    controller: <><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 12h4M8 10v4M15 11h.01M17 13h.01" /></>,
    sparkle: <path d="M12 2v6M12 16v6M2 12h6M16 12h6" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
    x: <path d="M4 4 20 20M20 4 4 20" />,
    expand: <><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></>,
    custom: <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [{ href: "/", label: "Home" }, { href: "/games", label: "Games" }, { href: "/about", label: "About Us" }, { href: "/how-it-works", label: "How it Works" }, { href: "/frequently-asked-questions", label: "FAQ" }, { href: "/contact", label: "Contact" }];
  return <nav className="nav"><div className="nav-inner"><Link href="/" className="nav-brand"><Image src={asset("logo.svg")} alt="GBC" width={40} height={40} /><span>Game Builders Club</span></Link><div className="nav-links">{links.map((l) => <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? "active" : ""}`}>{l.label}</Link>)}</div><div className="nav-socials"><a href="https://x.com/GameBuilderClub" className="nav-social" aria-label="X / Twitter"><Icon name="twitter" size={20} /></a><a href="https://www.instagram.com/gamebuildersclub/" className="nav-social" aria-label="Instagram"><Icon name="instagram" size={22} /></a><a href="https://discord.gg/ZZU5xQbv8K" className="nav-social" aria-label="Discord"><Icon name="discord" size={22} /></a><button type="button" className="nav-hamburger" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Icon name="menu" size={22} /></button></div></div>{menuOpen && <div className="nav-mobile-overlay" onClick={() => setMenuOpen(false)}><div className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}><div className="nav-mobile-head"><Link href="/" className="nav-brand" onClick={() => setMenuOpen(false)}><Image src={asset("logo.svg")} alt="GBC" width={40} height={40} /><span>Game Builders Club</span></Link><button type="button" className="nav-mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><Icon name="x" size={20} /></button></div><div className="nav-mobile-links">{links.map((l) => <Link key={l.href} href={l.href} className={`nav-mobile-link ${pathname === l.href ? "active" : ""}`} onClick={() => setMenuOpen(false)}>{l.label}</Link>)}</div><div className="nav-mobile-socials"><a href="https://x.com/GameBuilderClub" aria-label="X / Twitter"><Icon name="twitter" size={20} /></a><a href="https://www.instagram.com/gamebuildersclub/" aria-label="Instagram"><Icon name="instagram" size={22} /></a><a href="https://discord.gg/ZZU5xQbv8K" aria-label="Discord"><Icon name="discord" size={22} /></a></div></div></div>}</nav>;
}

function Footer() {
  return <footer className="footer"><div className="footer-inner"><div><div className="footer-brand-row"><Image src={asset("logo.svg")} alt="GBC" width={40} height={40} /><div><strong>Game Builders Club</strong><br /><span>University of Georgia · est. 2021</span></div></div><p>A student-run club for making games at UGA. Designers, programmers, artists, writers and musicians, all welcome.</p></div><FooterLinks title="Site" links={[["Home", "/"], ["Games", "/games"], ["About Us", "/about"], ["How it Works", "/how-it-works"], ["FAQ", "/frequently-asked-questions"], ["Contact", "/contact"]]} /><FooterLinks title="Find Us" links={[["Discord", "https://discord.gg/ZZU5xQbv8K"], ["Instagram", "https://www.instagram.com/gamebuildersclub/"], ["X / Twitter", "https://x.com/GameBuilderClub"]]} /></div><div className="footer-bottom"><span>© 2026 Game Builders Club · University of Georgia · Built by members, for members.</span><div className="footer-socials"><a href="https://discord.gg/ZZU5xQbv8K" aria-label="Discord"><Icon name="discord" size={16} /></a><a href="https://www.instagram.com/gamebuildersclub/" aria-label="Instagram"><Icon name="instagram" size={16} /></a><a href="https://x.com/GameBuilderClub" aria-label="X / Twitter"><Icon name="twitter" size={16} /></a></div></div></footer>;
}

function FooterLinks({ title, links }: { title: string; links: string[][] }) {
  return <div><h5>{title}</h5><div className="footer-links">{links.map(([label, href]) => href.startsWith("/") ? <Link key={label} href={href}>{label}</Link> : <a key={label} href={href}>{label}</a>)}</div></div>;
}

function GameArt({ game }: { game: Game }) {
  if (game.image) return <div className="game-card-image"><Image src={game.image} alt={game.title} fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} /></div>;
  return <div className="game-card-image placeholder-art"><span className="label">{game.title}</span></div>;
}

function EngineIcon({ engine, size = 24 }: { engine: string; size?: number }) {
  const e = ENGINES.find((x) => x.id === engine);
  if (!e) return null;
  if (e.icon) return <div className="engine-logo"><Image src={e.icon} alt={e.label} title={e.label} width={size} height={size} style={{ width: "auto", height: "auto" }} /></div>;
  return <div className="engine-logo-fallback" title={e.label}>{engine === "unreal" ? "UE" : "<>"}</div>;
}

function GameCard({ game }: { game: Game }) {
  return <Link href={`/games/${game.slug}`} className="game-card"><GameArt game={game} /><div className="game-card-row"><div className="game-card-title">{game.title}</div><span className={`semester-badge${game.semesters && game.semesters.length > 1 ? " semester-badge-range" : ""}`}>{game.semester}</span></div><p className="game-card-desc">{game.tagline}</p><div className="game-tags">{game.genres.slice(0, 5).map((t) => <span key={t} className="tag-chip">{t}</span>)}{game.genres.length > 5 && <span className="tag-chip tag-chip-overflow">+{game.genres.length - 5}</span>}<div className="game-card-engine"><EngineIcon engine={game.engine} size={18} /></div></div></Link>;
}

function PageShell({ children }: { children: ReactNode }) {
  return <div className="app"><Nav />{children}<Footer /></div>;
}

export function HomePage() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused]);
  const recent = SORTED_GAMES.slice(0, 4);
  return <PageShell><main className="page-enter"><section className="hero-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>{HERO_SLIDES.map((s, i) => <div key={s.caption} className={`hero-slide ${i === slide ? "active" : ""}`}><div className="hero-slide-bg"><Image src={s.image} alt={s.caption} fill sizes="100vw" priority={i === 0} style={{ objectFit: "cover" }} /></div></div>)}<div className="hero-content"><div className="hero-year-tag fade-up">EST · 2021 · UGA</div><h1 className="hero-club-name fade-up"><span className="hero-word">Game</span><span className="hero-word hero-word-shift">Builders</span><span className="hero-word hero-word-last">Club</span></h1><p className="hero-tagline fade-up fade-up-1"><em>Building games together at the University of Georgia.</em></p><div className="hero-actions"><Link href="/how-it-works" className="btn btn-lg"><Icon name="users" size={20} /> Join the club</Link><Link href="/games" className="btn btn-lg hero-secondary">See our games <Icon name="arrow-right" size={18} /></Link></div></div><div className="hero-indicator">{HERO_SLIDES.map((_, i) => <button type="button" key={i} className={i === slide ? "active" : ""} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} aria-current={i === slide} />)}</div></section><Marquee /><AboutPreview /><Stats /><RecentGames games={recent} /></main></PageShell>;
}

function Marquee() {
  const items = ["Shipping games", "Pixel pushing", "Bug squashing", "Jamming", "Prototyping", "Composing", "Drawing sprites", "Playtesting", "Since 2021"];
  const loop = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {loop.map((t, i) => <span key={i} className="marquee-item">{t}<span className="marquee-dot">◆</span></span>)}
      </div>
    </div>
  );
}

function AboutPreview() {
  return <section className="section section-cream"><div className="container"><div className="about-block"><div className="about-text-wrap"><h2 className="about-title">About Us</h2><div className="about-panel"><p>Since 2021, the University of Georgia&apos;s Game Builders Club has been dedicated to helping students learn all there is to know about video game design. GBC is centered primarily around video game programming, art, music, and theory, and requires <strong>NO prior experience</strong> with any of these to participate.</p><p>Whether you are interested in building games, composing music, modeling props, drawing sprites, or if you just love video games, you have come to the right place!</p><div className="about-panel-cta"><Link href="/about" className="btn about-panel-button">More about the club <Icon name="arrow-right" size={16} /></Link></div></div></div><div><div className="about-photo about-photo-founders" /><div className="about-photo-caption">Original Founders of GBC</div></div></div></div></section>;
}

function Stats() {
  return <section className="stats-band"><div className="container"><div className="stats">{CLUB_STATS.map(([icon, n, l]) => <div className="stat" key={l}><div className="stat-icon"><Icon name={icon} size={32} /></div><div className="stat-number">{n}</div><div className="stat-label">{l}</div></div>)}</div></div></section>;
}

function RecentGames({ games }: { games: Game[] }) {
  const kicker = games.length > 0 ? latestSemester(games[0]) : "";
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const updateNav = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 16);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };
  useEffect(() => { updateNav(); window.addEventListener("resize", updateNav); return () => window.removeEventListener("resize", updateNav); }, []);
  const scroll = (dir: number) => { const el = trackRef.current; if (!el) return; el.scrollBy({ left: dir * 320, behavior: "smooth" }); };
  return (
    <section className="section section-cream"><div className="container"><div className="section-head"><div><div className="section-kicker">{kicker}</div><h2 className="section-title dark">Latest releases</h2></div><Link href="/games" className="btn btn-ghost">All games <Icon name="arrow-right" size={16} /></Link></div><div className="recent-carousel"><button type="button" className={`recent-arrow recent-arrow-prev${canPrev ? "" : " disabled"}`} aria-label="Previous" onClick={() => scroll(-1)}><Icon name="chevron-right" size={18} /></button><div className="recent-games-row" ref={trackRef} onScroll={updateNav}>{games.map((g) => <GameCard key={g.id} game={g} />)}</div><button type="button" className={`recent-arrow${canNext ? "" : " disabled"}`} aria-label="Next" onClick={() => scroll(1)}><Icon name="chevron-right" size={18} /></button></div></div></section>
  );
}

function BottomCta() {
  return <section className="bottom-cta-wrap"><div className="container"><div className="bottom-cta"><div><div className="bottom-cta-kicker">Get involved</div><h2>No experience? <span>Perfect.</span><br />Most of us started here</h2><p>Hop in our Discord, come to a Wednesday meeting, or just lurk for a week.</p></div><div className="bottom-cta-actions"><a href="https://discord.gg/ZZU5xQbv8K" className="btn btn-discord btn-lg"><Icon name="discord" size={20} /> Join Discord</a><Link href="/how-it-works" className="btn btn-lg bottom-cta-secondary">How it works <Icon name="arrow-right" size={18} /></Link></div></div></div></section>;
}

type SortOrder = "recent" | "oldest" | "az" | "za";
const SORT_OPTIONS: { id: SortOrder; label: string }[] = [
  { id: "recent", label: "Recent" },
  { id: "oldest", label: "Oldest" },
  { id: "az", label: "A → Z" },
  { id: "za", label: "Z → A" },
];

export function GamesPage() {
  const [search, setSearch] = useState("");
  const [engines, setEngines] = useState(new Set<string>());
  const [semesters, setSemesters] = useState(new Set<string>());
  const [kinds, setKinds] = useState(new Set<string>());
  const [playTypes, setPlayTypes] = useState(new Set<string>());
  const [stores, setStores] = useState(new Set<string>());
  const [sort, setSort] = useState<SortOrder>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [desktopFiltersOpen, setDesktopFiltersOpen] = useState(true);
  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, val: string) => { const next = new Set(set); if (next.has(val)) { next.delete(val); } else { next.add(val); } setter(next); setPage(1); };
  const matchesSearch = (g: Game, term: string) => {
    if (!term) return true;
    const haystack = `${g.title} ${g.tagline} ${g.genres.join(" ")}`.toLowerCase();
    const keywords = term.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean);
    return keywords.length === 0 || keywords.every((k) => haystack.includes(k));
  };
  const filtered = useMemo(() => {
    const base = SORTED_GAMES.filter((g) =>
      (!engines.size || engines.has(g.engine)) &&
      (!semesters.size || (g.semesters ?? [g.semester]).some((s) => semesters.has(s))) &&
      (!kinds.size || kinds.has(g.kind)) &&
      (!playTypes.size || gamePlayTypes(g).some((t) => playTypes.has(t))) &&
      (!stores.size || gameStores(g).some((s) => stores.has(s))) &&
      matchesSearch(g, search)
    );
    if (sort === "oldest") return [...base].sort((a, b) => semesterRank(latestSemester(a)) - semesterRank(latestSemester(b)) || a.title.localeCompare(b.title));
    if (sort === "az") return [...base].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") return [...base].sort((a, b) => b.title.localeCompare(a.title));
    return base;
  }, [search, engines, semesters, kinds, playTypes, stores, sort]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const filterCount = engines.size + semesters.size + kinds.size + playTypes.size + stores.size + (search ? 1 : 0);
  const withoutEngine = useMemo(() => SORTED_GAMES.filter((g) => (!semesters.size || (g.semesters ?? [g.semester]).some((s) => semesters.has(s))) && (!kinds.size || kinds.has(g.kind)) && (!playTypes.size || gamePlayTypes(g).some((t) => playTypes.has(t))) && (!stores.size || gameStores(g).some((s) => stores.has(s))) && matchesSearch(g, search)), [semesters, kinds, playTypes, stores, search]);
  const withoutSemester = useMemo(() => SORTED_GAMES.filter((g) => (!engines.size || engines.has(g.engine)) && (!kinds.size || kinds.has(g.kind)) && (!playTypes.size || gamePlayTypes(g).some((t) => playTypes.has(t))) && (!stores.size || gameStores(g).some((s) => stores.has(s))) && matchesSearch(g, search)), [engines, kinds, playTypes, stores, search]);
  const withoutKind = useMemo(() => SORTED_GAMES.filter((g) => (!engines.size || engines.has(g.engine)) && (!semesters.size || (g.semesters ?? [g.semester]).some((s) => semesters.has(s))) && (!playTypes.size || gamePlayTypes(g).some((t) => playTypes.has(t))) && (!stores.size || gameStores(g).some((s) => stores.has(s))) && matchesSearch(g, search)), [engines, semesters, playTypes, stores, search]);
  const withoutPlayType = useMemo(() => SORTED_GAMES.filter((g) => (!engines.size || engines.has(g.engine)) && (!semesters.size || (g.semesters ?? [g.semester]).some((s) => semesters.has(s))) && (!kinds.size || kinds.has(g.kind)) && (!stores.size || gameStores(g).some((s) => stores.has(s))) && matchesSearch(g, search)), [engines, semesters, kinds, stores, search]);
  const withoutStore = useMemo(() => SORTED_GAMES.filter((g) => (!engines.size || engines.has(g.engine)) && (!semesters.size || (g.semesters ?? [g.semester]).some((s) => semesters.has(s))) && (!kinds.size || kinds.has(g.kind)) && (!playTypes.size || gamePlayTypes(g).some((t) => playTypes.has(t))) && matchesSearch(g, search)), [engines, semesters, kinds, playTypes, search]);
  const hasFilters = filterCount > 0;
  const reset = () => { setSearch(""); setEngines(new Set()); setSemesters(new Set()); setKinds(new Set()); setPlayTypes(new Set()); setStores(new Set()); setPage(1); };
  return (
    <PageShell>
      <main className={`page-enter games-layout${!desktopFiltersOpen ? " desktop-filters-closed" : ""}`}>
        {filtersOpen && <div className="sidebar-overlay" onClick={() => setFiltersOpen(false)} />}
        <aside className={`games-sidebar${filtersOpen ? " sidebar-open" : ""}`}>
          <div className="sidebar-head">
            <h3>FILTERS</h3>
            <button type="button" className="sidebar-close" aria-label="Close filters" onClick={() => { setFiltersOpen(false); setDesktopFiltersOpen(false); }}><Icon name="x" size={18} /></button>
          </div>
          <div className="sidebar-body">
            <FilterGroup title="Game Engine" items={ENGINES.map((e) => ({ id: e.id, label: e.label, count: withoutEngine.filter((g) => g.engine === e.id).length, icon: e.icon }))} active={engines} onToggle={(v) => toggle(engines, setEngines, v)} />
            <hr className="filter-divider" />
            <FilterGroup title="Semester" items={SEMESTERS.map((s) => ({ id: s, label: s, count: withoutSemester.filter((g) => (g.semesters ?? [g.semester]).includes(s)).length }))} active={semesters} onToggle={(v) => toggle(semesters, setSemesters, v)} />
            <hr className="filter-divider" />
            <FilterGroup title="Format" items={KINDS.map((k) => ({ id: k.id, label: k.label, count: withoutKind.filter((g) => g.kind === k.id).length }))} active={kinds} onToggle={(v) => toggle(kinds, setKinds, v)} />
            <hr className="filter-divider" />
            <FilterGroup title="Play Type" items={PLAY_TYPES.map((t) => ({ id: t.id, label: t.label, count: withoutPlayType.filter((g) => gamePlayTypes(g).includes(t.id)).length }))} active={playTypes} onToggle={(v) => toggle(playTypes, setPlayTypes, v)} />
            <hr className="filter-divider" />
            <FilterGroup title="Store" items={STORES.map((s) => ({ id: s.id, label: s.label, count: withoutStore.filter((g) => gameStores(g).includes(s.id)).length }))} active={stores} onToggle={(v) => toggle(stores, setStores, v)} />
            {hasFilters && <button type="button" onClick={reset} className="clear-filters"><Icon name="x" size={14} /> Clear all</button>}
          </div>
        </aside>
        <section className="games-main">
          <div className="games-top">
            <div>
              {!desktopFiltersOpen && (
                <button type="button" className="filters-trigger filters-trigger-desktop" aria-expanded={desktopFiltersOpen} onClick={() => { setFiltersOpen(true); setDesktopFiltersOpen(true); }}>
                  <Icon name="menu" size={15} /> Show Filters{filterCount > 0 && <span className="filter-count-badge">{filterCount}</span>}
                </button>
              )}
              <div className="games-title-block"><div className="section-kicker">The catalog</div><h1>Games</h1><p>Browse club projects, jams, and long-term games by semester, engine, and play type.</p></div>
            </div>
            <div className="games-top-right">
              <button type="button" className="filters-trigger mobile-trigger" aria-expanded={filtersOpen} onClick={() => setFiltersOpen(true)}>
                <Icon name="menu" size={15} /> Filters{filterCount > 0 && <span className="filter-count-badge">{filterCount}</span>}
              </button>
              <div className="search-bar"><Icon name="search" size={20} /><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search — use commas to combine" aria-label="Search games" />{search && <button type="button" onClick={() => { setSearch(""); setPage(1); }} aria-label="Clear search"><Icon name="x" size={16} /></button>}</div>
            </div>
          </div>
          <div className="results-meta">
            <span>{filtered.length === 0 ? "No games found" : `Showing ${Math.min((page - 1) * pageSize + 1, filtered.length)}–${Math.min(page * pageSize, filtered.length)} of ${filtered.length}`}</span>
            <div className="results-meta-right">
              <span>Sort</span>{SORT_OPTIONS.map((o) => <button type="button" key={o.id} className={`page-size-btn ${sort === o.id ? "active" : ""}`} onClick={() => { setSort(o.id); setPage(1); }}>{o.label}</button>)}
              <span className="results-divider" />
              <span>Per page</span>{PAGE_SIZES.map((n) => <button type="button" key={n} className={`page-size-btn ${pageSize === n ? "active" : ""}`} onClick={() => { setPageSize(n); setPage(1); }}>{n}</button>)}
            </div>
          </div>
          {filtered.length ? <>
            <div className="games-grid games-grid-animated">{paginated.map((g, i) => <div key={g.id} className={`game-card-entry delay-${Math.min(Math.floor(i / 2), 8)}`}><GameCard game={g} /></div>)}</div>
            {totalPages > 1 && <div className="pagination"><button type="button" className="pagination-btn" aria-label="Previous page" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><Icon name="chevron-right" size={16} /></button>{Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => <button type="button" key={n} aria-label={`Page ${n}`} className={`pagination-btn ${n === page ? "active" : ""}`} onClick={() => setPage(n)}>{n}</button>)}<button type="button" className="pagination-btn" aria-label="Next page" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><Icon name="chevron-right" size={16} /></button></div>}
          </> : <div className="empty-state"><div><Icon name="controller" size={28} /></div><h3>No games match those filters.</h3><p>Try clearing them, or check back next semester.</p><button type="button" onClick={reset} className="btn">Reset filters</button></div>}
        </section>
      </main>
    </PageShell>
  );
}

function SteamVideo({ videoUrl, thumb, steamUrl }: { videoUrl: string; thumb?: string; steamUrl: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let hls: import("hls.js").default | null = null;
    import("hls.js").then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(el);
        hls.on(Hls.Events.MANIFEST_PARSED, () => el.play().catch(() => { }));
      } else if (el.canPlayType("application/vnd.apple.mpegurl")) {
        el.src = videoUrl;
        el.play().catch(() => { });
      }
    });
    return () => { hls?.destroy(); };
  }, [videoUrl]);
  return (
    <div className="steam-video-wrap">
      <video ref={ref} controls muted playsInline className="steam-video" poster={thumb} />
      <a href={steamUrl} target="_blank" rel="noreferrer" className="steam-video-link">Open on Steam</a>
    </div>
  );
}

function GameEmbed({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const fullscreen = () => frameRef.current?.requestFullscreen();
  return (
    <section className="game-embed-section">
      <div className="game-embed-header">
        <h2>Play in browser</h2>
        {playing && <button type="button" className="embed-fullscreen-btn" onClick={fullscreen} aria-label="Fullscreen"><Icon name="expand" size={16} />Fullscreen</button>}
      </div>
      <div className="game-embed-frame" ref={frameRef}>
        {playing
          ? <iframe src={url} title={`${title} — play in browser`} sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups allow-forms" allow="autoplay; fullscreen *; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated; web-share" allowFullScreen />
          : <div className="game-embed-placeholder"><button type="button" className="play-in-browser-btn" onClick={() => setPlaying(true)}><Icon name="controller" size={22} />Play in browser</button></div>}
      </div>
    </section>
  );
}

export function GameDetailPage({ slug }: { slug: string }) {
  const game = GAMES.find((g) => g.slug === slug);
  const [active, setActive] = useState(0);
  if (!game) return <PageShell><main className="page-enter"><section className="section"><div className="container empty-state"><div><Icon name="controller" size={28} /></div><h3>Game not found.</h3><p>That project is not in the catalog.</p><Link href="/games" className="btn">Back to games</Link></div></section></main></PageShell>;
  const gallery = game.gallery?.length ? game.gallery : game.image ? [game.image] : [];
  const hasVideo = !!game.steamVideoUrl;
  const totalSlides = (hasVideo ? 1 : 0) + gallery.length;
  const isVideoActive = hasVideo && active === 0;
  const imageIndex = hasVideo ? active - 1 : active;
  const activeImage = !isVideoActive ? (gallery[imageIndex] ?? null) : null;
  const prev = () => setActive((a) => (a - 1 + totalSlides) % totalSlides);
  const next = () => setActive((a) => (a + 1) % totalSlides);
  return (
    <PageShell>
      <main className="page-enter">
        <section className="game-detail-wrap">
          <div className="container">
            <Link href="/games" className="back-link"><Icon name="chevron-right" size={14} /> Games</Link>
            <h1 className="game-detail-title">{game.title}</h1>
            <div className="game-detail-grid">
              <div>
                <div className="gallery-carousel">
                  <div className="game-detail-cover">
                    {isVideoActive
                      ? <SteamVideo videoUrl={game.steamVideoUrl!} thumb={game.steamVideoThumb} steamUrl={game.steamUrl!} />
                      : activeImage
                        ? <div key={activeImage} className="game-detail-cover-image"><Image src={activeImage} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" style={{ objectFit: "cover" }} /></div>
                        : <div className="game-detail-cover-empty"><span>{game.title}</span></div>}
                  </div>
                  {totalSlides > 1 && <>
                    <button type="button" className="gallery-arrow gallery-arrow-prev" aria-label="Previous" onClick={prev}><Icon name="chevron-right" size={20} stroke={2.5} /></button>
                    <button type="button" className="gallery-arrow gallery-arrow-next" aria-label="Next" onClick={next}><Icon name="chevron-right" size={20} stroke={2.5} /></button>
                  </>}
                </div>
                {totalSlides > 1 && (
                  <div className="gallery-thumb-strip">
                    {hasVideo && (
                      <button type="button" className={`gallery-thumb gallery-thumb-video ${active === 0 ? "active" : ""}`} onClick={() => setActive(0)} aria-label="Watch trailer">
                        {game.steamVideoThumb && <Image src={game.steamVideoThumb} alt="Trailer" fill className="steam-video-thumb" />}
                        <span className="gallery-thumb-play-icon">▶</span>
                      </button>
                    )}
                    {gallery.map((image, i) => {
                      const slideIndex = hasVideo ? i + 1 : i;
                      return <button type="button" key={image} className={`gallery-thumb ${active === slideIndex ? "active" : ""}`} onClick={() => setActive(slideIndex)} aria-label={`Screenshot ${i + 1}`}><Image src={image} alt="" fill sizes="120px" style={{ objectFit: "cover" }} aria-hidden /></button>;
                    })}
                  </div>
                )}
              </div>
              <aside className="game-detail-side">
                {game.image && <div className="game-detail-poster"><Image src={game.image} alt={game.title} fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></div>}
                <p>{game.tagline}</p>
                <div className="game-store-actions">
                  {game.itchUrl && <a className="store-badge-itch" href={game.itchUrl} target="_blank" rel="noreferrer" title="Available on itch.io"><Image src="https://static.itch.io/images/badge-color.svg" alt="Available on itch.io" width={146} height={54} /></a>}
                  {game.steamUrl && <a className="store-badge-steam" href={game.steamUrl} target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.252 0-2.265-1.014-2.265-2.265z" /></svg><span><small>Available on</small>Steam</span></a>}
                </div>
              </aside>
            </div>
            {game.itchEmbedUrl && <GameEmbed url={game.itchEmbedUrl} title={game.title} />}
            <div className="game-detail-info">
              <section><h2>Team</h2><p>{game.team > 0 ? `${game.team} club members` : "Team info unavailable"}</p></section>
              <section><h2>Genres</h2><div className="game-tags">{game.genres.map((genre) => <span key={genre} className="tag-chip">{genre}</span>)}</div></section>
              <section><h2>Details</h2><div className="gp-meta"><div className="gp-meta-row"><span>Semester{(game.semesters?.length ?? 1) > 1 ? "s" : ""}</span><span>{(game.semesters ?? [game.semester]).join(", ")}</span></div><div className="gp-meta-row"><span>Format</span><span>{KINDS.find((k) => k.id === game.kind)?.label ?? game.kind}</span></div><div className="gp-meta-row"><span>Engine</span><span>{ENGINES.find((e) => e.id === game.engine)?.label ?? game.engine}</span></div></div></section>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function FilterGroup({ title, items, active, onToggle }: { title: string; items: { id: string; label: string; count: number; icon?: string | null }[]; active: Set<string>; onToggle: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  return <div className="filter-group"><button className={`filter-group-head ${open ? "open" : ""}`} onClick={() => setOpen(!open)}><span className="arrow"><Icon name="chevron-right" size={12} stroke={3} /></span>{title}</button>{open && <div className="filter-options">{items.filter((i) => i.count > 0).map((i) => <button key={i.id} className={`filter-option ${active.has(i.id) ? "active" : ""}`} onClick={() => onToggle(i.id)}>{i.icon && <span className="filter-icon"><Image src={i.icon} alt="" width={16} height={16} /></span>}<span className="label">{i.label}</span><span className="badge">{i.count}</span></button>)}</div>}</div>;
}

export function AboutPage() {
  return <PageShell><main className="page-enter standard-page"><PhotoHero kicker="About the Club" title="We make games together" /><section className="section"><div className="container"><div className="about-block"><div className="about-text-wrap story-copy"><h2 className="about-title">Our Story</h2><p>Game Builders Club was founded in 2021 by a handful of UGA students who wanted to make games and couldn't wait for industry jobs to do it. Five years later we're still small enough that everyone knows everyone, and big enough to pull off ambitious projects.</p><p>We meet once a week, run jams, and ship a class of games every semester. No competitive selection - if you want to make games, you belong here.</p><Link href="/how-it-works" className="btn">How to join <Icon name="arrow-right" size={16} /></Link></div><div><div className="about-photo story-photo"><Image src={asset("founders.jpg")} alt="Original Founders of GBC" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover" }} /></div><div className="about-photo-caption">Original Founders of GBC</div></div></div></div></section><Values /><Officers /><section className="red-stats"><div className="container">{CLUB_STATS.map(([, n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}</div></section></main></PageShell>;
}

function PhotoHero({ kicker, title, body }: { kicker: string; title: string; body?: string }) {
  return <section className="photo-hero"><div className="photo-hero-bg"><Image src={asset("showcase.jpg")} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} priority /></div><div className="container"><div className="section-kicker">{kicker}</div><h1>{title}</h1>{body && <p>{body}</p>}</div></section>;
}

function Values() {
  return <section className="values-band"><div className="container"><div className="section-kicker">What we value</div><h2 className="section-title">What GBC is built on</h2><div className="value-grid">{[["01", "Ship something", "We focus on finishing. Smaller scope, real game, something you can actually show people."], ["02", "Cross-discipline", "Games need more than code. We connect programmers, artists, writers, and composers from the start."], ["03", "Open to everyone", "Never made a game before? That’s fine. Everyone starts somewhere, and we make sure you’re not starting alone."]].map(([n, t, b]) => <div className="value-card" key={n}><strong>{n}</strong><h3>{t}</h3><p>{b}</p></div>)}</div></div></section>;
}

function Officers() {
  return <section className="section"><div className="container"><div className="section-kicker">Leadership</div><h2 className="section-title">The 2026-27 board</h2><div className="officer-grid">{OFFICERS.map((o) => <div className="officer-card" key={o.role}><div>{o.initials}</div><section><h5>{o.name}</h5><p>{o.role}</p></section></div>)}</div></div></section>;
}

export function HowPage() {
  return <PageShell><main className="page-enter standard-page"><PhotoHero kicker="How it Works" title="How GBC works" body="Membership is free. No application. Most members are on a team within their first three weeks." /><section className="section"><div className="container"><div className="section-kicker">Getting started</div><h2 className="section-title dark">How to get involved</h2><div className="steps-list">{STEPS.map((s) => <div key={s.num} className="step-card"><div className="num">{s.num}</div><h4>{s.title}</h4><p>{s.body}</p></div>)}</div><div className="join-actions"><a href="https://discord.gg/ZZU5xQbv8K" className="btn btn-discord btn-lg"><Icon name="discord" size={20} /> Join Discord</a></div></div></section><Meetings /><WhatWeDo /><BottomCta /></main></PageShell>;
}

function Meetings() {
  return <section className="meetings-band"><div className="container"><div className="section-kicker">Schedule · Spring 2026</div><h2 className="section-title dark">Meeting Information</h2><div className="meeting-grid">{MEETINGS.map((m) => <div key={m.kind} className="meeting-card"><div className="kind">{m.kind}</div><div className="day">{m.day}</div><div className="time"><Icon name="clock" size={14} /> {m.time}</div><div className="location"><Icon name="pin" size={14} /> {m.location}</div></div>)}</div></div></section>;
}

function WhatWeDo() {
  return <section className="section"><div className="container"><div className="section-kicker">What we do</div><h2 className="section-title dark">What we do each semester</h2><div className="value-grid">{[["controller", "Long-Term Projects", "Teams of 4-8 build larger games across a semester or longer timeline. We pair leads with newcomers."], ["sparkle", "Game Jams", "A weekend of caffeine, pixel art and last-minute scope cuts. We run 3 per year."], ["code", "Workshops", "Bring-a-laptop sessions: shaders, level design, music for games, marketing on itch."]].map(([i, t, b]) => <div className="simple-card" key={t}><div><Icon name={i as IconName} size={22} /></div><h3>{t}</h3><p>{b}</p></div>)}</div></div></section>;
}

export function FaqPage() {
  const [open, setOpen] = useState(0);
  return <PageShell><main className="page-enter standard-page"><PhotoHero kicker="FAQ" title="Frequently Asked Questions" body="Have a question about our club? Here are the most frequent ones - if yours isn&apos;t here, ping us on Discord or via the contact page." /><section className="section faq-section"><div className="faq-list"><h2 className="section-title dark" style={{ marginBottom: "32px" }}>Questions</h2>{FAQS.map((item, i) => { const isOpen = open === i; return <div key={item.q} className={`faq-item ${isOpen ? "open" : ""}`}><button type="button" className="faq-q" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen ? "true" : "false"}><span>{item.q}</span><span className="faq-icon" /></button>{isOpen && <div className="faq-a">{item.a}</div>}</div>; })}</div><div className="faq-contact"><p>Didn&apos;t find your answer?</p><a href="https://discord.gg/ZZU5xQbv8K" className="btn btn-discord"><Icon name="discord" size={18} /> Ask in Discord</a><Link href="/contact" className="btn btn-ghost">Contact a board member <Icon name="arrow-right" size={16} /></Link></div></section></main></PageShell>;
}

export function ContactPage() {
  const meeting = MEETINGS[0];
  return (
    <PageShell>
      <main className="page-enter">
        <section className="contact-hero">
          <div className="container">
            <div className="section-kicker">Say hi</div>
            <h1>Get in touch.</h1>
            <p>Discord is the fastest way to reach us. Project channels, meeting updates, and club questions all live there.</p>
          </div>
        </section>
        <section className="section contact-section">
          <div className="container contact-page-grid">
            <div className="contact-primary-card">
              <div className="contact-card-label">Best first stop</div>
              <h2>Join the Discord</h2>
              <p>Ask questions, find project teams, get meeting reminders, or just see what people are making this week.</p>
              <div className="contact-actions">
                <a href="https://discord.gg/ZZU5xQbv8K" target="_blank" rel="noreferrer" className="btn btn-discord btn-lg"><Icon name="discord" size={20} /> Join Discord</a>
                <a href="mailto:ugagbc@gmail.com" className="btn btn-ghost btn-lg">Email us <Icon name="mail" size={18} /></a>
              </div>
            </div>
            <aside className="contact-side-stack">
              <div className="contact-note-card">
                <div className="contact-note-icon"><Icon name="clock" size={22} /></div>
                <div>
                  <h3>Come to a meeting</h3>
                  <p>{meeting.day} · {meeting.time}</p>
                  <p>{meeting.location}</p>
                </div>
              </div>
              <div className="contact-social-card">
                <h3 className="social-heading">Follow along</h3>
                <p className="social-copy">Discord is the hub; socials are for updates and showcases.</p>
                <div className="social-list">
                  {SOCIALS.map((s) => (
                    <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className={`social-row ${s.id === "discord" ? "discord" : ""}`}>
                      <div className="social-icon-wrap"><Icon name={s.id as IconName} size={20} /></div>
                      <div><strong>{s.label}</strong><span>{s.handle}</span></div>
                      <span className="arrow"><Icon name="arrow-up-right" size={18} /></span>
                    </a>
                  ))}
                  <a href="mailto:ugagbc@gmail.com" className="social-row">
                    <div className="social-icon-wrap"><Icon name="mail" size={20} /></div>
                    <div><strong>Email</strong><span>ugagbc@gmail.com</span></div>
                    <span className="arrow"><Icon name="arrow-up-right" size={18} /></span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
