import NextHead from "next/head";

export const Head = () => (
  <NextHead>
    <title>f1shy-dev</title>
    <script
      src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js"
      crossOrigin="anonymous"
    ></script>

    <meta name="title" content="f1sh.me"></meta>
    <meta
      name="description"
      content="f1shy-dev's epic portfolio website!"
    ></meta>

    <meta property="og:type" content="website"></meta>
    <meta property="og:url" content="https://f1sh.me/"></meta>
    <meta property="og:title" content="f1sh.me"></meta>
    <meta
      property="og:description"
      content="f1shy-dev's epic portfolio website!"
    ></meta>

    <meta
      property="twitter:card"
      content="summary_large_image"
    ></meta>
    <meta property="twitter:url" content="https://f1sh.me/"></meta>
    <meta property="twitter:title" content="f1sh.me"></meta>
    <meta
      property="twitter:description"
      content="f1shy-dev's epic portfolio website!"
    ></meta>
  </NextHead>
);
