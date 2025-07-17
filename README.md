# API RESTful con Node.js y Express

Este proyecto es una plantilla robusta para construir APIs RESTful utilizando Node.js y Express, siguiendo una arquitectura en capas para una mejor organización y mantenibilidad.

## Características Principales

*   **Arquitectura en Capas:** Implementación clara de capas de Ruteo, Controladores, Servicios y Modelos para una separación de responsabilidades.
*   **Manejo Centralizado de Errores:** Sistema robusto con middlewares y clases de error personalizadas para una gestión consistente de excepciones.
*   **Validación de Entrada:** Integración de `express-validator` para asegurar la integridad de los datos de entrada a través de middlewares.
*   **Respuestas API Estandarizadas:** Formato JSON consistente para todas las respuestas (éxito y error), facilitando el consumo por parte de los clientes.
*   **Configuración de Entorno:** Utiliza el manejo nativo de variables de entorno de Node.js (`--env-file=.env`).
*   **API de Productos (CRUD):** Implementación completa de las operaciones CRUD para la gestión de productos.
*   **Scripts de Desarrollo y Build:** Incluye scripts para desarrollo con `nodemon` y para la preparación de la aplicación para producción.
*   **Autenticación con JWT:** Sistema de autenticación seguro basado en JSON Web Tokens para proteger las rutas.
*   **Pruebas Unitarias e de Integración:** Configuración de `Jest` y `Supertest` para una batería de pruebas exhaustiva de los endpoints de la API.

## Tecnologías Utilizadas

*   **Node.js:** Entorno de ejecución.
*   **Express.js:** Framework web.
*   **Firebase Firestore:** Base de datos NoSQL.
*   **jsonwebtoken:** Para la generación y verificación de JSON Web Tokens.
*   **Nodemon:** Para desarrollo.
*   **express-validator:** Para validación.
*   **cors:** Para Cross-Origin Resource Sharing.
*   **rimraf:** Para operaciones de archivos en el build.
*   **Jest:** Framework de pruebas.
*   **Supertest:** Para pruebas de integración HTTP.

## Instalación y Uso

### 1. Clonar el repositorio

```bash
git clone [URL_DEL_REPOSITORIO]
cd final-layers # O el nombre de tu carpeta
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example` y configura tus variables de entorno (ej. `PORT`, credenciales de Firebase).

### 4. Comandos Disponibles

*   **`npm run dev`**: Inicia el servidor en modo desarrollo con `nodemon`.
*   **`npm start`**: Inicia el servidor en modo producción.
*   **`npm run build`**: Prepara la aplicación para producción, copiando los archivos a la carpeta `dist`.
*   **`npm test`**: Ejecuta la batería de pruebas unitarias y de integración.
*   **`npm run test:watch`**: Ejecuta las pruebas en modo "watch" para desarrollo.

## Endpoints de la API

### Autenticación

*   **`POST /api/v1/auth/login`**
    *   Autentica a un usuario y devuelve un token JWT.
    *   **Body:** `{ "email": "user@example.com", "password": "password123" }`

### Productos

*   **`GET /api/v1/products`**
*   **`GET /api/v1/products/:id`**
*   **`POST /api/v1/products`** (Ruta protegida)
*   **`DELETE /api/v1/products/:id`** (Ruta protegida)

Para acceder a las rutas protegidas, incluye el token en el header `Authorization`:
`Authorization: Bearer <TU_TOKEN_JWT>`

## Estructura del Proyecto

```
.
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── product.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validators/
│   │       ├── auth.validator.js
│   │       └── product.validator.js
│   ├── models/
│   │   └── product.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── index.js
│   │   └── product.route.js
│   ├── services/
│   │   └── product.service.js
│   ├── utils/
│   │   ├── asyncHandler.js
│   │   ├── errors.js
│   │   ├── jwt.js
│   │   └── response.js
│   ├── index.js
│   └── server.js
├── tests/
│   └── product.test.js
├── .vscode/
│   └── launch.json           # Configuración de depuración para VS Code
├── dist/                     # Directorio de salida para el build de producción
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos y directorios a ignorar por Git
├── package.json              # Dependencias y scripts del proyecto
├── package-lock.json         # Bloqueo de dependencias
├── PROJECT_OVERVIEW.md       # Descripción detallada del proyecto
├── README.md                 # Documentación principal del proyecto
└── TODO.md                   # Documento de seguimiento de tareas

```

## Licencia

Este proyecto está licenciado bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
