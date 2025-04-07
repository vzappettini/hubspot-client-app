require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const contactRoutes = require('./routes/contactRoutes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Servir archivos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas para API
app.use('/contacts', contactRoutes);

// Arrancar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
