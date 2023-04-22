import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ErrorProps } from "next/error";
import React, { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import BaseLayout from "@/components/BaseLayout";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

interface AppErrorProps extends ErrorProps {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

export default function App({
  Component,
  pageProps,
  err,
}: AppPropsWithLayout & AppErrorProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BaseLayout>
        {getLayout(<Component {...pageProps} err={err} />)}
      </BaseLayout>
    </ThemeProvider>
  );
}
