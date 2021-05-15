const { JSDOM } = require('jsdom');

export default async function handler(req, res) {
  await fetch('https://gogo-stream.com')
    .then((r) => r.text())
    .then((body) => {
      const { document } = new JSDOM(body).window;
      const videoElements = Array.from(
        document.querySelector('.listing.items').children,
      );

      const mapped = videoElements
        .filter((e) => e.classList.contains('video-block'))
        .map((e) => ({
          img: e.children[0].children[0].children[0].children[0].src,
          name: e.children[0].children[1].innerHTML
            .replace(/(\r\n|\n|\r)/gm, '')
            .trim(),
          age: e.children[0].children[2].children[0].innerHTML,
        }));

      res.status(200).json(JSON.stringify(mapped, null, 4));
    });
}
