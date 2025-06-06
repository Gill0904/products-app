# Product App

## 🚀 Despliegue
Este proyecto está desplegado completamente en producción con integración continua utilizando GitHub Actions.

### 🔧 Backend
- Framework: NestJS

- Deployment: Render

- URL del backend: https://products-app-dkl1.onrender.com/api

- Autenticación: Implementada con JWT

- CI/CD: GitHub Actions con flujo personalizado (.github/workflows/backend.yml)

### 🖥️ Frontend
- Framework: React + Tailwind + NextUI

- Deployment: Vercel

- URL del frontend: https://products-app-chi-liard.vercel.app/

- CI/CD: GitHub Actions con despliegue automatizado vía Vercel (.github/workflows/frontend.yml)

### 📦 Entornos configurados
Variables de entorno configuradas en:

- Render (backend): MONGODB_URI, JWT_SECRET, PORT.

- Vercel (frontend): VITE_API_URL.

- Secrets añadidos en GitHub: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

### 🧪 Pruebas y funcionalidades entregadas
- Autenticación de usuarios

- CRUD de productos

- UI completamente funcional y responsiva

- Modales de edición y creación

- Tabla con acciones, diseño limpio y status etiquetados

- Manejo de errores con alertas y validaciones

- Uso de Zod para validaciones

- Hooks personalizados y separación de lógica por componentes

- Documentación mediante Storybook (yarn storybook)

- Despliegue listo para producción

---

### 📖 Documentación técnica adicional
#### Para correr Storybook localmente:

```bash
yarn storybook
```

#### Para correr backend localmente:

```bash
cd backend/
yarn install
yarn start:dev
```
#### Para correr frontend localmente:

```bash
cd frontend/
yarn install
yarn dev
```

---
## ✍️ Autor
***Luis Eduardo Hernández Gil***
📧 luisillohdzgil2000@gmail.com