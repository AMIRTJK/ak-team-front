import type { MetadataRoute } from "next";

// TODO: заменить на реальный домен, когда будет известен
const BASE_URL = "https://ak-team.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
