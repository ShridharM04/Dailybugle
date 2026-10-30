# The Daily Bugle — Queens Edition

A responsive, fictional news experience centered on **Queens, New York** and its most famous friendly neighborhood hero, Spider-Man. Readers can browse local reports, search and filter coverage, open full articles, build a persistent reading list, and switch between light and dark themes.

> This is a fan-made demonstration project. Spider-Man and related names are the property of their respective rights holders. The site is not affiliated with Marvel, Sony, or an actual news organization.

## Features

- **Queens-focused home page** with a featured breaking story and neighborhood editorial styling
- **Nine complete stories** across City, Crime, Science, and Opinion
- **Responsive story grid** with image, category, date, headline, summary, and save control
- **Full article reader** with byline, reading time, hero image, caption, and article body
- **Live search** across story titles, summaries, and categories
- **Category filters** for quickly narrowing the newsroom feed
- **Saved Stories page** for a dedicated personal reading list
- **Persistent bookmarks** stored in the browser with `localStorage`
- **Persistent dark mode** that remembers the reader’s preference
- **Responsive navigation** and layouts for phones, tablets, and desktops
- **Accessible controls** with semantic labels, button states, image alt text, and keyboard support

## Visual Direction

The interface combines a traditional metropolitan newspaper with Spider-Man’s Queens identity:

- **Bugle red** is used for breaking news, bookmarks, and editorial emphasis.
- **Hero blue** identifies neighborhood context, categories, active filters, and interactive accents.
- A restrained **web pattern** appears in the masthead mark and lead-story background.
- **Playfair Display** provides expressive newspaper headlines.
- **DM Sans** keeps controls, metadata, and supporting copy clear and contemporary.
- Queens and East River photography grounds the fictional reporting in a recognizable city environment.

The theme is tokenized in `src/index.css`, making the palette and surfaces easy to change in one place.

## Technology

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 plus project CSS |
| Formatting | oxfmt |
| Package manager | pnpm 10 |
| Runtime | Node.js 22 |
| Persistence | Browser `localStorage` |
| Images | Unsplash |

No backend, account, database, or API key is required.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 22
- [pnpm](https://pnpm.io/) 10.34 or newer

The repository includes `.mise.toml`, so users of [mise](https://mise.jdx.dev/) can install the expected tools automatically:

```bash
mise install
```

### Install dependencies

```bash
pnpm install
```

### Start local development

```bash
pnpm dev
```

Vite serves the project on port `8443` by default. A different port can be supplied through the `PORT` environment variable:

```bash
PORT=3000 pnpm dev
```

When running inside Figma Make, the development server is already managed by the environment and should not be started manually.

### Create a production build

```bash
pnpm build
```

The optimized site is written to `dist/`.

### Preview the production build

```bash
pnpm preview
```

### Format source files

```bash
pnpm format
```

## Project Structure

```text
.
├── .figma/
│   └── make/
│       └── site.json       # Page title, description, robots, and platform metadata
├── src/
│   ├── App.tsx             # Application views, controls, persistence, and components
│   ├── index.css           # Theme tokens, typography, layouts, responsive styles
│   ├── main.tsx            # React entry point
│   └── stories.ts          # Story type and all editorial content
├── .mise.toml              # Node and pnpm tool versions
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite, React, Tailwind, and Figma Make configuration
└── README.md
```

## How the App Works

### Views and navigation

The app is intentionally frontend-only. `App.tsx` keeps a small `View` state that selects one of three experiences:

- `home` renders the featured story, filters, and story grid.
- `article` renders the selected story’s full article.
- `saved` renders only bookmarked stories.

Selecting a card changes the view to the corresponding article and scrolls to the top. The masthead and back control return readers to the feed.

### Story data

All content lives in `src/stories.ts`. Every story follows the shared `Story` type:

```ts
type Story = {
  id: number
  title: string
  category: 'City' | 'Crime' | 'Science' | 'Opinion'
  date: string
  readTime: string
  image: string
  imageAlt: string
  photographer: string
  dek: string
  body: string[]
}
```

To add a story, append another object with a unique numeric `id`. Stories after the first item appear in the standard grid; the first story is treated as the featured lead.

### Search and category filtering

Search and category state are combined with `useMemo`. A story is shown when:

1. Its category matches the active category, or the filter is `All`.
2. Its title, summary, or category contains the search term.

Filtering runs locally and updates as the reader types. No request is sent to a server.

### Saved-story persistence

Saved story IDs are stored under:

```text
bugle-saved
```

The initial React state reads and safely parses the value. Every bookmark change writes the updated array back to `localStorage`. Because only stable story IDs are stored, the full story content continues to come from `stories.ts`.

To clear saved stories during development, remove `bugle-saved` from the browser’s local storage in developer tools.

### Theme persistence

The selected appearance is stored as:

```text
bugle-theme
```

When dark mode is active, React adds the `dark` class to the root `<html>` element. CSS custom properties in `src/index.css` then swap surfaces, text, lines, and accent values without duplicating component styles.

### Responsive behavior

The layout uses fluid type, CSS Grid, and two primary breakpoints:

- Below `900px`, the lead story and article body simplify and the story grid moves to two columns.
- Below `640px`, the feed becomes one column, navigation becomes a menu, and article typography and controls are adjusted for small screens.

## Customization

### Change colors

Edit the light and dark tokens at the top of `src/index.css`:

```css
:root {
  --paper: #f7f4ed;
  --ink: #171715;
  --red: #bc241f;
  --hero-blue: #174f88;
}
```

### Change fonts

The Google Fonts import is the first line of `src/index.css`. Update that import and the `font-family` declarations used for body copy and headings.

### Change the featured story

Move the desired story to the first position in the `stories` array. The application uses `stories[0]` for the lead and displays the remaining items in the Latest Stories grid.

### Replace photography

Update a story’s `image`, `imageAlt`, and `photographer` values together. Keep descriptive alt text for accessibility and maintain creator attribution.

## Browser Data and Privacy

The app stores only two pieces of information in the current browser:

- Saved story IDs
- Light or dark theme preference

The data never leaves the device. There are no accounts, cookies, analytics calls, forms, or server-side records in the application itself.

## Deployment

The output is a static single-page application and can be hosted on any platform that serves static files.

1. Run `pnpm build`.
2. Deploy the generated `dist/` directory.
3. Configure the host to serve the application entry point for client-side requests if needed.

The Vite `base` value automatically respects `FIGMA_PUBLIC_URL` when deployed through the Figma Make environment.

## Image Credits

Editorial images are loaded from Unsplash. Individual article captions display the relevant photographer credit. Because the app uses remote image URLs, an internet connection is needed for photography to appear.

## Limitations

- The article view uses in-memory navigation rather than URL-based routing.
- Bookmarks are local to one browser and device.
- Editorial data is bundled with the application and requires a code change to update.
- The content is fictional and intended for demonstration.

These constraints are deliberate: the brief calls for a frontend-only experience without a backend.
#
