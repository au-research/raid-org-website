# How to Create a News or Event Post

## 1. Create a new file in this folder

Name the file using the format: `YYYY-MM-short-description.astro`

Examples:
- `2026-05-new-partnership.astro`
- `2026-06-annual-conference.astro`

The filename becomes the URL slug, e.g. `/news-events/2026-05-new-partnership`

---

## 2. Copy this template into your file

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

---

## 3. Fill in the metadata

| Field      | Required | Description                                      |
|------------|----------|--------------------------------------------------|
| `title`    | Yes      | The title shown on the listing and post page     |
| `date`     | Yes      | Publication date in `YYYY-MM-DD` format          |
| `type`     | Yes      | Either `"news"` or `"event"`                     |
| `location` | No       | For events only — e.g. `"Online"` or `"Sydney"`  |

### News post example

```astro
---
export const metadata = {
  title: "RAiD Reaches 1000 Registered Institutions",
  date: "2026-05-10",
  type: "news",
};
---

<p>We are thrilled to announce that RAiD has reached a major milestone...</p>
```

### Event post example

```astro
---
export const metadata = {
  title: "RAiD Workshop at eResearch Australasia",
  date: "2026-10-20",
  type: "event",
  location: "Adelaide, Australia",
};
---

<p>Join us at eResearch Australasia for a hands-on RAiD workshop.</p>
<p>Registration opens in August. More details to follow.</p>
```

---

## 4. Write your content

Everything below the `---` closing fence is your post body. Use standard HTML tags:

```html
<p>A paragraph of text.</p>

<p>Another paragraph.</p>

<ul>
  <li>A bullet point</li>
  <li>Another bullet point</li>
</ul>

<a href="https://example.com">A link</a>
```

---

## 5. Save and done

The post will automatically appear:
- On the listing page (`/news-events/`)
- At its own URL (`/news-events/your-filename`)

Events are sorted by date and split into **Upcoming** and **Past** automatically.
News posts are sorted newest first.

No other files need to be changed.
