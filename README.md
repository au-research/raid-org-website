# raid.org - Astro static app for the Research Activity Identifier

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   ├── components/
│   │   ├── 01-index-page/
│   │   ├── 02-about-page/
│   │   ├── 03-what-is-raid/
│   │   └── layout-components/
│   ├── images/
│   │   ├── backgrounds/
│   │   ├── icons/
│   │   └── logos/
│   ├── layouts/
│   │   └── main.astro
│   └── pages/
│       ├── 404.html
│       ├── about.astro
│       ├── contact.astro
│       ├── index.astro
│       └── what-is-raid.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Components are organized by page in numbered directories under `src/components/`.

Static assets like images are placed in the `src/images/` directory.

## 🔎 RAiD Search

- [https://raid.org/search](https://raid.org/search)

## 🔀 RAiD Resolver

- [https://raid.org/{prefix}/{suffix}](https://raid.org/{prefix}/{suffix})
- Example:
  - [https://raid.org/102.100.100/601891](https://raid.org/102.100.100/601891) ➡️ [https://static.prod.raid.org.au/raids/102.100.100/601891/](https://static.prod.raid.org.au/raids/102.100.100/601891)

## 📝 Editing Content

To edit content on the site:

1. Navigate to the page you want to modify in `src/pages/`
2. For each page, the content is split into modular components in the corresponding numbered directory under `src/components/`
3. Edit the `.astro` component files to update text, images, and layout
4. Components are numbered to indicate their order on the page
5. Layout components like the navbar and footer are in `src/components/layout-components/`

## 🎨 Styling with Tailwind CSS

This site uses Tailwind CSS for styling:

- All styling is done using Tailwind's utility classes directly in the HTML/Astro templates
- The Tailwind configuration is in `tailwind.config.mjs` where you can customize colors, fonts, and other design tokens
- No separate CSS files are needed for most styling tasks
- For responsive design, use Tailwind's built-in breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, etc.

To learn more about Tailwind:

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)
- [Tailwind + Astro Integration Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind/)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Astro documentation

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## 🎛️ Lighthouse Score

Perfect lighthouse score

![lighthouse score](./.github/images/lighthouse.webp "Lighthouse score")
