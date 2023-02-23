import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <title>Jamroom</title>
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/app_icons/icon-192x192.png" />
        <meta name="theme-color" content="#fff" />

        <meta charSet="utf-8" />
        <link
          rel="icon"
          href="./app_icons/no_background/icon-48x48.png"
          type="image/x-icon"
        ></link>

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Jam" />
        <meta name="apple-mobile-web-app-title" content="Jam" />
        <meta name="msapplication-starturl" content="/" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=yes"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
