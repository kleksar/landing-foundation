export interface ManifestEntry {
  readonly css?: readonly string[];
  readonly dynamicImports?: readonly string[];
  readonly file: string;
  readonly imports?: readonly string[];
  readonly isEntry?: boolean;
}

export type BuildManifest = Readonly<Record<string, ManifestEntry>>;

export interface InitialAssets {
  readonly css: readonly string[];
  readonly javascript: readonly string[];
}

export function calculateInitialAssets(manifest: BuildManifest): InitialAssets {
  const javascript = new Set<string>();
  const css = new Set<string>();
  const visited = new Set<string>();

  function visit(key: string): void {
    if (visited.has(key)) {
      return;
    }

    const entry = manifest[key];
    if (!entry) {
      throw new Error(`Manifest references missing static chunk: ${key}`);
    }

    visited.add(key);
    javascript.add(entry.file);
    for (const stylesheet of entry.css ?? []) {
      css.add(stylesheet);
    }
    for (const importedKey of entry.imports ?? []) {
      visit(importedKey);
    }
  }

  for (const [key, entry] of Object.entries(manifest)) {
    if (entry.isEntry) {
      visit(key);
    }
  }

  return {
    javascript: [...javascript].sort(),
    css: [...css].sort(),
  };
}
