import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'tweetnacl';

export type DiscordHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  err?: Error,
) => any;

export default function discordCommandHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  reqHandler: DiscordHandler,
  errorHandler: DiscordHandler,
) {
  res.setHeader('Access-Control-Allow-Origin', 'discord.com');
  const timestamp = req.headers['x-signature-timestamp'];
  const signature = String(req.headers['x-signature-ed25519']);

  if (!timestamp || !signature)
    return errorResponse(res, 'InvalidSignature');

  const isVerified = sign.detached.verify(
    Buffer.from(timestamp + JSON.stringify(req.body)),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_PUB_KEY, 'hex'),
  );

  if (!isVerified) return errorResponse(res, 'InvalidSignature');
  if (req.body.type === 1) return pingResponse(res);
  if (req.method === 'POST') {
    try {
      return res.status(200).json({
        type: 4,
        data: {
          tts: false,
          content: '',
          embeds: [],
          allowed_mentions: { parse: [] },
          ...reqHandler(req, res, null),
        },
      });
    } catch (err) {
      if (errorHandler)
        return res.status(200).json({
          type: 4,
          data: {
            tts: false,
            content: '',
            embeds: [],
            allowed_mentions: { parse: [] },
            ...errorHandler(req, res, err),
          },
        });

      return defaultErrHandler(res);
    }
  }
  errorResponse(res, 'InvalidReqMethod');
}

const errorResponse = (res, code) =>
  res.status(401).json({ status: 'error', error: code });

const pingResponse = (res) => res.status(200).json({ type: '1' });

const defaultErrHandler = (res) =>
  res.status(500).json({ status: 'error' });
