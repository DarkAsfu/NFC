/**
 * Next.js (dev overlay) checks `typeof localStorage !== "undefined"` and then calls `localStorage.getItem`.
 * On some Node versions (notably v25.x on Arch at the moment), `globalThis.localStorage` exists but is not a
 * browser-like Storage object (e.g. `getItem` is undefined), which crashes Next during SSR/dev.
 *
 * This preload runs in Node *before* Next loads and removes broken WebStorage globals so Next treats them as absent.
 */

function deleteIfBroken(name) {
  try {
    const value = globalThis[name];
    if (!value) return;

    const hasBrowserStorageShape =
      typeof value.getItem === "function" &&
      typeof value.setItem === "function" &&
      typeof value.removeItem === "function";

    if (!hasBrowserStorageShape) {
      // Best-effort: make it truly "undefined" for feature-detection checks.
      try {
        delete globalThis[name];
      } catch {
        // If deletion fails (non-configurable), shadow it.
        globalThis[name] = undefined;
      }
    }
  } catch {
    // ignore
  }
}

deleteIfBroken("localStorage");
deleteIfBroken("sessionStorage");


