const db = require('../config/database');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek user di database
        const [users] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        const user = users[0];
        
        // Untuk sementara compare langsung (karena password belum di-hash)
        // Nantinya gunakan: const isValid = await bcrypt.compare(password, user.password);
        const isValid = password === user.password;

        if (!isValid) {
            return res.status(401).json({ message: 'Username atau password salah' });
        }

        // Set session
        req.session.user = {
            id_user: user.id_user,
            username: user.username,
            role: user.role
        };

        res.json({
            id_user: user.id_user,
            username: user.username,
            role: user.role
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal logout' });
        }
        res.json({ message: 'Berhasil logout' });
    });
};

exports.checkAuth = (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Tidak terotentikasi' });
    }
};