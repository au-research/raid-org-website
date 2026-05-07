# How to Create a News or Event Post

## Folder structure

Each post lives in its own folder under `src/content/news-events/news/` or `src/content/news-events/events/`. Images are co-located in the same folder as the post.

```
src/content/news-events/
  news/
    2026-05-new-partnership/   ← one folder per post
      index.md                 ← post content and frontmatter
      hero.webp                ← images sit alongside index.md
      chart.png
  events/
    2026-06-my-event/
      index.md
      hero.webp
```

- Name the folder using `YYYY-MM-short-description` (e.g. `2026-05-new-partnership`) — this becomes the URL slug
- The post content goes in `index.md` inside that folder
- Drop any images for the post into the same folder
- Reference images in frontmatter with `./hero.webp` and inline with `![Alt text](./chart.png)`

For images shared across multiple posts, place them in `src/content/news-events/_shared/` (the `_` prefix tells Astro to ignore the folder as content) and reference with `../_shared/image.webp`.

---

## News fields

| Field          | Required | Type         | Notes                                                                                          |
|----------------|----------|--------------|------------------------------------------------------------------------------------------------|
| `type`         | Yes      | `"news"`     | Must be exactly `"news"`                                                                       |
| `title`        | Yes      | string       | Shown on listing and post page                                                                 |
| `date`         | Yes      | `YYYY-MM-DD` | Publication date — used for sorting                                                            |
| `summary`      | Yes      | string       | Preview shown on listing — max 200 characters                                                  |
| `author`       | No       | string       | e.g. `"Jane Smith"`                                                                            |
| `tags`         | No       | string list  | e.g. `["api", "update"]`                                                                       |
| `heroImage`    | No       | image path   | e.g. `"./hero.webp"` — must be co-located in the post folder                                  |
| `heroImageAlt` | No*      | string       | Alt text for the hero image — required if `heroImage` is set; use `""` only for decorative images |
| `draft`        | No       | boolean      | Set to `true` to hide from the site                                                            |

## Event fields

Same as news, plus:

| Field          | Required | Type         | Notes                                                         |
|----------------|----------|--------------|---------------------------------------------------------------|
| `type`         | Yes      | `"event"`    | Must be exactly `"event"`                                     |
| `location`     | Yes      | string       | e.g. `"Online"` or `"Melbourne, Australia"`                   |
| `eventDate`    | Yes      | `YYYY-MM-DD` | Date the event occurs — used for upcoming/past sorting        |

---

## News template

```md
---
title: "Your Post Title"
date: "2026-05-01"
type: "news"
summary: "A short summary shown on the listing page — keep it under 200 characters."
author: "Jane Smith"
tags: ["update", "api"]
heroImage: "./hero.webp"
heroImageAlt: "A descriptive caption for the hero image"
draft: false
---

Full detailed content shown on the individual post page.

You can use **bold**, *italic*, [links](https://example.com), and more.

Inline images work too:

![A chart showing RAiD adoption over time](./chart.png)

## Subheadings work too

- Bullet lists
- Like this
```

## Event template

```md
---
title: "Your Event Title"
date: "2026-05-01"
eventDate: "2026-06-15"
type: "event"
summary: "A short summary shown on the listing page — keep it under 200 characters."
location: "Online"
author: "Jane Smith"
tags: ["webinar"]
heroImage: "./hero.webp"
heroImageAlt: "A descriptive caption for the hero image"
draft: false
---

Full event details shown on the individual post page.

- Time: 10:00 AM AEST
- Format: Online (Zoom)
- Cost: Free

[Register here](https://example.com)
```

---

## Alt text guidance

- **Always provide `heroImageAlt`** when you set `heroImage` — required for accessibility and screen readers.
- Write what the image shows, not "image of…" — e.g. `"RAiD logo on a blue background"`, not `"Image of the RAiD logo"`.
- Use `heroImageAlt: ""` only when an image is purely decorative (adds no information). This tells screen readers to skip it.

---

## Validation errors

If you make a mistake, the build stops with a clear message. Common errors:

- Missing `title` → `title is required`
- Missing or bad `date` → `date must be a valid date in YYYY-MM-DD format`
- Wrong `type` value → `type must be "news" or "event"`
- `summary` too long → `summary must be 200 characters or fewer`
- Missing `location` on an event → `location is required for events`
- Missing `eventDate` on an event → `eventDate is required for events`

## Draft posts

Set `draft: true` to save a post without publishing it. It will not appear on the listing page or have a URL until you change it to `false`. In dev mode, draft posts are visible with a yellow "Draft" badge.

---

## Tags

Tags are free-form strings — just add them to the `tags` array and they appear automatically across the site. No registration or configuration needed.

- Tag badges on cards and post pages are clickable links to `/news-events/tag/{tag}`
- All tags are listed at `/news-events/tags` with post counts
- New tags appear in both pages the moment they are used in any published post

---

## RSS feed

The news RSS feed is available at `/news-events/rss.xml`. It updates automatically on every build — no manual steps needed. Subscribe in any feed reader using that URL.

Only published news posts (`type: "news"`, `draft: false`) appear in the feed. Events are not included.
