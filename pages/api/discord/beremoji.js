export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  res.status(400).json({ status: 'error' });
}

const postHandler = (req, res) => {
  if (!req.body.type) return res.status(400);
  if (req.body.type === '1') return res.status(200).json({ type: 1 });
  res.status(200).json({
    type: 4,
    data: {
      tts: false,
      content: 'Congrats on sending your command!',
      embeds: [],
      allowed_mentions: { parse: [] },
    },
  });
};
