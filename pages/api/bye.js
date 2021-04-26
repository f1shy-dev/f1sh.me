import path from 'path';
import getConfig from 'next/config';
const fs = require('fs');
const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
  fs.readFile(
    path.join(serverRuntimeConfig.PROJECT_ROOT, 'pages/api/what.txt'),
    function (err, data) {
      if (err) throw err;
      res
        .status(200)
        .send(
          'You just got the ID: ' +
            data +
            ' from pages/api/what.txt!',
        );
    },
  );
};
