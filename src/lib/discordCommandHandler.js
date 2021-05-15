import { sign } from 'tweetnacl';

export default function discordCommandHandler(
  req,
  res,
  reqHandler,
  errorHandler,
) {
  res.setHeader('Access-Control-Allow-Origin', 'discord.com');
  const timestamp = req.headers['x-signature-timestamp'];
  const signature = req.headers['x-signature-ed25519'];

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
          ...reqHandler(req, res),
        },
      });
    } catch (err) {
      if (errorHandler)
        return res
          .status(200)
          .json({
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