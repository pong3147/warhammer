import { CORE_DATA } from "./core/index.js";
import { createImperiumEngine } from "../engine/createEngine.js";

let fullBundlePromise = null;
let cachedBundle = null;

export { CORE_DATA };

export const coreEngine = createImperiumEngine(CORE_DATA);

export async function loadFullGameRuntime() {
  if (cachedBundle) return cachedBundle;
  if (!fullBundlePromise) {
    fullBundlePromise = import("./narrative.js")
      .then(({ EVENTS, CHRONICLES }) => {
        const data = {
          ...CORE_DATA,
          EVENTS,
          CHRONICLES
        };
        const engine = createImperiumEngine(data);
        cachedBundle = { data, engine };
        return cachedBundle;
      })
      .catch((err) => {
        fullBundlePromise = null;
        throw err;
      });
  }
  return fullBundlePromise;
}
