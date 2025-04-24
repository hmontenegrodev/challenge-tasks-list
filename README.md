# Challenge Tasks List

Este repositorio contiene una aplicación fullstack para crear una lista de tareas, compuesta por un frontend en Angular 17 y un backend en Node.js.

---

## 🚀 Tecnologías utilizadas

### Frontend
- Angular 17 (Standalone Components)
- TypeScript
- Angular Material
- RxJS
- Angular Animations
- SCSS con CSS Grid/Flexbox
- Firebase Hosting

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- Firestore
- dotenv
- CORS

---

## 📂 Estructura del proyecto

### Frontend
```
src/
├── app/
│   ├── core/              # Servicios globales, guards, interceptores
│   ├── shared/            # Interfaces, utilidades y componentes compartidos
│   ├── features/
│   │   ├── auth/          # Login y registro de usuario
│   │   └── tasks/         # Página de tareas (listar, crear, editar, completar)
│   └── app.routes.ts      # Rutas standalone (Lazy Loading)
├── environments/          # Archivos .env.ts para distintas configuraciones
└── styles.scss            # Variables SCSS y estilos globales
```

### Backend
```
src/
├── controllers/      # Lógica de negocio
├── routes/           # Definición de endpoints
├── middlewares/      # Verificación de JWT
├── services/         # Servicios de Firestore
└── index.ts          # Entrada principal
```

---

## 🎓 Funcionalidades principales

### 🚑 Autenticación
- Login y registro con Firebase Auth
- Interceptor HTTP para envío de token JWT
- Guard para proteger rutas
- Logout manual y automático cuando el token expira

### 📝 Gestión de tareas
- Crear, listar, editar y eliminar tareas
- Marcar tareas como completadas
- Checkbox visual
- Contador de tareas pendientes

### 📅 Experiencia de usuario
- Interfaz responsiva
- Carga centralizada con spinner fullscreen
- Diálogos para edición y registro
- Animaciones suaves

---

## 💡 Consideraciones de diseño
- **Arquitectura limpia**: separación por dominios y responsabilidades
- **Standalone components**: modularización moderna y mejor rendimiento
- **Lazy loading y OnPush**: optimización del renderizado

---

## 📅 Scripts útiles

### Frontend
```bash
npm install          # Instalar dependencias
ng serve             # Correr localmente
ng build --configuration=production   # Build para producción
```

### Backend
```bash
npm install          # Instalar dependencias
npm run dev          # Correr en desarrollo
npm run build        # Build para producción (opcional)
```

---

## 🔐 Seguridad
- Middleware que verifica tokens JWT en cada petición
- Redirección automática al login si el token expira
- Backend como capa de seguridad entre frontend y Firebase

---

## 🚀 Despliegue

### Firebase Hosting (Frontend)
1. Ejecutar `ng run build --configuration=production`
2. Instalar Firebase CLI y ejecutar:
   ```bash
   firebase login
   firebase deploy
   ```

### Firebase Functions (Frontend)
1. Ejecutar `ng run build`
2. Instalar Firebase CLI y ejecutar:
   ```bash
   firebase login
   firebase init hosting
   firebase deploy

---

## 👋 Autor
Proyecto desarrollado como challenge de práctica fullstack.

---

¡Gracias por revisar este proyecto! ✨

