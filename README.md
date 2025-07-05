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
*   **Pruebas Unitarias e de Integración:** Configuración de `Jest` y `Supertest` para una batería de pruebas exhaustiva de los endpoints de la API.

## Tecnologías Utilizadas

*   **Node.js:** Entorno de ejecución.
*   **Express.js:** Framework web.
*   **Firebase Firestore:** Base de datos NoSQL.
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

## Estructura del Proyecto

```
.
├── src/
│   ├── config/
│   │   └── db.js           # Configuración de la conexión a la base de datos
│   ├── controllers/
│   │   └── product.controller.js # Lógica de la API para productos
│   ├── middlewares/
│   │   └── validators/
│   │       └── product.validator.js  # Validaciones para rutas de productos
│   ├── models/
│   │   └── product.model.js    # Lógica de acceso a datos para productos
│   ├── routes/
│   │   ├── index.js            # Rutas principales (agrupa todas las rutas)
│   │   └── product.route.js    # Rutas de la API para productos
│   ├── services/
│   │   └── product.service.js  # Lógica de negocio para productos
│   ├── utils/
│   │   ├── asyncHandler.js     # Utilidad para manejar errores en funciones asíncronas
│   │   ├── errors.js           # Clases de errores personalizadas
│   │   └── response.js         # Utilidad para respuestas API estandarizadas
│   ├── index.js              # Punto de entrada de la aplicación
│   └── server.js             # Configuración del servidor Express y middlewares globales
├── tests/
│   └── product.test.js       # Pruebas para la API de productos
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
