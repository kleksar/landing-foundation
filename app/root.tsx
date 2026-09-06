import { type ReactNode, useEffect } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { siteConfig } from "../site.config";
import "./app.css";

export function Layout({ children }: { readonly children: ReactNode }) {
  return (
    <html lang={siteConfig.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  useEffect(() => {
    document.documentElement.dataset.hydrated = "true";
    return () => {
      delete document.documentElement.dataset.hydrated;
    };
  }, []);

  return <Outlet />;
}

export function ErrorBoundary({ error }: { readonly error: unknown }) {
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Unexpected application error";

  return (
    <main className="error-page" id="main-content">
      <p className="eyebrow">Request failed</p>
      <h1>{message}</h1>
      <a href="/">Return home</a>
    </main>
  );
}
