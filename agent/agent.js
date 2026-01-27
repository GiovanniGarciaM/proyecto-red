const ping = require('ping');
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const SERVIDOR = 'https://proyecto-red-monitor.onrender.com/api/status';

const dispositivos = [
  { nombre: 'Router TotalPlay', ip: '192.168.100.1' },
  { nombre: 'PC Principal', ip: '192.168.100.2' },
  { nombre: 'DVR', ip: '192.168.0.20' }
];

async function monitorear() {
  const resultados = [];

  for (const d of dispositivos) {
    const res = await ping.promise.probe(d.ip);
    resultados.push({
      nombre: d.nombre,
      ip: d.ip,
      estado: res.alive ? 'online' : 'offline'
    });
  }

  await fetch(SERVIDOR, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(resultados)
  });

  console.log('Estado enviado:', resultados);
}

setInterval(monitorear, 10000);