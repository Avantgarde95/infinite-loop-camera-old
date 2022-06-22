export function isDevelopmentMode() {
  return process.env.NODE_ENV === "development";
}

type Logger = (...args: Array<unknown>) => void;

const pass: Logger = () => {
  // Do nothing.
};

// Prints only in the development mode.
export const dLog: Logger = isDevelopmentMode() ? console.log : pass;
export const dWarn: Logger = isDevelopmentMode() ? console.warn : pass;
export const dError: Logger = isDevelopmentMode() ? console.error : pass;
