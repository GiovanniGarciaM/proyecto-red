const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// DATOS DE MONITOREO (SIMULADOS)
// ================================
let dispositivos = [
  {
    nombre: "Router Totalplay",
    ip: "192.168.100.1",
    estado: "online"
  },
  {
    nombre: "PC Principal",
    ip: "192.168.100.2",
    estado: "online"
  },
  {
    nombre: "DVR",
    ip: "192.168.100.20",
    estado: "offline"
  }
];

// ================================
// MIDDLEWARES
// ================================
app.use(express.json());

// 👉 ESTO ES CLAVE: servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// ================================
// API
// ================================
app.get("/api/status", (req, res) => {
  res.json(dispositivos);
});

// ================================
// RUTA RAÍZ (opcional)
// ================================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// ================================
// SERVIDOR
// ================================
app.listen(PORT, () => {
  console.log('Servidor activo en puerto ${PORT}');
});