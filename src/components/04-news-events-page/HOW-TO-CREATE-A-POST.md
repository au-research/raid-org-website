# How to Create a News or Event Post

- Create a new `.md` file in `src/content/news-events/`
- Name the file using the format `YYYY-MM-short-description.md` (e.g. `2026-05-new-partnership.md`) — this becomes the URL
- Copy the relevant template below and fill in all required fields
- Save the file — if any required field is missing or wrong, **the build will fail with a clear error message**

---

## News fields

| Field       | Required | Type          | Notes                                         |
|-------------|----------|---------------|-----------------------------------------------|
| `type`      | Yes      | `"news"`      | Must be exactly `"news"`                      |
| `title`     | Yes      | string        | Shown on listing and post page                |
| `date`      | Yes      | `YYYY-MM-DD`  | Publication date — used for sorting           |
| `summary`   | Yes      | string        | Preview shown on listing — max 200 characters |
| `author`    | No       | string        | e.g. `"Jane Smith"`                           |
| `tags`      | No       | string list   | e.g. `["api", "update"]`                      |
| `heroImage` | No       | image path    | e.g. `"../../images/my-image.png"`            |
| `draft`     | No       | boolean       | Set to `true` to hide from the site           |

## Event fields

Same as news, plus:

| Field           | Required | Type         | Notes                                            |
|-----------------|----------|--------------|--------------------------------------------------|
| `type`          | Yes      | `"event"`    | Must be exactly `"event"`                        |
| `eventDate`     | Yes      | `YYYY-MM-DD` | When the event happens — used for upcoming/past  |
| `location` | Yes      | string       | e.g. `"Online"` or `"Melbourne, Australia"`      |

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
draft: false
---

Full detailed content shown on the individual post page.

You can use **bold**, *italic*, [links](https://example.com), and more.

## Subheadings work too

- Bullet lists
- Like this
```

## Event template

```md
---
title: "Your Event Title"
date: "2026-05-01"
type: "event"
summary: "A short summary shown on the listing page — keep it under 200 characters."
eventDate: "2026-06-15"
location: "Online"
author: "Jane Smith"
tags: ["webinar"]
draft: false
---

Full event details shown on the individual post page.

- Time: 10:00 AM AEST
- Format: Online (Zoom)
- Cost: Free

[Register here](https://example.com)
```

---

## Validation errors

If you make a mistake, the build stops with a clear message. Common errors:

- Missing `title` → `title is required`
- Missing or bad `date` → `date must be a valid date in YYYY-MM-DD format`
- Wrong `type` value → `type must be "news" or "event"`
- `summary` too long → `summary must be 200 characters or fewer`
- Missing `eventDate` on an event → `eventDate is required for events`
- Missing `location` on an event → `location is required for events`

## Draft posts

Set `draft: true` to save a post without publishing it. It will not appear on the listing page or have a URL until you change it to `false`.
