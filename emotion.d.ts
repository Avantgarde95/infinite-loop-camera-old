import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      foreground1: string;
      foreground2: string;
      background: string;
    };
  }
}
