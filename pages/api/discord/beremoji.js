export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  res.status(400);
}

const postHandler = (req, res) => {
  if (!req.body) return res.status(400);
  if (req.body.type === 1) return res.status(200).json({ type: 1 });
  res.status(200).json({ name: 'John Doe' });
};
