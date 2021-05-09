import nacl from 'tweetnacl';
import { convertFuzzyFeeling, convertExactFeeling } from 'beremoji';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');

  const timestamp = req.headers['x-signature-timestamp'];
  const signature = req.headers['x-signature-ed25519'];

  if (!timestamp || !signature || !req.body)
    return res.status(401).send('invalid request signature');

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + JSON.stringify(req.body)),
    Buffer.from(signature, 'hex'),
    Buffer.from(process.env.DISCORD_PUB_KEY, 'hex'),
  );

  if (!isVerified)
    return res.status(401).send('invalid request signature');

  if (req.method === 'POST') return postHandler(req, res);
  res.status(200).json({ status: 'success' });
}

const postHandler = (req, res) => {
  if (!req.body.type) return res.status(400);
  if (req.body.type === 1) return res.status(200).json({ type: '1' });
  if (req.body.data.name === 'beremoji')
    return convertExactFeeling(req.body.data.options[0].value);

  if (req.body.data.name === 'feeling') {
    const converted = convertFuzzyFeeling(
      req.body.data.options[0].value,
    );

    res.status(200).json({
      type: 4,
      data: {
        tts: false,
        content:
          converted != null
            ? converted
            : "That isn't a valid feeling!",
        embeds: [],
        allowed_mentions: { parse: [] },
      },
    });
  }
};
