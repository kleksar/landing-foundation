import { buildMetadata } from "../../lib/site-contract/metadata.ts";

import { siteConfig } from "../../site.config";
import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [...buildMetadata(siteConfig)];
}

const guarantees = [
  ["Static first", "Every public route is prerendered and verified without JavaScript."],
  ["TDD enforced", "Contracts fail before implementation and run again against production output."],
  ["Agent scoped", "Each landing owns its context, assets, copy, and visual decisions."],
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">AI-first landing foundation</p>
        <h1 id="hero-title">One predictable base. Every landing stays distinct.</h1>
        <p className="lede">
          React Router prerendering, strict contracts, and a small dependency surface give coding
          agents fast feedback without turning every brand into the same template.
        </p>
        <a className="primary-action" data-primary-cta href={siteConfig.primaryCta.href}>
          {siteConfig.primaryCta.label}
        </a>
      </section>

      <section className="foundation" id="foundation" aria-labelledby="foundation-title">
        <div>
          <p className="eyebrow">Foundation contract</p>
          <h2 id="foundation-title">Safe defaults that remain easy to replace</h2>
        </div>
        <ul className="guarantees">
          {guarantees.map(([title, description]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
