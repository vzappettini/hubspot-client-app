# 📱 HubSpot Client App

Este proyecto conecta un frontend simple con un backend en **Node.js** que se comunica con la API de **HubSpot** para gestionar contactos. Está pensado para practicar integraciones reales y tests unitarios con **Jest**.

---

## 🧹 Estructura del proyecto

```
HUBSPOT-APP/
├── backend/
│   ├── _test_/                  # Tests unitarios (Jest)
│   │   └── hubspot.test.js
│   ├── controllers/             # Lógica del controlador
│   │   └── contactController.js
│   ├── routes/                  # Definición de rutas
│   │   └── contactRoutes.js
│   ├── services/                # Comunicación con HubSpot
│   │   └── contactService.js
│   ├── utils/                   # Validaciones y utilidades
│   │   └── validators.js
│   ├── .env                     # Variables de entorno (NO subir a git)
│   ├── .env.example             # Ejemplo para configurar el entorno
│   ├── app.js                   # Configuración y entrada principal
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                    # Frontend simple en HTML/CSS/JS
│   ├── app.js
│   ├── index.html
│   └── style.css
│
└── README.md                    # Este archivo ✨
```

---

## ⚙️ Instalación

1. Cloná el proyecto:

   ```bash
   git clone https://github.com/tu-usuario/hubspot-app.git
   cd HUBSPOT-CLIENT-APP
   ```

2. Configurá el backend:

   ```bash
   cd backend
   npm install
   ```

3. Copiá el archivo de ejemplo `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Y completá tu **API key de HubSpot**:

   ```env
   HUBSPOT_API_KEY=tu_clave_de_hubspot
   ```

4. Iniciá el servidor:

   ```bash
   npm run dev
   ```

---

## 🥪 Testing

Este proyecto usa **Jest** para testear las funciones del backend:

```bash
npm test
```

---

## 💡 Funcionalidades implementadas

- ✅ Crear, leer, actualizar y eliminar contactos en HubSpot
- ✅ Buscar contactos por email
- ✅ Validación de inputs
- ✅ Tests unitarios con Jest
- ✅ Frontend de ejemplo para probar el flujo

---

## 📦 Dependencias principales

| Paquete     | Uso                                                |
|------------------------|-----------------------------------------|
| `axios`                | Requests HTTP a HubSpot                 |
| `dotenv`               | Manejo de variables de entorno          |
| `jest`                 | Testing                                 |
| `express`              | Framework para crear servidoresweb      |
| `cors`                 | Clientes frontend puedan consumir API   |
| `helmet`               | Seguridad                               |
| `express-validator`    | Validar Formatos                        |
| `nodemon`              | Reinicia automaticamente servidor       |