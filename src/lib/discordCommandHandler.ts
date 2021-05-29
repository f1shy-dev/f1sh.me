import { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'tweetnacl';

export type DiscordHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  err?: Error,
) => any;

export default async function discordCommandHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  reqHandler: DiscordHandler,
  pubkey: string,
  errorHandler?: DiscordHandler,
) {
  res.setHeader('Access-Control-Allow-Origin', 'discord.com');

  if (!isVerified(req, pubkey))
    return errorResponse(res, 'InvalidSignature');

  if (!req.body.type) return errorResponse(res, 'InvalidFormBody');

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
          ...(await reqHandler(req, res, null)),
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
            ...(await errorHandler(req, res, err)),
          },
          flags: 64,
        });

      return defaultErrHandler(req, res, err);
    }
  }
  errorResponse(res, 'InvalidReqMethod');
}

const errorResponse = (res, code) =>
  res.status(401).json({ status: 'error', error: code });

const pingResponse = (res) => {
  console.log('ping');
  res.status(200).json({ type: 1 });
};

const defaultErrHandler = (req, res, err) => {
  console.log(err, req.body.data.options);
  res.status(500).json({ status: 'error' });
};

const isVerified = (req, pubkey) => {
  const timestamp = req.headers['x-signature-timestamp'];
  const signature = String(req.headers['x-signature-ed25519']);
  if (process.env.DEV_MODE === 'true') return true;
  if (!timestamp || !signature) return false;

  return sign.detached.verify(
    Buffer.from(timestamp + JSON.stringify(req.body)),
    Buffer.from(signature, 'hex'),
    Buffer.from(pubkey, 'hex'),
  );
};
