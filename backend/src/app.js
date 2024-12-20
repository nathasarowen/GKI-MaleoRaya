const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi koneksi database secara langsung
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Sesuaikan dengan password MySQL Anda, jika ada
    database: 'gki_maleo',
    port: 3306,
  });

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set true if using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Rute untuk login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query untuk mengecek username dan password
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Login gagal' });
      }
  
      const user = results[0];
      // Memeriksa password
      if (password === user.password) {
        // Menyimpan data user ke sesi
        req.session.user = {
          id: user.id_user,
          username: user.username,
          role: user.role
        };
        return res.json({ message: 'Login berhasil', user: req.session.user });
      } else {
        return res.status(401).json({ message: 'Login gagal' });
      }
    });
  });
  
  // Rute untuk mengecek status login
  app.get('/api/status', (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  });
  
  // Rute untuk logout
  app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.json({ message: 'Logout berhasil' });
    });
  });

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});