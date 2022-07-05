import { isBrowser } from "utils/BrowserUtils";

export function isDevelopmentMode() {
  return process.env.NODE_ENV === "development";
}

type Logger = (...args: Array<unknown>) => void;

const pass: Logger = () => {
  // Do nothing.
};

const enableLogger =
  isDevelopmentMode() ||
  (isBrowser() && new URL(location.href).searchParams.get("debug") !== null);

export const dLog: Logger = enableLogger ? console.log : pass;
export const dWarn: Logger = enableLogger ? console.warn : pass;
export const dError: Logger = enableLogger ? console.error : pass;
