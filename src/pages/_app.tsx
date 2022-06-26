import React from "react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { Global, ThemeProvider } from "@emotion/react";

import Layout from "templates/Layout";
import { globalStyle } from "styles/Global";
import { muiTheme, theme } from "styles/Theme";

const App = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <MUIThemeProvider theme={muiTheme}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Head>
          <title>Infinite loop camera</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </MUIThemeProvider>
  </RecoilRoot>
);

export default App;
