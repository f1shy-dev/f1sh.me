import nacl from 'tweetnacl';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(req.headers['X-Signature-Timestamp'] + req.body),
    Buffer.from(req.headers['X-Signature-Ed25519'], 'hex'),
    Buffer.from(process.env.DISCORD_PUB_KEY, 'hex'),
  );

  if (!isVerified)
    return res
      .status(401)
      .json({ status: 'error', error: 'invalid request signature' });

  if (req.method === 'POST') return postHandler(req, res);
  res.status(200).json({ status: 'success' });
}

const postHandler = (req, res) => {
  if (!req.body.type) return res.status(400);
  if (req.body.type === 1) return res.status(200).json({ type: '1' });

  res.status(200).json({
    type: 4,
    data: {
      tts: false,
      content: 'If you see this, something worked!',
      embeds: [],
      allowed_mentions: { parse: [] },
    },
  });
};
