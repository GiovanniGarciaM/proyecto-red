const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
let estados = [];

app.post('/api/status', (req, res) => {
  estados = req.body;
  res.json({ ok: true });
});

app.get('/api/status', (req, res) => {
  res.json(estados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor activo en puerto', PORT);
});