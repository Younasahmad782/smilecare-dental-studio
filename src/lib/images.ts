import fs from "node:fs";
import path from "node:path";

/**
 * SERVER-ONLY. Resolves /public/images/<name>.(avif|webp|jpg|jpeg|png) at build/render time.
 * Returns null when the file is missing so <Photo/> can show a labelled placeholder.
 * Do not import this file from a "use client" component.
 */
const EXT = ["avif", "webp", "jpg", "jpeg", "png"];
let cache: Map<string, string> | null = null;

function load() {
  if (cache) return cache;
  cache = new Map();
  try {
    const dir = path.join(process.cwd(), "public", "images");
    const files = fs.readdirSync(dir);
    for (const ext of EXT) {
      for (const f of files) {
        const parsed = path.parse(f);
        if (parsed.ext.slice(1).toLowerCase() === ext && !cache.has(parsed.name)) cache.set(parsed.name, `/images/${f}`);
      }
    }
  } catch {
    /* no images folder: placeholders only */
  }
  return cache;
}

export function imgSrc(name: string): string | null {
  return load().get(name) ?? null;
}
