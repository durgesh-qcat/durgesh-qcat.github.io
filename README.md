# Durgesh Kumar — Academic website

A minimal academic website based on the user-selected reference [satpreetmakhija.com](https://satpreetmakhija.com/): fixed top navigation, an 800px reading column, locally bundled Libre Baskerville, white background, and burgundy links.

The navigation opens **About**, **Publications**, **Talks**, **Outreach & teaching**, and **Math–AI**. About contains the biography, portrait, contact links, and highlights for publications, the thesis, and outreach and teaching. Highlight links open the paper, thesis PDF, blog post, or course materials directly, without extra “Details” links. Both About and Publications have one **Thesis PDF** link pointing to the university-hosted copy; old `/thesis/` links redirect directly to that PDF too. The full sections remain accessible through the top navigation. On narrow screens, all navigation links remain visible in two rows.

The reference uses [Satpreet Makhija’s al-folio fork](https://github.com/SatpreetMakhija/satpreetmakhija.github.io); its MIT notice is preserved in `LICENSE-AL-FOLIO`. This implementation retains the project's Next.js/Vinext architecture.

## Preview

Use Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open the local address printed by the server.

## Content and CV

- `content/academic-profile.json`: shared profile, About statement, publication, thesis, education, research, teaching, outreach, talks, awards, and Math–AI projects.
- `app/content.ts`: website exports of the shared data.
- `app/components/about-statement.tsx`: renders the exact shared About paragraphs, including Robin Cockett’s Wikipedia link and both TalTech research group links.
- `app/components/blog-posts.tsx`: renders the same blog titles, grey subtitles, descriptions, and links on Math–AI and Outreach & teaching. The CV lists each blog only once under Mathematics and AI projects.
- `app/components/thesis-entry.tsx`: the shared thesis title (linked directly to the university PDF), degree details, supervisor, nomination, and university-hosted PDF link used on About and Publications.
- `app/publications/page.tsx`: ACT publication, separate thesis section, and a Work in progress section on chiral daggers and quantum protocols.
- `app/outreach-teaching/page.tsx`: Linear Actegories and Applied Category Theory highlights, followed by both blog posts; the full teaching history is in the CV.
- `app/talks/page.tsx`: talks and posters, including the FMCS 2025/2024 slide links, Alberta Mathematical Dialogues slides, and Quantum Horizons poster download. Material links come from each talk's `links` array in the shared JSON and consistently use **Slides (PDF)** or **Poster (PDF)**. Apply this convention to future entries too.
- `app/math-ai/page.tsx`: the opening paragraphs from `mathAiIntro`, followed by Heisenberg from `mathAiFeaturedPost` and further posts from `mathAiAdditionalPosts`, each with a linked title, exact grey subtitle, and dark description. The projects follow the posts, with Inverse Galois Problem and LemmaPortfolio before the sheaf calculator and one Ongoing work paragraph combining ACC, Lean formalisation, and Indus-script research. `mathAiOngoing` stores text/href parts, with separate links labelled repository for the GR and Indus projects. The blogs, projects, research, and ongoing work are also included in the CV; the introductory paragraphs appear only on the website.
- `public/cv/durgesh-kumar-cv.pdf`: downloadable three-page academic CV.
- `public/thesis/durgesh-kumar-msc-thesis.pdf`: thesis from the university-hosted public copy.
- `public/posters/quantum-horizons-2025.pdf`: supplied International Quantum Horizons Symposium poster, preserved unchanged.
- `public/slides/alberta-mathematical-dialogues-2025.pdf`: supplied Alberta Mathematical Dialogues 2025 slides, preserved unchanged.
- `scripts/build-cv.py`: rebuilds the CV from the same JSON, including every blog title/subtitle/description, current research, and the combined ongoing-project paragraph with all links. The blogs remain before the projects under Mathematics and AI projects. Body text, metadata/subtitles, and links/headings use the website's dark, grey, and burgundy colours.
- `public/images/durgesh-kumar-outdoors.jpg`: supplied portrait, displayed in a circular frame beside About text; clicking it opens the full image. A linked graduation-cap icon for Google Scholar appears directly beneath the photograph.
- `app/globals.css`: typography, colors, responsive layout, and portrait framing.

The website uses the original September 11 palette: white background, #171717 main text, #686868 secondary text, #8a2d3b links, and #6b1f2b link hover. Preserve this palette unless the user explicitly asks to change it. The user's latest direction is to use grey minimally, for brief metadata such as dates, venues, subtitles, and footer text. Keep introductions, project descriptions, and other substantive paragraphs in the main dark text colour. Talk dates and all supporting prose, including the thesis degree/institution/year and supervisor lines, use the main dark text colour. Use smaller type and spacing for supporting prose rather than reducing its contrast. Author bylines use regular-weight dark text; the thesis national-award nomination uses regular-weight italics in dark text, on its own line in the CV. Do not introduce extra grey shades or lighten body text. The recovered historical stylesheet is archived under `.local/design-archive/globals-2026-09-11.css`.

The original CV is preserved outside the project. The revised PDF is also delivered under `output/pdf/` (ignored by Git). The downloadable copy under `public/cv/` is included in the website export.

To rebuild the CV on macOS with ReportLab and PyMuPDF installed:

```sh
python3 scripts/build-cv.py --data content/academic-profile.json --output output/pdf/durgesh-kumar-cv.pdf
cp output/pdf/durgesh-kumar-cv.pdf public/cv/durgesh-kumar-cv.pdf
```

The three-page PDF uses Georgia with burgundy headings and links, comfortable spacing, and the complete academic record. Its contact row includes a Website link using `profile.siteUrl`, including before deployment. Local talk-material URLs are expanded against `profile.siteUrl` in the CV; these links become publicly available after deployment. Check the rendered PDF after content edits. Update the JSON About paragraphs once to change the wording in both outputs, then rebuild the CV.

## GitHub Pages

Intended repository: `durgesh-qcat/durgesh-qcat.github.io`.

```sh
npm run build:pages
```

This statically exports the website to `out/`, including all PDFs and `.nojekyll`. Select **Settings → Pages → Source → GitHub Actions** in the repository. The included workflow builds and deploys pushes to `main` or a manual workflow run.

Public address: https://durgesh-qcat.github.io/. The GitHub Actions workflow publishes updates pushed to `main`. This setup targets a root user website; a repository subpath or custom domain requires updating the base path and `profile.siteUrl`.

## Validation

Run these sequentially because the two build tools share generated route files:

```sh
npm run lint
npm run typecheck
npm run build
npm run build:pages
```

Text and links render without client-side JavaScript. The CV and website share one About source; external URLs appear as meaningful linked names and titles.
