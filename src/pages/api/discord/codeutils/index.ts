import { NextApiHandler } from 'next';
const FuzzySet = require('fuzzyset');

import discordCommandHandler, {
  DiscordHandler,
} from '../../../../lib/discordCommandHandler';

const handler: NextApiHandler = (req, res) => {
  const reqHandler: DiscordHandler = async (req) => {
    const repo = req.body.data.options[1]
      ? req.body.data.options[1].value ?? 'staging'
      : 'staging';

    const githubData = await fetch(
      `https://api.github.com/repos/oasis-sh/oasis/git/trees/${repo}?recursive=1`,
    ).then((d) => d.json());

    const fuzzyPaths = FuzzySet(
      githubData.tree.map((item) => item.path),
    );

    const result = fuzzyPaths
      .get(req.body.data.options[0].value)
      .filter((item) => item[0] >= 0.8);

    if (!result) throw 'NoMatches';

    if (result[0][0] == 1.0)
      return responseEmbedBuilder(
        `Found an exact match!\n${linkBuilder(result[0][1])}`,
        req.body.data.options[0].value,
      );

    let desc = '';
    desc += `Found ${result.length} approximate match${
      result.length > 1 && 'es'
    }!\n`;
    desc += result.map((item) => linkBuilder(item[1])).join('\n');

    return responseEmbedBuilder(desc, req.body.data.options[0].value);
  };

  const errorHandler: DiscordHandler = (req) => {
    return {
      embeds: [
        {
          title: 'Error',
          description: `There were no matches found for \`${req.body.data.options[0].value}\`, or there was an error.`,
          color: 15213861,
        },
      ],
    };
  };

  return discordCommandHandler(
    req,
    res,
    reqHandler,
    process.env.DISCORD_PUBKEY_CODEUTILS,
    errorHandler,
  );
};

export default handler;

function linkBuilder(path) {
  return `[\`${path}\`](https://github.com/oasis-sh/oasis/tree/staging/${path})`;
}

function responseEmbedBuilder(desc, ogValue) {
  return {
    embeds: [
      {
        title: `\`${ogValue}\``,
        description: desc,
        color: 2327644,
        footer: {
          text: 'Made amazingly by @Angshu31 and @F1sh',
        },
      },
    ],
  };
}
