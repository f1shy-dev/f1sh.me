import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiscord,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';

export default function Home() {
  const [notifVisible, setNotifVisible] = useState(false);
  return (
    <div
      className={`flex-center-col bg-[#1f2124] w-screen h-screen text-center`}
    >
      <Head>
        <title>f1sh.me</title>
        <meta name="title" content="f1sh.me"></meta>
        <meta
          name="description"
          content="Woah! You found my website!"
        ></meta>

        <meta property="og:type" content="website"></meta>
        <meta property="og:url" content="https://f1sh.me/"></meta>
        <meta property="og:title" content="f1sh.me"></meta>
        <meta
          property="og:description"
          content="Woah! You found my website!"
        ></meta>

        <meta
          property="twitter:card"
          content="summary_large_image"
        ></meta>
        <meta
          property="twitter:url"
          content="https://f1sh.me/"
        ></meta>
        <meta property="twitter:title" content="f1sh.me"></meta>
        <meta
          property="twitter:description"
          content="Woah! You found my website!"
        ></meta>
      </Head>
      <h1
        className={`text-8xl font-bold text-gradient bg-gradient-to-r from-blue-500 to-indigo-700 font-mono tracking-wider`}
      >
        f1sh
      </h1>
      <div className={`text-gray-300 m-4 max-w-xl font-mono`}>
        👋&nbsp;I like coding things, and I also have interest in
        games, such as <a href="https://minecraft.net">Minecraft</a>{' '}
        and <a href="https://beatsaber.com">Beat Saber</a>!
      </div>

      <div
        className={`flex-row color-current text-gray-200 text-3xl`}
      >
        <FontAwesomeIcon
          icon={faDiscord}
          className={`mr-4 hover-trans`}
          onClick={() => {
            navigator.clipboard.writeText('F1shNotFound#5117');
            setNotifVisible(true);
            setTimeout(() => setNotifVisible(false), 5000);
          }}
        />
        <a href="https://twitter.com/vishyfishy2">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>

      <div
        className={`flex-col color-current text-gray-200 text-3xl mt-4`}
      >
        <p className={`font-mono text-sm `}>Server Status</p>
      </div>

      <div
        className={`fixed bottom-0 right-0 bg-blue-400 text-white rounded-full px-4 py-2 m-4 transition-opacity ease-in duration-200 ${
          !notifVisible ? 'opacity-0' : null
        }`}
      >
        Copied to Clipboard!
      </div>
    </div>
  );
}
