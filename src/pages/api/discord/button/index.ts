import { convertFuzzyFeeling } from 'beremoji';
import { NextApiHandler } from 'next';
import discordCommandHandler, {
  DiscordHandler,
} from '../../../../lib/discordCommandHandler';

const handler: NextApiHandler = (req, res) => {
  const reqHandler: DiscordHandler = (req) => {
    return {
      content: 'button demo!',
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Click me!',
              style: 1,
              custom_id: 'click_one',
            },
          ],
        },
      ],
    };
  };

  return discordCommandHandler(
    req,
    res,
    reqHandler,
    process.env.DISCORD_PUBKEY_BEREMOJI,
  );
};

export default handler;
