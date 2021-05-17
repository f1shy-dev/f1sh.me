import { convertFuzzyFeeling } from 'beremoji';
import { NextApiHandler } from 'next';
import discordCommandHandler, {
  DiscordHandler,
} from '../../../lib/discordCommandHandler';

const handler: NextApiHandler = (req, res) => {
  const reqHandler: DiscordHandler = (req) => {
    const result = convertFuzzyFeeling(
      req.body.data.options[0].value,
    );

    if (!result) throw Error('BeremojiNotFound');

    return {
      content: result,
    };
  };

  const errorHandler: DiscordHandler = (req, res, err) => {
    return {
      embeds: [
        {
          title: 'Error',
          description: `The Beremoji \`${req.body.data.options[0].value}\` doesn't exist, or there was an error converting it to an emoji!`,
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
    process.env.DISCORD_PUBKEY_BEREMOJI,
  );
};

export default handler;
