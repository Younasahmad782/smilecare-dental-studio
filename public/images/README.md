# Image slots

No photographs are bundled (no network access was available, and licensing must be your choice).
Until a file exists, each slot shows a labelled placeholder. Drop licensed images here using EXACTLY these base names;
`.avif`, `.webp`, `.jpg`, `.jpeg` or `.png` are all detected automatically at build time and served optimised by next/image.

**Recommended sources (check each licence):** Unsplash, Pexels, or your clinic's own photography. Never present stock photos as real patient results.

| Base name | Used for | Suggested size |
|---|---|---|
| `hero` | Home hero (LCP image) | 2000×1100, landscape, keep text-free |
| `about-clinic`, `about-room-1`, `about-room-2`, `about-equipment`, `about-lounge` | About page | 1600×1200 |
| `dentist-ayesha`, `dentist-hassan`, `dentist-sana`, `dentist-imran` | Dentist portraits | 1000×1250 (4:5) |
| `service-general`, `service-cleaning`, `service-whitening`, `service-rootcanal`, `service-implants`, `service-braces`, `service-cosmetic`, `service-crowns`, `service-extraction`, `service-pediatric`, `service-gum`, `service-dentures` | Service cards + heroes | 1200×900 (4:3) |
| `gallery-home-1` … `gallery-home-4` | Home gallery teaser | 1000×1250 |
| `gallery-whitening-1/2`, `gallery-makeover-1/2`, `gallery-restoration-1/2`, `gallery-ortho-1/2` | Gallery page | 1000×1000 |
| `blog-tips`, `blog-checkups`, `blog-rootcanal`, `blog-cleaning`, `blog-implants`, `blog-children`, `blog-sensitivity`, `blog-hygiene` | Blog | 1600×1000 |

Tips: compress to roughly 150–300 KB for the hero and under 150 KB elsewhere, and write real alt text by editing the components if you replace images with specific scenes.
