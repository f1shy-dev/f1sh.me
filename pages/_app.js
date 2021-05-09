/* eslint-disable react/prop-types */
import '../styles/globals.css';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
