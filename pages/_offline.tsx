import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PlayersContextProvider } from "../src/utils/PlayersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayersContextProvider>
      <Component {...pageProps} />
    </PlayersContextProvider>
  );
}

export default MyApp;
