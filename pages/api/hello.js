import path from 'path';
import getConfig from 'next/config';
import { v4 as uuidv4 } from 'uuid';
const fs = require('fs');
const { serverRuntimeConfig } = getConfig();

export default async (req, res) => {
  const data = uuidv4();
  fs.writeFile(
    path.join(serverRuntimeConfig.PROJECT_ROOT, 'what.txt'),
    data,
    function (err) {
      if (err) throw err;
      res
        .status(200)
        .send('You just wrote the ID: ' + data + ' to what.txt!');
    },
  );
};
