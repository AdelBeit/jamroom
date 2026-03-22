import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PlayersContextProvider } from "../src/utils/PlayersContext";
import Icon from "../src/components/Icon";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayersContextProvider>
      <div id="rotate-notice">
        <div className="rotate-row">
          <Icon _icon="rotateDevice" size={60} />
          <p>Please rotate your device.</p>
        </div>
        <p>This app works best in landscape mode on mobile devices.</p>
      </div>
      <Component {...pageProps} />
    </PlayersContextProvider >
  );
}

export default MyApp;
