import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import "../styles/globals.css";

// This is the chain your dApp will work on.
const activeChain = "mumbai";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <ThirdwebProvider
        activeChain={activeChain}
        authConfig={{
          domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || "",
        }}
      >
        <Component {...pageProps} />
      </ThirdwebProvider>
    </SessionProvider>
  );
}

export default MyApp;
