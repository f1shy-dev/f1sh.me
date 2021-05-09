import { convertFuzzyFeeling } from 'beremoji';
import discordCommandHandler from '../../../lib/discordCommandHandler';

export default function handler(req, res) {
  const reqHandler = (req, res) => {
    const result = convertFuzzyFeeling(
      req.body.data.options[0].value,
    );

    if (!result) throw Error('BeremojiNotFound');

    return {
      content: result,
    };
  };

  const errorHandler = (req, res, err) => {
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

  return discordCommandHandler(req, res, reqHandler, errorHandler);
}
