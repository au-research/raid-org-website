# How to Create a News or Event Post

- Create a new `.astro` file in `src/components/04-news-events-page/posts/`
- Name the file using the format `YYYY-MM-short-description.astro` (e.g. `2026-05-new-partnership.astro`) — this becomes the URL
- Copy the template below into your file and fill in the metadata fields
- Set `type` to either `"news"` or `"event"`
- Write a short `excerpt` (1–2 sentences) — this is shown as the preview on the listing page
- For events, add a `location` field (e.g. `"Online"` or `"Melbourne, Australia"`)
- Write the full detailed content below the second `---` using plain HTML `<p>` tags
- Save the file — the post will appear on the listing page and at its own URL automatically

## News template

```astro
---
export const metadata = {
  title: "Your Post Title",
  date: "2026-05-01",
  type: "news",
  excerpt: "A short 1–2 sentence summary shown on the listing page.",
};
---

<p>Full detailed content shown on the individual post page.</p>
<p>You can add as many paragraphs as you like.</p>
```

## Event template

```astro
---
export const metadata = {
  title: "Your Event Title",
  date: "2026-05-01",
  type: "event",
  location: "Online",
  excerpt: "A short 1–2 sentence summary shown on the listing page.",
};
---

<p>Full event details shown on the individual post page.</p>
<ul>
  <li>Date: 1 May 2026</li>
  <li>Time: 10:00 AM AEST</li>
  <li>Format: Online (Zoom)</li>
</ul>
```
