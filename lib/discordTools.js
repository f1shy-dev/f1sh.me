import { sign } from 'tweetnacl';

export const enableCORS = (res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
};

export const verifyDiscordSignature = (req) => {
  const timestamp = req.headers['x-signature-timestamp'];
  const signature = req.headers['x-signature-ed25519'];

  if (!timestamp || !signature) return false;

  return sign.detached.verify(
    Buffer.from(timestamp + JSON.stringify(req.body)),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_PUB_KEY, 'hex'),
  );
};

export const errorResponse = (res, code) =>
  res.status(401).json({ status: 'error', error: code });

export const pingResponse = (res) =>
  res.status(200).json({ type: '1' });
