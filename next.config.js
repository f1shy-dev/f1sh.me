module.exports = {
  async redirects() {
    return [
      {
        source: "/(cdn|dl|download|file|files)/:file*",
        destination:
          "https://github.com/f1shy-dev/random-cdn/raw/main/:file*",
        permanent: false,
      },
    ];
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};
