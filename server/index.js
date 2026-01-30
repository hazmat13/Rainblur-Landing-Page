// Simple Express auth server using SQLite, bcrypt, JWT
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5500'; // update to your dev origin
const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_with_a_random_secret';
const TOKEN_EXP = process.env.TOKEN_EXP || '7d';

app.use(express.json());
app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true,
}));

// Initialize DB (data.db in server folder)
const DB_PATH = path.join(__dirname, 'data.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Helpers
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXP });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Routes
app.get('/', (req, res) => res.json({ ok: true, message: 'Auth server running' }));

// Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    stmt.run(email.toLowerCase(), hashed, function (err) {
      if (err) {
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).json({ error: 'Email already in use' });
        }
        return res.status(500).json({ error: 'Database error' });
      }
      const user = { id: this.lastID, email };
      const token = createToken({ id: user.id, email: user.email });
      return res.json({ token, user: { id: user.id, email: user.email } });
    });
    stmt.finalize();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  db.get('SELECT id, email, password FROM users WHERE email = ?', [email.toLowerCase()], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const user = { id: row.id, email: row.email };
    const token = createToken({ id: user.id, email: user.email });
    return res.json({ token, user });
  });
});

// Protected: get current user
app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization format' });

  const payload = verifyToken(parts[1]);
  if (!payload) return res.status(401).json({ error: 'Invalid or expired token' });

  // Fetch user info from DB
  db.get('SELECT id, email, created_at FROM users WHERE id = ?', [payload.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!row) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: { id: row.id, email: row.email, created_at: row.created_at } });
  });
});

// Start
app.listen(PORT, () => {
  console.log(`Auth server listening on http://localhost:${PORT}`);
  console.log(`CORS origin allowed: ${CLIENT_ORIGIN}`);
});
