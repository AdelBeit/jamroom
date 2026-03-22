import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PlayersContextProvider } from "../src/utils/PlayersContext";
import Icon from "../src/components/Icon";
import { usePage } from "../src/hooks/usePage";
import ModalProvider from "../src/components/ModalProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const page = usePage((state) => state.page);
  const showRotateNotice = page !== "_Loading";

  return (
    <PlayersContextProvider>
      <ModalProvider>
        {showRotateNotice && (
          <div id="rotate-notice">
            <div className="dark_underlay faded absolute backdrop-blur"></div>
            <div className="box mold">
              <div className="rotate-row">
                <Icon _icon="rotateDevice" size={60} />
                <p>Please rotate your device.</p>
              </div>
              <p>This app works best in landscape mode on mobile devices.</p>
            </div>
          </div>
        )}
        <Component {...pageProps} />
      </ModalProvider>
    </PlayersContextProvider >
  );
}

export default MyApp;
