import express from 'express';
import bodyParser from 'body-parser';

const users = [];

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    name: 'Tirth',
    surname: 'Bodawala',
  });
});

// Authentication
app.post('/register', (req, res) => {
  const user = req.body;
  const previousUser = users.find(u => u.username === user.username);
  if (previousUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  users.push({id: users.length + 1, ...user});
  res.json(user);
});

app.post('/login', (req, res) => {
  const user = req.body;
  const previousUser = users.find(u => u.username === user.username);
  if (!previousUser) {
    return res.status(400).json({ message: 'User not found' });
  }
  if (previousUser.password !== user.password) {
    return res.status(400).json({ message: 'Invalid password' });
  }
  res.json({
    id: previousUser.id,
    username: previousUser.username,
  });
});

app.listen(3000, () => {
  console.log('Listening on port http://localhost:3000');
});