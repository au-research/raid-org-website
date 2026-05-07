import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection(
    "news-events",
    ({ data }) => !data.draft && data.type === "news"
  );

  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: "RAiD News",
    description: "Latest news from the Research Activity Identifier (RAiD)",
    site: context.site ?? "https://raid.org",
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/news-events/${post.slug}`,
      ...(post.data.author && {
        customData: `<dc:creator>${post.data.author}</dc:creator>`,
      }),
    })),
    customData: `<language>en-AU</language>`,
    xmlns: { dc: "http://purl.org/dc/elements/1.1/" },
  });
}
