const express = require('express');
const crypto = require('crypto');
const validUrl = require('valid-url');
const pool = require('../config/db');
const path = require('path');

const router = express.Router();
const BASE_URL = 'http://localhost:5000'; 

router.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!validUrl.isUri(url)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const shortCode = crypto.randomBytes(3).toString('hex'); 
  const createdAt = new Date();
  //const expiresAt = new Date(createdAt.getTime() + 10 * 60 * 1000); 
  const expiresAt = new Date(createdAt.getTime() + 2 * 1000); // 2 seconds

  try {
    const result = await pool.query(
      'INSERT INTO urls (original_url, shortcode, created_at, expires_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [url, shortCode, createdAt, expiresAt]
    );

    res.json({
      shortUrl: `${BASE_URL}/${shortCode}`,
      data: result.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:code', async (req, res) => {
  const shortCode = req.params.code;

  try {
    const result = await pool.query(
      'SELECT original_url, expires_at FROM urls WHERE shortcode = $1',
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
    }

    const { original_url, expires_at } = result.rows[0];

    const now = new Date();
    if (expires_at && now > expires_at) {
      return res.status(410).sendFile(path.join(__dirname, '../public/404.html')); 
    }

    res.redirect(original_url);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
