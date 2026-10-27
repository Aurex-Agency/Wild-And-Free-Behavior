# Wild & Free Behavior: Website Build Plan

Prepared 2026-10-27 for Aurex Agency. Companion to `BUILD-PROMPT.md` (the phase 1 build prompt).

This plan covers strategy, search, design direction, architecture, compliance, the build sequence, and launch. It follows the Aurex Website OS (`/Users/kalobadair/Aurex/Aurex-Website-OS/CLAUDE.md`). Facts are labeled **Verified**, **Client-stated**, **Old site (stale)**, or **Unverified**.

---

## 1. What changed after research

These findings change the Codex brief. Each one is folded into `BUILD-PROMPT.md`.

| # | Finding | Why it matters |
|---|---|---|
| 1 | **The local Rovey font is the free demo.** It has no numerals and no punctuation: no period, comma, apostrophe, ampersand, or question mark. Rovey's lowercase also renders as small caps. | "Room to grow." renders a broken box where the period goes, and "Let's talk" breaks on the apostrophe. The full version must be bought before launch, and the prototype has to design around the gaps. |
| 2 | **Rovey and White Angelica are licensed for personal use only** unless the client bought commercial licenses (Rovey from Craft Supply Co., White Angelica from Creatype Studio). | You can't legally put them on a commercial site without a license. Web embedding rights have to be confirmed when you buy. |
| 3 | **The Drive folder has 18 photos, not 9.** The brief missed the full cabin exterior, the therapy room, the garden detail, and the table-work photos. | The missing shots carry the brand's strongest idea: a log cabin with a garden. All 18 are now in `homepage-mockup/assets/`. |
| 4 | **The clinic is a log cabin** with a porch, rocking chairs, a stone sign, pine-walled therapy rooms, and a children's garden with corn and tomatoes. | That's an ownable, business-specific concept no competitor has, and the best defense against a generic or AI-made look. |
| 5 | **The domain was renewed, not expired.** The registry shows it renewed through 2027-10-18 (updated 2026-10-19). It still serves a GoDaddy parking page (`/lander`). | Nothing indexed survives from the old site. The domain is safe to build on. DNS is still at GoDaddy (ns31/ns32.domaincontrol.com). |
| 6 | **Business email uses a different domain:** `wildandfreebehaviorllc.com`, on Google Workspace. The website domain has no MX records. | Pointing the website domain at the new host won't touch email. Never edit DNS on the LLC domain. |
| 7 | **The NPI registry confirms the core facts.** Wild & Free Behavior, LLC, 403 Doctors Dr, New Albany, MS 38652-3110, phone 662-539-7129, fax 662-539-7298. Anna Claire Waldrop, M.S., BCBA, LBA, "BCBA/Owner". | The phone number isn't invented. It's self-reported to the federal registry (last updated 2022), so it still needs a final client confirmation. |
| 8 | **Horn Lake came from the practice's own old contact page** (6341 Hwy 51 N, Horn Lake, MS 38637), not only from a third-party directory. | You have to ask whether a second location exists, existed, or was a billing address. A real second location needs its own page and Google Business Profile. |
| 9 | **A direct local competitor exists:** King Therapies, LLC in New Albany (Bailey Coltharp King, Licensed Behavior Analyst), listed as accepting BCBS. The regional anchor, Autism Center of North Mississippi in Tupelo, has reportedly had **100+ children on its waitlist**. | Demand outstrips supply in the region. Tupelo families are a realistic audience 25 to 30 minutes away on I-22. |
| 10 | **"New Albany" is ambiguous in search.** Results mix New Albany, Indiana and New Albany, Ohio. "Wild and free" collides with a homeschool movement, a dog food, and a song. | Every title, H1, and the business profile must say "MS" or "Mississippi". The brand must always appear as "Wild & Free Behavior", never "Wild & Free" alone. |
| 11 | **BACB Ethics Code 5.07** bars soliciting testimonials from current clients or stakeholders for advertising. 5.08 allows former clients, with care. | The usual local SEO play of asking every client for a Google review isn't available. Prominence has to come from citations, local links, content, and photos. |
| 12 | **HighLevel is not HIPAA compliant by default.** The HIPAA add-on (third parties report about $297/mo, not confirmed with HighLevel) plus a signed BAA is needed before intake data flows in. Vercel offers a BAA only as a $350/mo Pro add-on. | The plan keeps patient data off Vercel entirely and sends it only to HighLevel. Aurex likely becomes a business associate of the practice and should get legal review. |
| 13 | **Aurex's own house taste lists "generic beige editorial luxury" as an anti-pattern.** The Codex brief asks for "warm, editorial" with "warm cream space". | Cream background plus serif plus soft photos is the most common AI wellness look. The fix: forest green as a dominant color, real pine-and-garden photography, and log-course linework. |
| 14 | **BCBS of Mississippi requires prior authorization** for both the initial assessment and ABA. Approval runs 6 months from an approved treatment plan, with reassessment at 6 months (per a Mississippi state publication). | This is concrete, useful insurance content. It still needs BCBA review and a link to the current BCBSMS policy before publishing. |

---

## 2. Verified fact sheet

| Fact | Value | Status / source |
|---|---|---|
| Legal name | Wild & Free Behavior, LLC | Verified, NPPES NPI 1760190078 |
| Public name | Wild & Free Behavior | Logo, signage |
| Address | 403 Doctors Dr, New Albany, MS 38652 | Verified (NPPES, and the stone sign in IMG_9472/9475 reads "403 Doctors Drive") |
| Phone | 662-539-7129 | NPPES (2022). Confirm it's current. |
| Fax | 662-539-7298 | NPPES (2022). Confirm. |
| Owner / BCBA | Anna Claire Waldrop, M.S., BCBA, LBA | NPPES. The old site said BCBA since Dec 2020 and MS LBA since Mar 2021. Re-verify on the BACB registry and the MS Autism Board before publishing. |
| Second person | Jimbo | Client-stated (meeting notes). Last name, role, and credentials unknown. |
| Email domain | wildandfreebehaviorllc.com (Google Workspace) | Verified by DNS. The public contact address is unknown. |
| Website domain | wildandfreebehavior.com, GoDaddy registrar and DNS, renewed to 2027-10-18 | Verified (whois). Currently a parking page. |
| Social | Instagram @wild_and_free_behavior; Facebook page ID 100075907215633 | Found in search. Confirm they're active and official. |
| Insurance | BCBS of Mississippi | Client-stated, and on the old site. Plan products unknown. |
| Ages | 2 to 6 "but..." (notes); old homepage said 2 to 7; old FAQ said 2 to 6 | Conflicting. Ask. |
| Population | Children newly diagnosed with ASD | Old site ("newly diagnosed"). Confirm it still applies. |
| Client journey | Inquiry, qualify, free consultation with Anna Claire & Jimbo, assessment period, fixed weekly days and times, ongoing | Client-stated |
| Reminders | Friday reminder of next week's schedule | Client-stated. Belongs to the HighLevel build. |
| Old URLs | `/`, `/contact`, `/abouta4ae63fc` | Search index. The Wayback Machine has no usable captures. |

---

## 3. Market and search landscape

### Who families find today

| Provider | Where | Notes |
|---|---|---|
| King Therapies, LLC | New Albany (104 W Bankhead St per Healthline) | Direct local competitor. LBA Bailey Coltharp King. Listed as BCBS. Thin web presence found. |
| Autism Center of North Mississippi | Tupelo | Nonprofit, ABA only. Private insurance and Medicaid. Reported 100+ child waitlist, 2 BCBAs. |
| Delta Autumn Consulting | Oxford | Testing plus ABA per the 2023 state resource list. Private insurance, not Medicaid. |
| Directories | Healthline, ProviderSpark, Psychology Today, BeamingHealth | They fill most "ABA therapy [town]" results. ProviderSpark has an "ABA Therapy in New Albany, MS" page. |

**Read:** competition in organic search is weak. Directories and out-of-state New Albanys fill the results. A fast, specific, well-structured local site plus a fully built Google Business Profile can realistically own "ABA therapy New Albany MS" and compete for Tupelo, Oxford, and Pontotoc searches.

### Demand evidence (real Google autocomplete, pulled 2026-10-27)

No keyword-volume tool is connected, so this is directional evidence, not volume. Autocomplete only shows queries people actually type.

| Cluster | Queries Google suggests | Target page |
|---|---|---|
| Core local | aba therapy new albany ms · autism therapy new albany ms | Home |
| Nearby towns | aba therapy tupelo ms · autism therapy tupelo ms · aba therapy oxford ms | Areas served (phase 2 city pages) |
| Insurance | aba therapy mississippi medicaid · (long tail) does BCBS of Mississippi cover ABA | Insurance, plus an article |
| Diagnosis stage | autism testing tupelo ms · autism testing mississippi · autism diagnosis mississippi | Resource article: evaluations in North Mississippi |
| Near me | aba therapy near me · aba therapy near me for kids · aba therapy centers near me | Google Business Profile, then Home |
| Brand | wild and free behavior | Home, Business Profile, sameAs links |
| Regional brand | autism center of north mississippi (+ reviews, oxford) | Don't target competitor names. Win on usefulness. |

"aba therapy pontotoc" returned no suggestions, so demand there is low. Before writing city pages, validate volume in Google Ads Keyword Planner or DataForSEO, and in Search Console after launch.

---

## 4. Positioning and conversion strategy

**Primary audience:** parents and caregivers in Union, Pontotoc, Lee, Tippah, Benton, and Lafayette counties with a young child who was recently diagnosed with autism or is being evaluated. Mostly on a phone, often at night, often anxious, often unsure what ABA involves or whether insurance covers it.

**Secondary audiences:** pediatricians and referral sources, and job seekers (RBTs and BCBAs, later).

**Primary promise (draft):** A small, BCBA-led practice in a log cabin in New Albany, where your child gets a consistent weekly rhythm and you get a clear next step, starting with a free conversation.

**Differentiators, in order of strength** (confirm each with the client):
1. The place: a log cabin with a porch and a garden, not an office suite. Shown in real photos.
2. The people: the owner BCBA plus Jimbo, met face to face at the free consultation.
3. Consistency: the same days and times every week once services start.
4. Clarity on insurance: BCBS of Mississippi, benefits checked by staff, an honest private-pay path.
5. Small and local, in New Albany, about 30 minutes from Tupelo and Oxford.

**Objections to answer on the page:** Do you take my insurance? Is my child the right age? We don't have a diagnosis yet. What does ABA actually look like here? How many hours, and when? Is there a waitlist? (Only state what's verified.) Who will work with my child? Will I be involved?

**Conversion hierarchy:**
- Primary: "Get started", which opens the insurance and fit screener and ends in a contact request to staff.
- Secondary: tap to call 662-539-7129 (once confirmed). On mobile it's a co-equal primary action in a sticky bottom bar.
- Tertiary: directions, and "Meet the team".
- Ask for the minimum info to start a conversation. Clinical detail belongs on the phone call and in the consultation, not the web form.

**After submit:** a calm confirmation page with no "approved" or "booked" language. It tells families what happens next and when to expect a call (staff sets the timeframe), plus the phone number and directions. Send a confirmation email or SMS only from the HIPAA-enabled HighLevel account.

---

## 5. Site architecture

### Launch sitemap

| URL | Page | Search intent | Conversion role |
|---|---|---|---|
| `/` | Home | aba therapy new albany ms, brand | Screener, call |
| `/aba-therapy` | ABA therapy at Wild & Free | what ABA looks like for young kids, what to expect | Screener |
| `/getting-started` | Getting started | how to start ABA, consultation, assessment | Screener, call |
| `/insurance` | Insurance & private pay | BCBS Mississippi ABA, ABA cost | Screener (lives here and in a dialog) |
| `/about` | Our team & story | who runs it, credentials, trust | Call |
| `/visit` | Visit the cabin (contact, map, directions, hours) | directions, address, phone | Call, directions |
| `/faq` | Questions families ask | long tail and AI answers | Screener |
| `/resources` | Resource hub (index) | newly diagnosed help | Soft CTA |
| `/resources/[slug]` | Articles (see section 6) | informational | Soft CTA |
| `/privacy` | Website privacy policy plus a link to the Notice of Privacy Practices | | |
| `/accessibility` | Accessibility statement | | |
| `/thank-you` | Post-submit (noindex) | | |

**Phase 2, only with evidence:**
- `/aba-therapy-tupelo`, `/aba-therapy-oxford`: build only if real families come from there and each page has unique, useful content (route and drive time, school-day scheduling, how families from that town have made the weekly rhythm work, nearby evaluation options). Never swap the city name into a template. That's a doorway page under Google's spam policies.
- `/careers`: RBT and BCBA hiring, if the client is hiring.
- A Horn Lake location page: only if a second location is confirmed.
- Individual service pages such as parent training: only if the service is real and distinct.

**Navigation:** ABA Therapy · Getting Started · Insurance · About · Visit, plus a "Get started" button and a tap-to-call phone link on mobile. Footer: full name, address and phone (matching the Business Profile character for character), hours, all pages, resources, and social links.

**Redirects (301):** `/abouta4ae63fc` → `/about`, `/contact` → `/visit`, `/home` → `/`. Also redirect `www` ↔ apex to a single canonical host. Optionally point `wildandfreebehaviorllc.com` (no website today) at the main domain, without touching its MX records.

**Internal linking:** every page links to `/getting-started` or opens the screener. Articles link to the one service or insurance page that matches their intent. The FAQ links to the deep answers. Breadcrumbs go on the resource articles.

---

## 6. SEO plan

### Technical foundation
- Static generation for every page. Important text lives in the HTML, not in images or client-only JS.
- One canonical host over HTTPS, with self-referencing canonical tags, `sitemap.xml`, and `robots.txt`.
- Staging and preview deployments get `noindex` (header and meta), plus password protection where possible.
- Core Web Vitals targets at the 75th percentile on mobile: LCP under 2.5s, INP under 200ms, CLS under 0.1. That means AVIF/WebP images at art-directed sizes, a hero image under 150 KB on mobile, one preloaded display font, subset fonts, and a minimal client JS island for the screener only.
- Descriptive file names and purpose-based alt text. Keep the real photo EXIF out of output files (strip GPS and camera data).
- Open Graph and Twitter images from real photography (the cabin or the garden), 1200×630.
- Search Console and Bing Webmaster Tools verified on day one. Submit the sitemap and request indexing of key pages.

### On-page
- **Titles** (always include "MS" or "Mississippi"), for example:
  - Home: `ABA Therapy in New Albany, MS | Wild & Free Behavior`
  - Insurance: `ABA Therapy Insurance & BCBS of Mississippi | Wild & Free Behavior`
  - Getting started: `How to Start ABA Therapy in New Albany, MS | Wild & Free Behavior`
  - About: `Anna Claire Waldrop, BCBA, and Our Team | Wild & Free Behavior`
- **H1 lockup on the homepage:** the visual display line "Room to grow" and the descriptive line "ABA therapy for young children in New Albany, Mississippi" sit in the same `<h1>`. The brand line and the keyword line read as one heading.
- One H1 per page. Headings follow the content, not font size.
- Unique meta descriptions written for parents, with no keyword stuffing.
- Each page answers its query in the first 100 words, in plain sentences an AI overview can quote.

### Structured data (JSON-LD; only facts visible on the page)
- `MedicalClinic` (a LocalBusiness subtype): name, url, logo, image (real photos), telephone, address, geo, areaServed (towns and counties), openingHoursSpecification (once confirmed), sameAs (Facebook, Instagram), founder or employee linked to the Person.
- `Person` for Anna Claire: name, jobTitle, `hasCredential` (BCBA, Mississippi LBA), worksFor, image (only with permission and verified identity).
- `BreadcrumbList` on inner pages and `Article` on resources, with author, reviewer, datePublished, and dateModified.
- `FAQPage` is optional. Google limits FAQ rich results to well-known government and health sites, so don't expect the visual result. The content still helps AI answers.
- Never: AggregateRating or Review markup, invented hours, prices, or services.

### Local SEO (the biggest lever for a one-location practice)
1. **Google Business Profile:** claim or verify it. Use the exact name "Wild & Free Behavior" with no keywords added. Pick the most specific ABA or autism category Google offers in the dashboard, and confirm the live category list at setup. Don't pick psychologist categories that misstate credentials. Fill in the address, phone, hours, website (UTM-tagged), service area towns, description, attributes, and appointment link (to `/getting-started`). Upload the real photos: the cabin exterior, sign, porch, therapy rooms, garden, and team (with releases). Add photos monthly. Use Posts for real updates and Q&A with genuine questions.
2. **Matching name, address, and phone everywhere.** Use the same name, address, and phone across the website footer, Business Profile, Apple Business Connect, Bing Places, Facebook, Instagram, NPPES (update it if anything changed), Healthline, ProviderSpark, Psychology Today, the **BCBS of Mississippi provider directory**, Buzzfile, and autismconnect. Fix or remove the Horn Lake address wherever it's wrong.
3. **High-trust local listings:** the Mississippi DMH Autism Resource Guide (ask DMH to list the practice), Behavior Analysis Association of Mississippi, the Union County Development Association or Chamber, MDRS autism resources, and local school district special education resource lists.
4. **Local links from real relationships:** pediatric practices (referral pages), New Albany and Union County community events, the New Albany Gazette and Daily Journal (Tupelo) for a feature story about the cabin and the garden, and practicum or internship ties to MSU and Ole Miss behavior analysis programs.
5. **Reviews within BACB rules:** don't solicit testimonials or reviews from current clients or stakeholders, and don't build review-request automation in HighLevel. Former clients may be asked carefully, under 5.08. Reply to unsolicited reviews professionally without confirming anyone is a client, since a reply can disclose protected health information. Don't embed or quote reviews on the site.

### Content hub (launch set: 4 articles, each reviewed and signed by the BCBA)
1. **"Just got an autism diagnosis in North Mississippi? What to do next"**: the hub's main page. Practical steps, the local services landscape, and where ABA fits.
2. **"Where to get an autism evaluation in North Mississippi"**: matches the "autism testing tupelo ms" demand. Links to the DMH Autism Resource Guide. Lists only providers you've verified, or none.
3. **"Does BCBS of Mississippi cover ABA therapy?"**: prior authorization, the 6-month authorization pattern, what families can ask their plan, and the 2015 Mississippi autism law with the insurers' 2018 removal of the age cap. Dated, sourced, and reviewed.
4. **"Your first visit to the cabin"**: a real photo walk-through: the sign, the porch, the door, the therapy room, the garden. It doubles as a printable visual story for the child and is the most business-specific asset on the site. The BCBA approves the wording.

**Next 90 days, about 2 a month:** what happens at an ABA assessment · how weekly ABA scheduling works (why consistent times) · questions to ask any ABA provider · ABA and Mississippi Medicaid: what families should know (only if the client can speak to it accurately) · getting ready for preschool (only if the clinic supports it).

Every article gets an author and reviewer byline with credentials, a last-reviewed date, linked primary sources, and one soft CTA. No AI-generated filler: each article needs local specifics, or it doesn't ship.

### AI search visibility
Use consistent entity facts everywhere (name, address, phone, credentials, the BCBS line). Write short, quotable answer paragraphs, with visible authorship and review dates. Allow reputable AI crawlers in `robots.txt` unless the client objects. `llms.txt` is optional, and Google ignores it.

### Measurement
- Analytics: Google Analytics 4 or a privacy-first tool (Plausible, Fathom, or Vercel Web Analytics). No Meta Pixel, TikTok pixel, session replay, or heatmaps on any page, and especially not on screener, intake, or thank-you pages.
- Events (no personal or health data, ever): `screener_open`, `screener_step_complete` (step number only), `screener_result_view` (result type only), `contact_request_submit` (fires after HighLevel confirms success), `call_click`, `directions_click`.
- KPIs: Business Profile calls and direction requests, organic sessions to Home, Insurance, and the articles, local rank grid for "ABA therapy" around New Albany, Tupelo, and Oxford, screener completion rate, and qualified inquiries (from HighLevel, not analytics).

---

## 7. Creative direction: "A cabin, a garden, and a plan"

### The idea
Families don't walk into an office park. They pull up to a log cabin, sit on a porch, and later watch things grow in a garden out back. The site is built like that arrival: **the porch** (meet the people), **inside** (what therapy looks like), **the garden** (steady growth over time), and **the plan** (a weekly rhythm that doesn't change). The logo's sunrise arch ties it together.

**First three seconds:** "This is a real place with real people, in New Albany, and I know what to do next."

**Visual ambition:** level 4 of 5 (highly art-directed and memorable), carried by real photography, not effects.

### Quality carriers (each must be visible on the page)
1. **Arch-window hero crop.** The hero photo is masked in the logo's half-sun arch, like looking through the cabin's arched window (IMG_9473 shows one). On desktop it's an asymmetric arch. On mobile it's a full-width arch-top crop.
2. **Sun-ray linework.** Rays traced from the actual logo (same stroke weight, the same deliberate irregularity) are used three ways: the screener progress meter (one ray group lights per step), section openers, and the favicon. No generic icons anywhere.
3. **Log-course rules.** Stacked horizontal hairlines with slightly irregular spacing, echoing the log walls and pine planks. Used as section dividers and as a quiet texture inside forest-green panels.
4. **Field-note annotations.** Short handwritten notes in White Angelica sit beside photos, like captions in a family photo album ("the garden out back", "same time every week"). They're decorative only. Real information is always set in Raleway.
5. **The weekly rhythm strip.** A Monday-to-Friday band with sample session blocks at the same times, labeled as an example. It expresses the client's real differentiator: consistent days and times, plus the Friday preview of next week.
6. **The getting-started sequence uses real photos as steps:** porch portrait → therapy room → table work → the tomato in a child's hand. Not icons.
7. **A deliberately composed mobile hero and a sticky Call / Get started bar**, designed for one-handed use.

### Color (hex values from the brand sheet; the sheet's RGB and CMYK are inconsistent)
| Token | Hex | Role |
|---|---|---|
| Forest Green | `#0a4040` | Dominant brand color: full sections, primary buttons, headings on light backgrounds |
| Modern Cafe | `#322d2a` | Body text, footer, deep backgrounds |
| Blushed Sand | `#dbb199` | Accent: rules, ray highlights, focus rings on dark, small fills. Never body text on cream (fails contrast). |
| Cultured Beige | `#f9f8f4` | Page ground, used together with green blocks and photography, never cream on cream for whole sections |
| Pine (derived) | sampled from photos, around `#b8763e` (finalize from the photos) | Optional warm accent for annotations only. Check contrast. |

Rules: no gradients except a functional photo scrim, no glassmorphism, shadows only where an element truly floats (the dialog), and all text pairs pass WCAG AA (4.5:1 body, 3:1 large).

### Typography
| Role | Face | Notes |
|---|---|---|
| Display | **Rovey Regular (full, licensed)** | Lowercase renders as small caps. Use for big lines with loose tracking. Until the full font is installed, display lines can't contain punctuation or numerals, and the font-face falls back for those glyphs. |
| Body and UI | **Raleway** (variable, upright) | Use 500 (Medium) for body, as the brand sheet specifies, and 600 to 700 for buttons and labels. Set `font-variant-numeric: lining-nums` for phone numbers, addresses, and times, because Raleway defaults to old-style figures. Minimum 17 to 18px body on mobile, 16px minimum on inputs to stop iOS zoom. |
| Accent | **White Angelica (licensed)** | Field notes only, 1 to 3 words, never the only carrier of meaning, never in buttons or nav. Missing glyph: en dash. |

### Photography plan (all 18 originals are in `homepage-mockup/assets/`)
| File | What it shows | Role |
|---|---|---|
| IMG_9473 | Full cabin exterior, lawn, porch with people, stone sign | **Establishing shot.** Hero candidate (desktop) or the Visit hero |
| IMG_9479 | Three children among garden grow-bags | Hero candidate (desktop, arch crop) |
| IMG_9484 | Adult and two children among tall corn (portrait) | **Mobile hero candidate** |
| IMG_9485 | Adult pointing out a plant to a boy | Approach: learning and connection |
| IMG_9487 | Child's hands offering a tomato, shallow focus | **Signature pause moment.** Full-bleed, one line of text |
| IMG_9472 | Stone sign close-up ("403 Doctors Drive") | Visit page, footer, local proof |
| IMG_9475 | Cabin and sign (portrait) | Visit page mobile |
| IMG_9513 | Three children on foam seating in a pine room, visual schedule on the wall | Inside: what sessions look like |
| IMG_9519 | Toddler on foam seating | Approach: everyday routines |
| IMG_9539 | Child writing on a worksheet | Approach: communication and learning |
| IMG_9541 | Adult with two children at a table (black and white) | Getting started: the plan. Ask whether a color version exists, or keep black and white on purpose. |
| IMG_9510 | Child at a window table (backlit, dark) | Quiet atmosphere moment. Needs careful exposure in the crop. |
| IMG_9554 | Script "Wild & Free Behavior" on a pine wall | About or the final call to action |
| IMG_9527 | Branded tee on the wall | About texture. Shows a retro secondary brand style; don't adopt it into the site system without discussion. |
| IMG_9454 / 9457 / 9460 | Porch portraits: a woman, a man in a black polo, a man in a floral shirt | Team. **No names on photos until the client identifies each person.** |
| IMG_9467 | Family group on the porch with two young children | Use only after the client says who they are and confirms consent |

**Photo rules:**
- Signed releases for every child pictured, from a parent or guardian.
- Confirm whether any child is a current or former client. If so, publishing requires written HIPAA authorization, separate from a photo release.
- Neutral alt text: describe the scene, never a diagnosis.
- Don't imply anyone is a patient or show an outcome.
- Preserve the originals and generate art-directed crops per breakpoint (`<picture>`), not one image squeezed everywhere.

### Motion (about 3 of 10)
Three moments only: the hero arch reveals once, the screener rays fill per step, and the weekly rhythm blocks settle in on first view. Everything else is static. Respect `prefers-reduced-motion` fully. No scroll-jacking, parallax, fade-up on every block, autoplay video, or cursor effects.

### Not-AI-made checklist (run at every review)
**Layout tells to avoid:** a centered hero with a pill badge above the headline and two buttons below · three or four equal icon cards · alternating image-and-text rows down the whole page · identical section heights and padding · bento grids · rounded corners and soft shadows on every element · gradient blobs, noise, or glass · logo walls, stat counters, testimonial carousels · stock-style dark overlays with white text on photos.

**Detail tells to avoid:** generic Lucide or Heroicons line icons · emoji · Inter or system fonts · "✨" or sparkle anything · placeholder-looking avatars · decorative numbers with no meaning.

**Copy tells to avoid:**
- The words journey, empower, unlock, elevate, seamless, holistic, tailored, navigate, thrive, nestled, world-class, cutting-edge, "every child is unique", "compassionate care", "every step of the way", "we're here for you".
- Rhetorical question openers ("Looking for...?").
- Three-word fragment rhythms ("Calm. Human. Grounded.").
- **Any em dash or en dash in site copy** (Aurex rule). Write "ages 2 to 6".

**What to do instead:**
- Asymmetric compositions with real crops.
- Rhythm that changes section to section: full-bleed photo, then a narrow text column, then a green panel, then a horizontal strip.
- Specific nouns: Doctors Drive, the porch, the garden, BCBS of Mississippi, Tuesdays at 9.
- Sentences Anna Claire would actually say on the phone.
- A custom 404 page ("This path doesn't go anywhere. The porch is this way.").
- A favicon cut from the sun mark.
- A print stylesheet for the first-visit story.

**Read-aloud test:** if a sentence could appear unchanged on any other clinic's website, rewrite it.

### Voice
Warm and plain-spoken, with short sentences and no clinical jargon unless it's explained. Respect parents as the experts on their child, and never frame autism as tragedy or something to fix. Ask the client which they prefer, "autistic child" or "child with autism", and use it consistently. Avoid unverified labels such as "play-based", "neurodiversity-affirming", "no waitlist", or "in-home".

---

## 8. Homepage specification

| # | Section | Answers | Desktop | Mobile |
|---|---|---|---|---|
| 1 | Header | Where am I? | Logo left (tight crop of the sun mark plus wordmark), 5 links, "Get started" button | Logo, phone icon link, menu button. A sticky bottom bar appears after the hero: **Call** · **Get started** |
| 2 | Hero | What is this and where? | Asymmetric: H1 lockup left on cream ("Room to grow" in Rovey, then "ABA therapy for young children in New Albany, Mississippi" in Raleway), arch-masked garden photo right, one supporting sentence, primary and secondary CTAs, address line "403 Doctors Drive · New Albany" | Arch-top portrait crop (IMG_9484) at about 45 to 50% of the screen height, then the H1 lockup, one sentence, and the CTA, all within a 390×844 first screen |
| 3 | Approach | What will my child work on? | Four focus areas (communication, everyday routines and independence, learning and connection, family priorities). Each one is a real photo and a short paragraph in a staggered two-column rhythm, not a card grid. Language: "areas support may focus on". | Horizontal swipe row of photo-led panels, or a stacked editorial list. No carousel dots. |
| 4 | Pause | (emotion) | Full-bleed IMG_9487, the tomato in hand, with one line in Rovey | Tight crop on the hands |
| 5 | Getting started | What happens first? | Four or five steps as a horizontal "path" with real photos: Reach out → Free consultation with Anna Claire & Jimbo → Assessment → Your weekly rhythm → Ongoing care. A note that the form doesn't book treatment. | Vertical path with a continuous ray-line connector |
| 6 | Weekly rhythm | What will scheduling be like? | A forest-green panel with the Monday-to-Friday strip, labeled "Example schedule", and copy about consistent days and times plus the Friday preview of next week | Strip becomes a 5-row list |
| 7 | Insurance & private pay | Can we afford this? | Text column: BCBS of Mississippi with plan verification language, private pay, "not sure". "Check your options" opens the screener. | Same, with full-width buttons |
| 8 | People | Who are you? | Porch portraits, unnamed until identified, plus a warm intro naming Anna Claire Waldrop (M.S., BCBA, LBA, verify) and Jimbo (role TBD) | Portraits in a two-up crop |
| 9 | The cabin / Visit | Where exactly? | IMG_9473 wide with a field note, the address, a "Get directions" link, a drive-time line ("about 30 minutes from Tupelo and Oxford", verify), and hours once confirmed | Sign photo, address block, big directions button |
| 10 | FAQ | Last doubts | 6 to 8 accessible `<details>` accordions | Same |
| 11 | Final CTA | What do I do now? | IMG_9554 (wall script) or green panel: "Start with a conversation." Screener and phone | Same |
| 12 | Footer | Facts | Name, address, and phone (matching the Business Profile), hours, nav, resources, social, privacy and accessibility links, BCBA credential line | Same, single column |

---

## 9. Insurance and fit screener

### Production behavior (prototype in phase 1, live in phase 4)
**Step 1: How will you pay for services?**

| Option | Route |
|---|---|
| Blue Cross & Blue Shield of Mississippi | "We'll verify your child's plan and benefits." Continue to step 2. |
| Another Blue Cross plan (out of state or employer) | Manual plan review. Never say accepted or rejected. Continue. |
| Mississippi Medicaid or CHIP | **Added.** Staff review plus resources, until the client confirms whether they accept it. |
| Another insurance | Offer: explore private pay · talk with our team · other resources |
| No insurance / I prefer private pay | Private-pay conversation. Never show fees unless the client supplies them. Continue. |
| I'm not sure | Help finding the plan name (insurance card tips), then staff review. Continue. |

**Step 2: Basic fit.** Child's age band (under 2 / 2 to 3 / 4 to 6 / 7 or older); diagnosis (diagnosed / evaluation underway / not yet / not sure); prior ABA (yes / no / prefer to discuss); county or town (optional). **No automatic rejection.** Out-of-band ages and an uncertain diagnosis go to staff review with kind copy. "Not yet diagnosed" also links to the evaluation article.

**Step 3: Next step.** Show one of: benefits verification needed · plan review needed · private-pay conversation · staff guidance · other resources (insurer's provider directory and the Mississippi DMH Autism Resource Guide, opened only when the visitor taps). Then the contact step.

**Contact step (production only):** parent name, phone, email, preferred contact method, and an optional short note. No diagnosis documents, insurance card uploads, member IDs, or dates of birth on the public site.

**Accessibility:** a native `<dialog>` or a full-page route, with focus moved in and returned on close, Escape to close, back that preserves answers, progress announced to screen readers, 48px targets, and a visible step count ("Step 2 of 3").

**Data rule:** answers stay in the browser until the visitor submits the contact step. Nothing goes to analytics except step numbers and result types.

---

## 10. Technical architecture

| Area | Decision |
|---|---|
| Framework | **Next.js App Router + TypeScript + Tailwind CSS** (the Aurex default), statically generated. The screener and mobile nav are the only client components. Astro is a fine alternative but not worth leaving the agency's stack for. |
| Repo | `github.com/Aurex-Agency/Wild-And-Free-Behavior` (empty today). Clone it to `.../Wild And Free Behavior/site/`. Keep camera originals out of git. Commit only optimized derivatives. |
| Hosting | Vercel (static pages only, **no patient data passes through it**), preview deploys with noindex and protection, production on `wildandfreebehavior.com` after approval |
| Images | A build script (sharp) produces AVIF and WebP at several widths with art-directed crops per breakpoint, plus explicit width and height. `next/image` with deliberate `sizes`. The LCP image gets priority, everything else lazy-loads. EXIF is stripped. |
| Fonts | `next/font/local` with the licensed Rovey, Raleway variable (latin subset), and White Angelica. Preload only Rovey. `font-display: swap` with metric-matched fallbacks. |
| Logo | Ask the client for a vector source (AI, SVG, EPS). If none exists, hand-trace the 1080px PNG into a clean SVG (its white background is baked in, so it isn't transparent). Build a horizontal header lockup and a sun-mark-only favicon. |
| Content | MDX in the repo for articles, with frontmatter for author, reviewer, dates, and sources. A small typed `site.config.ts` holds every business fact (name, address, phone, hours, credentials), so they're defined once and reused across the footer, schema, and pages. |
| Screener logic | A pure TypeScript routing module (`lib/screener.ts`) with unit tests for every branch, kept separate from the UI |
| Intake path | **Decision for phase 4.** Recommended: the visitor's browser submits directly to the **HIPAA-enabled HighLevel** sub-account (a styled HighLevel form embedded for the contact step, or a direct client-side post to HighLevel's form endpoint), so data never touches Vercel. The alternative, a Next.js route handler to the HighLevel API, requires Vercel's BAA add-on and no request-body logging. |
| Security | Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy), no secrets in client code, Turnstile or honeypot on the contact step, dependencies kept minimal |
| Accessibility | WCAG 2.2 AA: keyboard, focus visible, contrast, labels and errors, reduced motion, skip link, landmarks, 44 to 48px targets, reflow at 320px |

---

## 11. Compliance and risk register

| Risk | Required action | Owner |
|---|---|---|
| Intake data on non-HIPAA systems | Enable the HighLevel HIPAA add-on and sign the BAA **before** live intake. Aurex likely becomes a business associate, so get a BAA between Aurex and the practice and run it by legal counsel. Keep data off Vercel. | Aurex and client |
| Tracking pixels on health pages | No ad pixels or session replay. Analytics events carry no personal or health data. (The 2024 court ruling narrowed HHS tracking guidance for public pages, but patient-facing flows still carry risk.) | Aurex |
| Font licensing | Buy the Rovey full version and White Angelica commercial licenses with web-embedding rights. Keep the receipts in the project. | Client (Aurex advises) |
| Photo consent | Releases for every child and adult pictured. HIPAA authorization if anyone pictured is a client. | Client |
| Testimonials and reviews | No testimonials on the site, no review solicitation of current clients (BACB 5.07) | Aurex and client |
| Credentials | Verify the BCBA on the BACB registry and the LBA on the MS Autism Board before publishing. Show the credentials exactly as held. | Aurex |
| Claims | No guarantees, outcome claims, "no waitlist", or unverified service settings | Aurex |
| Notice of Privacy Practices | The practice likely already has one as a covered entity. Link it from the footer. The website privacy policy is separate. | Client |
| DNS | Change only A/CNAME for the website domain, with client approval, during a launch window. Never touch the LLC domain's MX. | Aurex |

---

## 12. Build phases

Durations are estimates and assume timely client answers.

| Phase | What | Gate | Est. |
|---|---|---|---|
| 0. Client inputs | Answers to section 14, font licenses, vector logo, photo releases, Business Profile and GoDaddy access, HighLevel HIPAA decision | Blocking items answered | Week 0 to 1 (runs in parallel) |
| 1. Browser proof | Homepage desktop and mobile in the real Next.js repo, the screener demo, native assets (arch mask, rays, log rules), `REVIEW-NOTES.md`. Uses `BUILD-PROMPT.md`. | **Kalob approves the visual direction on desktop and mobile** | Week 1 to 2 |
| 2. System and homepage | Extract tokens and components, finish the homepage, mobile art-direction pass, copy pass with real facts | Homepage approved | Week 2 to 3 |
| 3. Interior pages | ABA Therapy, Getting Started, Insurance, About, Visit, FAQ, Privacy, Accessibility, 404, Thank-you | Page bundle approved | Week 3 to 5 |
| 4. Intake and analytics | HighLevel HIPAA account, contact step wired, end-to-end test into HighLevel, notifications, privacy-safe analytics events | A real test lead lands in HighLevel with the correct fields | Week 4 to 6 |
| 5. Content | 4 launch articles drafted, BCBA-reviewed, sourced | Client sign-off | Week 3 to 6 |
| 6. QA and launch | Full QA (section 13), redirects, schema validation, Lighthouse and CWV, accessibility audit, DNS cutover, Search Console and Bing, sitemap submit, Business Profile website link | Technical, visual, and business verdicts all pass, and the client approves | Week 6 to 7 |
| 7. Local SEO rollout | Business Profile build-out, listing cleanup, BCBS directory check, DMH guide listing, local outreach | | Weeks 7 to 10 |
| 8. Grow | 2 articles a month, monthly Business Profile photos and posts, rank grid and KPI report, city pages only with evidence | Monthly review | Ongoing |

---

## 13. QA and launch checklist (abbreviated; use the Aurex `LAUNCH-CHECKLIST.md` in full)

- Production build passes, plus typecheck, lint, and screener unit tests (every branch).
- Visual review at 360, 390, 430, 768, 1024, 1440, 1920, and 2560px, in real scroll states and with reduced motion.
- Every font glyph renders with no fallback boxes. Every image loads at the right crop.
- Keyboard-only pass: nav, the screener (open, back, close, Escape, restart), the FAQ, and focus return.
- axe automated scan with no serious issues, plus a manual screen-reader check of the screener.
- Business facts match across the footer, schema, Business Profile, and NPPES.
- Schema validates in Google's Rich Results Test and the Schema.org validator.
- Redirects return 301. Canonicals, sitemap, and robots are correct, and production has no `noindex`.
- Core Web Vitals in the lab (Lighthouse mobile) are green. Field data is monitored in Search Console after launch.
- Intake: a real submission reaches HighLevel, notifications fire, duplicate submits are blocked, network-failure states work, and no personal data appears in analytics or logs.
- No console errors, no mixed content, security headers present.
- Three recorded verdicts (technical, visual, business/content), plus explicit human visual approval.

---

## 14. Questions for the client (blocking items first)

**Blocking for launch**
1. What's the exact age range, and what's the "but..." exception?
2. Which BCBS of Mississippi products do you accept? Do you take other Blue plans, Medicaid, CHIP, TRICARE, or other carriers?
3. Is 662-539-7129 the right public number? Which email should families use?
4. Is there a Horn Lake location now, or was there ever one?
5. What's Jimbo's full name, role, and credentials, and how should he be named publicly?
6. Who is in each photo? Do you have signed releases for every child? Are any of the children clients?
7. Did you buy commercial licenses for Rovey and White Angelica? If not, will you approve buying them?
8. Do you have the logo in vector format (AI, SVG, EPS)?
9. What are your hours, and which days do services run?
10. Do you already have a Google Business Profile? Please share manager access.
11. Will you approve the HighLevel HIPAA add-on and BAA, and a BAA with Aurex?

**Important for content**
12. Where do sessions happen: clinic only, home, school, daycare?
13. Do you offer parent or caregiver training, and how are parents involved?
14. Typical hours per week, and how is the weekly schedule set?
15. Is the garden part of therapy sessions, and are you comfortable featuring it?
16. Is there a waitlist? How long until a new family can be assessed? (Only published if you want it.)
17. Do you prefer "autistic child" or "child with autism"?
18. How would you describe your approach in your own words (for example assent, play, natural environment)? We won't use labels you don't use.
19. Who refers families to you (pediatricians, schools, evaluators)?
20. Can private pay rates be discussed publicly, or only on a call?
21. Is your Notice of Privacy Practices available as a PDF?
22. Any community involvement you'd like mentioned (events, partnerships)?
23. Are you hiring RBTs or BCBAs?

---

## 15. Sources

- NPPES NPI Registry API: [NPI 1760190078](https://npiregistry.cms.hhs.gov/api/?number=1760190078&version=2.1) (organization) and NPI 1073199857 (Anna Claire Waldrop)
- Domain: whois for wildandfreebehavior.com (GoDaddy, registry expiry 2027-10-18); live site serves the GoDaddy `/lander` parking page; MX for wildandfreebehaviorllc.com points to Google
- [Mississippi Autism Board license verification](https://www.msautismboard.ms.gov/secure/licenseverificationdetails.asp?ID=105) (King Therapies record)
- [Healthline FindCare: Bailey King, BCBA, New Albany MS](https://care.healthline.com/find-care/provider/bailey-king-1083170054)
- [Daily Journal: Autism Center of North Mississippi](https://www.djournal.com/eedition/page-a10/page_cc653557-6cbc-5bdc-ba70-3e95a3267abb.html)
- [Mississippi DMH Autism Resource Guide (2026)](https://www.dmh.ms.gov/wp-content/uploads/2026/04/Autism-Resource-Guide.pdf) and [2023 MDRS autism resources](https://www.mdrs.ms.gov/sites/default/files/2023-09/Autism%20Resources%2008-23.pdf)
- [MS Insurance Dept: BCBS ABA prior authorization](https://www.mid.ms.gov/healthcare/pdf/Blue%20Cross%20Blue%20Shield.pdf) and [BCBSMS ABA coding policy](https://beblue.bcbsms.com/policy-search/coding/policy-detail/applied-behavioral-analysis-aba-coding-policy)
- [Autism Speaks: Mississippi insurers lift age cap](https://autismspeaks.org/advocacy-news/mississippis-major-health-insurers-lift-age-cap-aba-coverage) and [Mississippi state-regulated coverage](https://autismspeaks.org/mississippi-state-regulated-insurance-coverage)
- [BACB Ethics Code for Behavior Analysts](https://bacb.com/wp-content/ethics-code-for-behavior-analysts/) and [BACB Oct 2024 newsletter on testimonials](https://www.bacb.com/wp-content/Oct2024_Newsletter)
- [GHL Experts: HighLevel HIPAA compliance](https://www.ghlexperts.com/guides/gohighlevel-hipaa-compliance) and [HighLevel ideas board, HIPAA pricing](https://ideas.gohighlevel.com/hipaa-compliance/p/the-price-of-297-per-month-is-extreme) (third-party; confirm with HighLevel)
- [Vercel: HIPAA BAAs available to Pro teams](https://vercel.com/changelog/hipaa-baas-are-now-available-to-pro-teams) and [Vercel Pro plan add-ons](https://docs.vercel.com/docs/plans/pro-plan)
- [MoFo: HHS withdraws appeal on tracking guidance](https://www.mofo.com/resources/insights/240930-a-mofo-privacy-minute-q-a-hhs-withdraws)
- [Google: Changes to HowTo and FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- Font licenses: [Rovey on FontSpace](https://www.fontspace.com/rovey-font-f96488) (demo, personal use; full version via Craft Supply Co.), [White Angelica on FontSpace](https://www.fontspace.com/white-angelica-font-f31975) (personal use; commercial via Creatype Studio)
- Google autocomplete (suggestqueries endpoint), pulled 2026-10-27
