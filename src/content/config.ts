import { defineCollection, z } from "astro:content";

const newsEvents = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("news"),
        title: z.string({
          required_error: "title is required",
        }),
        date: z.coerce.date({
          required_error: "date is required — use YYYY-MM-DD format",
          invalid_type_error: "date must be a valid date in YYYY-MM-DD format",
        }),
        summary: z
          .string({
            required_error:
              "summary is required — used as the preview on the listing page",
          })
          .max(200, "summary must be 200 characters or fewer"),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        heroImage: image().optional(),
        draft: z.boolean().default(false),
      }),

      z.object({
        type: z.literal("event"),
        title: z.string({
          required_error: "title is required",
        }),
        date: z.coerce.date({
          required_error: "date is required — use YYYY-MM-DD format",
          invalid_type_error: "date must be a valid date in YYYY-MM-DD format",
        }),
        summary: z
          .string({
            required_error:
              "summary is required — used as the preview on the listing page",
          })
          .max(200, "summary must be 200 characters or fewer"),
        author: z.string().optional(),
        tags: z.array(z.string()).optional(),
        heroImage: image().optional(),
        draft: z.boolean().default(false),
        location: z.string({
          required_error:
            'location is required for events — e.g. "Online" or "Melbourne, Australia"',
        }),
        eventDate: z.coerce.date({
          required_error:
            "eventDate is required for events — use YYYY-MM-DD format",
          invalid_type_error:
            "eventDate must be a valid date in YYYY-MM-DD format",
        }),
      }),
    ]),
});

export const collections = {
  "news-events": newsEvents,
};
