# 🛒 App de Gestión de Productos

Aplicación web desarrollada con **React**, **Zustand**, **Zod**, **React Hook Form** y **NextUI** para la gestión de productos.

---

## 📦 Características

- Autenticación de usuarios (login, logout)
- Protección de rutas con `PrivateRoute`
- Manejo global de estado con **Zustand**
- CRUD completo de productos
- Modal para agregar y editar productos
- Filtro por estado (status)
- Validaciones con **Zod**
- UI con **NextUI** y estilos con **TailwindCSS**
- Interceptores con Axios para logout automático si el token es inválido
- Notificaciones con `react-toastify`

---

## 🚀 Instalación

**1. Clona el repositorio**

**2. Instala dependencias:**
```bash
yarn install
```

**3.Configura las variables de entorno en un archivo .env:**

```env
VITE_API_URL=
```

**4.Inicia el proyecto:**

```bash
yarn dev
```

## 🧪 Scripts disponibles
| Comando | Descripción |
|---------|-------------|
| dev |	Inicia el proyecto en modo dev |
| build	| Genera el build para producción |
| preview	| Sirve el build generado |
| storybook | Inicia el visor de storybook |

## 🔐 Autenticación

El estado del usuario se maneja en store/useAuth.ts y el token se guarda en localStorage.

El sistema desloguea automáticamente si el token es inválido (403), gracias al interceptor de Axios.

## 🧱 Estructura

```css
src/
├── components/
│   ├── Header.tsx
│   ├── Page.tsx
├── hooks/
│   ├── useProductModal.ts
├── models/
│   └── product.ts
├── pages/
│   ├── login/
│   ├── register/
│   ├── products/
│       ├── ProductsPage.tsx
│       ├── ProductModal.tsx
├── services/
│   └── product.service.ts
├── store/
│   ├── useAuth.ts
│   └── useProductModal.ts
```

## ✅ Deploy
Para producción, ejecuta:

```bash
npm run build
npm run preview
```

---

## 📘 Storybook

El proyecto incluye soporte para **Storybook** para documentar y probar los componentes de forma aislada.

### 🚀 Correr Storybook
Para iniciar el entorno de Storybook localmente:

```bash
yarn storybook
```

### 🧪 Agregar nuevos componentes
Crea archivos *.stories.tsx en la carpeta src/stories/ o cerca del componente que deseas documentar.

Cada historia debe exportar un objeto con el nombre del componente y ejemplos de cómo se usa.

### 🖥️ Abrir en el navegador
Una vez corriendo, accede a http://localhost:6006 para ver los componentes.

---

## 🧑‍💻 Autor
***Luis Eduardo Hernández Gil***
📧 luisillohdzgil2000@gmail.com