const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/proxy', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Missing image URL');

  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();

    res.set('Content-Type', contentType);
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');

    res.send(buffer);
  } catch (err) {
    res.status(500).send('Erro ao buscar imagem');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Proxy rodando');
});
