# How to Create a News or Event Post

- Create a new `.astro` file in `src/components/04-news-events-page/posts/`
- Name the file using the format `YYYY-MM-short-description.astro` (e.g. `2026-05-new-partnership.astro`) — this becomes the URL
- Copy the template below into your file and fill in the metadata fields
- Set `type` to either `"news"` or `"event"`
- For events, add a `location` field (e.g. `"Online"` or `"Melbourne, Australia"`)
- Write your content below the second `---` using plain HTML `<p>` tags
- Save the file — the post will appear on the listing page and at its own URL automatically

## Template

```astro
---
export const metadata = {
  title: "Your Post Title",
  date: "2026-05-01",
  type: "news",
};
---

<p>Write your content here.</p>
```

## Event template

```astro
---
export const metadata = {
  title: "Your Event Title",
  date: "2026-05-01",
  type: "event",
  location: "Online",
};
---

<p>Write your content here.</p>
```
