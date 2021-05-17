import { NextApiHandler } from 'next';
const FuzzySet = require('fuzzyset');

import discordCommandHandler, {
  DiscordHandler,
} from '../../../../lib/discordCommandHandler';

const handler: NextApiHandler = (req, res) => {
  const reqHandler: DiscordHandler = async (req) => {
    const githubData = await fetch(
      `https://api.github.com/repos/oasis-sh/oasis/git/trees/${
        req.body.data.options[1]
          ? req.body.data.options[1].value
          : 'staging'
      }?recursive=1`,
    ).then((d) => d.json());

    const fuzzyPaths = FuzzySet(
      githubData.tree.map((item) => item.path),
    );

    const fuzzResult = fuzzyPaths.get(req.body.data.options[0].value);

    let desc = '';
    if (!fuzzResult)
      desc += `No files were found for the term: \`${req.body.data.options[0].value}\``;

    if (fuzzResult.length == 1 && fuzzResult[0][0] == 1)
      desc += `Found an exact match!\n${linkBuilder(
        fuzzResult[0][1],
      )}`;

    if (fuzzResult.length > 1) {
      desc += `Found ${fuzzResult.length} approximate matches!\n`;
      desc += fuzzResult.map((item) => linkBuilder(item[1]) + '\n');
    }

    return {
      embeds: [
        {
          title: `\`${req.body.data.options[0].value}\``,
          description: desc,
          color: 2327644,
          footer: {
            text: 'made by @Angshu31 and @F1sh',
          },
        },
      ],
    };
  };

  return discordCommandHandler(
    req,
    res,
    reqHandler,
    process.env.DISCORD_PUBKEY_CODEUTILS,
  );
};

export default handler;

function linkBuilder(path) {
  return `[\`${path}\`](https://github.com/oasis-sh/oasis/tree/staging/${path})`;
}
