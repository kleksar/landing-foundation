// Local acceptance only: the official Chrome Stable .deb was extracted without OS installation.
import original from "/workspace/scratch/77210dfccb4d/playwright.config.ts";

export default {
  ...original,
  projects: original.projects?.map((project) =>
    project.name === "chrome"
      ? {
          ...project,
          use: {
            ...project.use,
            launchOptions: {
              executablePath: "/tmp/landing-browser-stage42/chrome-stable/opt/google/chrome/chrome",
            },
          },
        }
      : project,
  ),
};
