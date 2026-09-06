import { defineSiteConfig } from "./lib/site-contract/site-config.ts";

import rawConfig from "./site.config.json" with { type: "json" };

export const siteConfig = defineSiteConfig(rawConfig);
