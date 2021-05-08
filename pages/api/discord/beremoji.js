export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');

  console.log(req);

  if (req.method === 'POST') return postHandler(req, res);
  console.log('GET success');
  res.status(200).json({ status: 'success' });
}

const postHandler = (req, res) => {
  console.log('notype');
  if (!req.body.type) return res.status(400);
  console.log('PING');
  if (req.body.type === '1') return res.status(200).json({ type: 1 });
  console.log('command');
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
