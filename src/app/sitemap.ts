import type { MetadataRoute } from "next";
import { codes, cptPath } from "../lib/cpt";
import { guidePath, guides } from "../lib/guides";
import { siteOrigin, trustLinks } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/", "/guides", "/dispute-letter",
    ...trustLinks.map(({ href }) => href),
    ...guides.map(guidePath),
    ...codes.map(cptPath),
  ].map((path) => ({ url: new URL(path, siteOrigin).href }));
}
