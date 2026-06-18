import type { MetadataRoute } from "next";

// TODO: заменить на реальный домен, когда будет известен
const BASE_URL = "https://ak-team.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
