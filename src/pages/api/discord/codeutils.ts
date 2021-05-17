import { NextApiHandler } from 'next';
const FuzzySet = require('fuzzyset');

import discordCommandHandler, {
  DiscordHandler,
} from '../../../lib/discordCommandHandler';

const handler: NextApiHandler = (req, res) => {
  const reqHandler: DiscordHandler = async (req) => {
    const githubData = await fetch(
      'https://api.github.com/repos/oasis-sh/oasis/git/trees/staging?recursive=1',
    ).then((d) => d.json());

    const fuzzyPaths = FuzzySet(
      githubData.tree.map((item) => item.path),
    );

    const fuzzResult = fuzzyPaths.get(
      req.body.data.options[0].value,
    )[0][1];

    console.log(fuzzResult, fuzzyPaths.length, req.body.data.options);

    if (!fuzzResult) throw Error('nope');

    return {
      content: `https://github.com/oasis-sh/oasis/tree/staging/${fuzzResult}`,
    };
  };

  const errorHandler: DiscordHandler = (req, res, err) => {
    return {
      embeds: [
        {
          title: 'Error',
          description: `420 not found!`,
          color: 15213861,
        },
      ],
    };
  };

  return discordCommandHandler(
    req,
    res,
    reqHandler,
    errorHandler,
    process.env.DISCORD_PUBKEY_CODEUTILS,
  );
};

export default handler;
