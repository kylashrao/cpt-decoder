import { fileURLToPath } from "node:url";

export default {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  async rewrites() {
    return {
      // Override the checked-in fallback with a crawler-ready absolute sitemap URL.
      beforeFiles: [{ source: "/robots.txt", destination: "/crawler-robots" }],
    };
  },
};
