import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsPath = path.join(root, "src", "app", "data", "projects.json");
const allowedKinds = new Set(["semester", "jam"]);
const allowedEngines = new Set(["godot", "unity", "unreal", "custom"]);

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`Add a project to the internal catalog.

Usage:
  npm run add-project

Notes:
  - Local images should live in public/assets.
  - Enter either a full /assets path, a URL, or just a filename.
  - Optional itch.io and Steam URLs render buttons on the game detail page.
  - Format uses "semester" for long-term projects and "jam" for game jams.`);
  process.exit(0);
}

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const splitList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const assetPath = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) return trimmed;
  return `/assets/${trimmed}`;
};

const askRequired = async (rl, prompt) => {
  while (true) {
    const answer = (await rl.question(prompt)).trim();
    if (answer) return answer;
    console.log("Required.");
  }
};

const askChoice = async (rl, prompt, allowed, fallback) => {
  while (true) {
    const answer = (await rl.question(prompt)).trim().toLowerCase() || fallback;
    if (allowed.has(answer)) return answer;
    console.log(`Use one of: ${[...allowed].join(", ")}`);
  }
};

const readProjects = async () => JSON.parse(await readFile(projectsPath, "utf8"));

const main = async () => {
  const rl = createInterface({ input, output });
  try {
    const projects = await readProjects();
    const title = await askRequired(rl, "Title: ");
    const slugAnswer = await rl.question(`Slug (${slugify(title)}): `);
    const slug = slugify(slugAnswer || title);
    if (projects.some((project) => project.slug === slug)) {
      throw new Error(`A project with slug "${slug}" already exists.`);
    }

    const tagline = await askRequired(rl, "Short description/tagline: ");
    const semester = await askRequired(rl, "Semester (example: Fall 2026): ");
    const kind = await askChoice(rl, "Format [semester/jam] (semester): ", allowedKinds, "semester");
    const engine = await askChoice(rl, "Engine [godot/unity/unreal/custom] (unity): ", allowedEngines, "unity");
    const genres = splitList(await askRequired(rl, "Genres, comma-separated: "));
    const teamAnswer = await rl.question("Team size (0): ");
    const team = Number.parseInt(teamAnswer, 10) || 0;
    const image = assetPath(await rl.question("Card image filename/path (optional): "));
    const gallery = splitList(await rl.question("Gallery image filenames/paths, comma-separated (optional): ")).map(assetPath);
    const itchUrl = (await rl.question("itch.io URL (optional): ")).trim();
    const steamUrl = (await rl.question("Steam URL (optional): ")).trim();
    const featured = (await rl.question("Featured on home page? [y/N]: ")).trim().toLowerCase() === "y";

    const project = {
      id: Math.max(0, ...projects.map((item) => item.id)) + 1,
      slug,
      title,
      tagline,
      semester,
      kind,
      engine,
      genres,
      image,
      team,
    };

    if (gallery.length) project.gallery = gallery;
    if (featured) project.featured = true;
    if (itchUrl) project.itchUrl = itchUrl;
    if (steamUrl) project.steamUrl = steamUrl;

    projects.push(project);
    await writeFile(projectsPath, `${JSON.stringify(projects, null, 2)}\n`);
    console.log(`Added ${title} to ${path.relative(root, projectsPath)}.`);
  } finally {
    rl.close();
  }
};

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
