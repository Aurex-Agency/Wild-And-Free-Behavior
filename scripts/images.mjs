// Builds web derivatives from the client's camera originals.
// Originals live outside the repo (default: ../homepage-mockup/assets) and are never modified.
// Output: AVIF + WebP at several widths in public/images, plus src/content/images.json.
//
//   npm run images
//   WFB_ASSETS=/path/to/originals npm run images
//   ONLY=cabin,tomato npm run images   (rebuild a few entries, keep the rest)

import sharp from "sharp";
import { mkdir, writeFile, rm, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.resolve(root, process.env.WFB_ASSETS ?? "../homepage-mockup/assets");
const outDir = path.join(root, "public/images");
const manifestPath = path.join(root, "src/content/images.json");

// crop: [left, top, width, height] as fractions of the auto-oriented original.
// focus: where the subject sits inside the crop, used for object-position if a container differs.
const specs = [
  {
    key: "heroGarden",
    file: "IMG_9476.JPG",
    alt: "Three young children walk between the garden beds on a summer day",
    variants: {
      desktop: { crop: [0, 0.12, 1, 0.833], widths: [560, 800, 1100, 1400], focus: "50% 60%" },
    },
  },
  {
    key: "heroPorch",
    file: "IMG_9498.JPG",
    alt: "Anna Claire smiles at a little girl in a white dress on the cabin porch",
    variants: {
      desktop: { crop: [0, 0.12, 1, 0.833], widths: [560, 800, 1100, 1400], focus: "55% 55%" },
    },
  },
  {
    key: "playroom",
    file: "DSC04231.jpg",
    alt: "A play room with a white teepee, a forest mural, and toys spread across the rug",
    variants: {
      desktop: { crop: [0, 0.1, 1, 0.833], widths: [560, 800, 1100, 1400], focus: "50% 50%" },
    },
  },
  {
    key: "playroomWide",
    file: "DSC04231.jpg",
    alt: "A play room with a white teepee, a forest mural, and toys spread across the rug",
    variants: {
      desktop: { crop: [0, 0.22, 1, 0.445], widths: [600, 900, 1200, 1500], focus: "50% 50%" },
    },
  },
  {
    key: "heroGardenMobile",
    file: "IMG_9479.JPG",
    alt: "Three young children stand among tomato plants and garden bags on a summer day",
    variants: {
      mobile: { crop: [0.075, 0.04, 0.85, 0.9], widths: [400, 520, 680, 820, 1000], focus: "50% 35%" },
    },
  },
  {
    key: "cabin",
    file: "DSC04175.jpg",
    alt: "The Wild & Free Behavior log cabin and stone sign on Doctors Drive in the fall",
    variants: {
      desktop: { crop: [0, 0.04, 1, 0.91], widths: [800, 1200, 1600, 2000], focus: "50% 60%" },
      mobile: { crop: [0.14, 0, 0.74, 1], widths: [400, 520, 680, 820, 1000], focus: "50% 55%" },
    },
  },
  {
    key: "sign",
    file: "IMG_9472.JPG",
    alt: "The stone sign out front reads Wild & Free Behavior, 403 Doctors Drive",
    variants: {
      desktop: { crop: [0.08, 0.06, 0.84, 0.88], widths: [600, 900, 1200, 1500], focus: "50% 50%" },
      mobile: { crop: [0.12, 0.08, 0.76, 0.86], widths: [400, 520, 680, 820], focus: "50% 50%" },
    },
  },
  {
    key: "tomato",
    file: "IMG_9487.JPG",
    alt: "A child holds out a small tomato from the garden",
    variants: {
      desktop: { crop: [0, 0.2, 1, 0.66], widths: [1000, 1500, 2000, 2600], focus: "55% 60%" },
      mobile: { crop: [0.27, 0, 0.6, 1], widths: [400, 520, 680, 820, 1000], focus: "50% 60%" },
    },
  },
  {
    key: "routines",
    file: "IMG_9513.JPG",
    alt: "Three children sit on floor cushions under an \"I'm here today\" song and a weather chart",
    variants: {
      desktop: { crop: [0, 0.04, 1, 0.9], widths: [500, 680, 860, 1100], focus: "50% 60%" },
    },
  },
  {
    key: "communication",
    file: "IMG_9539.JPG",
    alt: "A young child traces letters on a worksheet with a blue marker",
    variants: {
      desktop: { crop: [0, 0, 1, 1], widths: [500, 680, 860, 1100], focus: "40% 50%" },
    },
  },
  {
    key: "learning",
    file: "DSC04212.jpg",
    alt: "Jimbo sorts picture cards at a table with three young children",
    variants: {
      desktop: { crop: [0, 0.08, 1, 0.84], widths: [600, 760, 960, 1300, 1700], focus: "55% 45%" },
    },
  },
  {
    key: "tableWork",
    file: "IMG_9541.JPG",
    alt: "Jimbo sits at a small table with two children working on worksheets",
    variants: {
      desktop: { crop: [0, 0, 1, 1], widths: [600, 760, 960, 1300], focus: "55% 45%" },
      mobile: { crop: [0.12, 0, 0.82, 1], widths: [400, 520, 680, 820], focus: "50% 45%" },
    },
  },
  {
    key: "portraitAnnaClaire",
    file: "IMG_9458.JPG",
    alt: "Anna Claire Waldrop on the cabin porch",
    variants: { desktop: { crop: [0, 0.03, 1, 0.833], widths: [360, 480, 620, 760, 960], focus: "50% 30%" } },
  },
  {
    key: "portraitJimbo",
    file: "IMG_9460.JPG",
    alt: "Jimbo Waldrop on the cabin porch",
    variants: { desktop: { crop: [0, 0.03, 1, 0.833], widths: [360, 480, 620, 760, 960], focus: "50% 30%" } },
  },
  {
    key: "toddler",
    file: "IMG_9519.JPG",
    alt: "A toddler in a white dress sits on a floor cushion in a pine-walled room",
    variants: { desktop: { crop: [0, 0.06, 1, 0.833], widths: [400, 560, 720, 960], focus: "50% 35%" } },
  },
  {
    key: "windowRoom",
    file: "IMG_9510.JPG",
    alt: "A child sits at a table by a window inside the cabin, with tomatoes on the sill",
    variants: { desktop: { crop: [0.08, 0, 0.84, 1], widths: [600, 900, 1200, 1500], focus: "55% 50%" } },
  },
  {
    key: "cabinPortrait",
    file: "DSC04164.jpg",
    alt: "The log cabin and stone sign at 403 Doctors Drive, with fall leaves behind it",
    variants: { desktop: { crop: [0, 0, 1, 1], widths: [500, 700, 900, 1200], focus: "50% 50%" } },
  },
  {
    key: "porchFamily",
    file: "IMG_9467.JPG",
    alt: "Anna Claire and Jimbo on the cabin porch with two little girls",
    variants: { desktop: { crop: [0, 0.06, 1, 0.833], widths: [500, 700, 900, 1200], focus: "50% 45%" } },
  },
  {
    key: "porchChild",
    file: "IMG_9499.JPG",
    alt: "A little girl reaches up to show Anna Claire something on the porch",
    variants: { desktop: { crop: [0, 0.1, 1, 0.833], widths: [360, 480, 620, 760, 960], focus: "45% 50%" } },
  },
  {
    key: "office",
    file: "IMG_9521.JPG",
    alt: "Jimbo talks with Anna Claire at her desk inside the cabin",
    variants: { desktop: { crop: [0, 0, 1, 1], widths: [600, 900, 1200, 1500], focus: "45% 50%" } },
  },
  {
    key: "circleTime",
    file: "DSC04410.jpg",
    alt: "Anna Claire leads circle time while a boy reaches up to the calendar board",
    variants: { desktop: { crop: [0, 0, 1, 1], widths: [600, 760, 960, 1300], focus: "50% 50%" } },
  },
  {
    key: "instruments",
    file: "DSC04273.jpg",
    alt: "Young children with a toy drum and a harmonica at circle time",
    variants: { desktop: { crop: [0, 0, 1, 1], widths: [600, 760, 960, 1300], focus: "50% 50%" } },
  },
  {
    key: "books",
    file: "DSC04177.jpg",
    alt: "Picture books lined up on a wooden ledge along the pine wall",
    variants: { desktop: { crop: [0, 0.08, 1, 0.833], widths: [500, 700, 900, 1200], focus: "50% 50%" } },
  },
  {
    key: "wallScript",
    file: "IMG_9554.JPG",
    alt: "Wild & Free Behavior lettering on a pine wall inside the cabin",
    variants: {
      desktop: { crop: [0, 0.25, 1, 0.5], widths: [800, 1200, 1600, 2000], focus: "50% 50%" },
      mobile: { crop: [0.04, 0.18, 0.92, 0.66], widths: [400, 520, 680, 820], focus: "50% 50%" },
    },
  },
];

// Social share image: the sign (place and name, no faces).
const ogSpec = { file: "IMG_9472.JPG", crop: [0, 0.1, 1, 0.79], width: 1200, height: 630 };

async function oriented(file) {
  const input = path.join(assets, file);
  const buffer = await sharp(input).rotate().toBuffer();
  const meta = await sharp(buffer).metadata();
  return { buffer, width: meta.width, height: meta.height };
}

function region(src, [l, t, w, h]) {
  const left = Math.round(src.width * l);
  const top = Math.round(src.height * t);
  const width = Math.min(Math.round(src.width * w), src.width - left);
  const height = Math.min(Math.round(src.height * h), src.height - top);
  return { left, top, width, height };
}

async function build() {
  const only = process.env.ONLY?.split(",").map((s) => s.trim()).filter(Boolean);
  let manifest = {};
  if (only) {
    manifest = JSON.parse(await readFile(manifestPath, "utf8"));
    for (const f of await readdir(outDir)) {
      if (only.some((k) => f.startsWith(`${k}-`))) await rm(path.join(outDir, f));
    }
  } else {
    await rm(outDir, { recursive: true, force: true });
  }
  await mkdir(outDir, { recursive: true });
  await mkdir(path.dirname(manifestPath), { recursive: true });

  for (const spec of specs) {
    if (only && !only.includes(spec.key)) continue;
    const src = await oriented(spec.file);
    const entry = { alt: spec.alt, source: spec.file, variants: {} };
    for (const [name, v] of Object.entries(spec.variants)) {
      const r = region(src, v.crop);
      const cropped = sharp(src.buffer).extract(r);
      const widths = v.widths.filter((w) => w <= r.width);
      const files = [];
      for (const w of widths) {
        const h = Math.round((r.height / r.width) * w);
        const base = `${spec.key}-${name}-${w}`;
        const resized = cropped.clone().resize({ width: w, height: h });
        // Metadata (EXIF, GPS) is dropped by default when not calling withMetadata().
        await resized.clone().avif({ quality: 48, effort: 6 }).toFile(path.join(outDir, `${base}.avif`));
        await resized.clone().webp({ quality: 72 }).toFile(path.join(outDir, `${base}.webp`));
        files.push({ w, h, avif: `/images/${base}.avif`, webp: `/images/${base}.webp` });
      }
      entry.variants[name] = {
        width: r.width,
        height: r.height,
        aspect: +(r.width / r.height).toFixed(4),
        focus: v.focus,
        files,
      };
    }
    manifest[spec.key] = entry;
    console.log(`${spec.key}: ${Object.keys(entry.variants).join(", ")}`);
  }

  if (only) {
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
    console.log(`Rebuilt ${only.join(", ")}`);
    return;
  }

  const og = await oriented(ogSpec.file);
  await sharp(og.buffer)
    .extract(region(og, ogSpec.crop))
    .resize(ogSpec.width, ogSpec.height, { fit: "cover" })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(root, "src/app/opengraph-image.jpg"));

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Wrote ${Object.keys(manifest).length} images to public/images`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
