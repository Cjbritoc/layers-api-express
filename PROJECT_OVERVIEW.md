# Descripción General del Proyecto

Este documento proporciona una visión general de la arquitectura, tecnologías y estructura del proyecto.

## Arquitectura

El proyecto sigue un patrón de **arquitectura en capas (Layered Architecture)**, que separa las responsabilidades en distintas capas lógicas para mejorar la mantenibilidad, escalabilidad y testabilidad.

### Capas de la Aplicación

1.  **Ruteo (`src/routes`):** Define los endpoints de la API y los métodos HTTP. Utiliza `express.Router` para una gestión modular de las rutas.
2.  **Controladores (`src/controllers`):** Procesa las solicitudes HTTP, extrae datos y llama a la capa de servicios. Formula la respuesta HTTP que se envía al cliente.
3.  **Servicios (`src/services`):** Contiene la lógica de negocio central. Orquesta las operaciones y actúa como un puente entre los controladores y la capa de acceso a datos.
4.  **Modelos (`src/models`):** Encapsula toda la lógica de acceso a la base de datos (actualmente Firebase Firestore). Es la única capa que interactúa directamente con la base de datos.

## Características Clave

*   **Manejo Centralizado de Errores:** Implementación de un middleware de manejo de errores global y clases de error personalizadas (`AppError`, `BadRequestError`, `NotFoundError`, etc.) para una gestión consistente de excepciones.
*   **Validación de Entrada:** Uso de `express-validator` para la validación de datos de entrada a través de middlewares, asegurando la integridad de los datos antes de que lleguen a la lógica de negocio.
*   **Respuestas API Estandarizadas:** Todas las respuestas de la API (éxito y error) siguen un formato JSON consistente con campos `status`, `message` y `data` (o `error` en caso de fallo).
*   **Configuración de Entorno:** Utilización del manejo nativo de variables de entorno de Node.js (`--env-file=.env`) para una configuración flexible y segura.

## Tecnologías Utilizadas

-   **Node.js:** Entorno de ejecución de JavaScript del lado del servidor.
-   **Express.js:** Framework web para construir la API REST.
-   **Firebase Firestore:** Base de datos NoSQL en la nube para el almacenamiento de datos.
-   **Nodemon:** Herramienta de desarrollo que reinicia automáticamente la aplicación cuando se detectan cambios en los archivos.
-   **express-validator:** Librería para la validación y saneamiento de datos de entrada.
-   **rimraf:** Utilidad para eliminar archivos y directorios de forma segura (usado en el script de build).
-   **cors:** Middleware para habilitar Cross-Origin Resource Sharing.

## Estructura de Archivos

```
/
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
│   │   ├── index.js            # Funciones de utilidad generales
│   │   └── response.js         # Utilidad para respuestas API estandarizadas
│   ├── index.js              # Punto de entrada de la aplicación
│   └── server.js             # Configuración del servidor Express y middlewares globales
├── .vscode/
│   └── launch.json           # Configuración de depuración para VS Code
├── dist/                     # Directorio de salida para el build de producción
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore                # Archivos y directorios a ignorar por Git
├── package.json              # Dependencias y scripts del proyecto
├── package-lock.json         # Bloqueo de dependencias
├── PROJECT_OVERVIEW.md       # Este documento
├── README.md                 # README principal del proyecto
└── TODO.md                   # Documento de seguimiento de tareas
