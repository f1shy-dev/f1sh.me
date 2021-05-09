import {
  enableCORS,
  verifyDiscordSignature,
  errorResponse,
  pingResponse,
} from '../../../lib/discordTools';
import { convertFuzzyFeeling } from 'beremoji';

export default function handler(req, res) {
  enableCORS(res);
  if (!verifyDiscordSignature(req))
    return errorResponse(res, 'Invalid Signature');

  if (req.method === 'POST') return postHandler(req, res);
  errorResponse(res, 'Invalid Request Method');
}

const postHandler = (req, res) => {
  if (!req.body.type) return errorResponse(res, 'Invalid Form Body');
  if (req.body.type === 1) return pingResponse();
  try {
    const result = convertFuzzyFeeling(
      req.body.data.options[0].value,
    );

    if (!result) throw Error('no result');

    return res.status(200).json({
      type: 4,
      data: {
        tts: false,
        content: result,
        embeds: [],
        allowed_mentions: { parse: [] },
      },
    });
  } catch {
    return res.status(200).json({
      type: 4,
      data: {
        tts: false,
        embeds: [
          {
            title: 'Error',
            description: `The beremoji ${req.body.data.options[0].value} doesn't exist!`,
            color: 15213861,
          },
        ],
        allowed_mentions: { parse: [] },
      },
    });
  }
};
