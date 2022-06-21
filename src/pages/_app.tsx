import React from "react";
import { RecoilRoot } from "recoil";
import { AppProps } from "next/app";
import Head from "next/head";
import { Global, ThemeProvider } from "@emotion/react";

import Layout from "templates/Layout";
import { globalStyle } from "styles/Global";
import { theme } from "styles/Theme";

const App = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Head>
        <title>Infinite camera</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  </RecoilRoot>
);

export default App;
