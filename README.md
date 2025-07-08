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

## API Endpoints

Esta sección detalla los endpoints disponibles en la API, incluyendo sus métodos, URLs, cuerpos de solicitud (si aplica), y ejemplos de respuestas exitosas y de error.

### Productos

#### `POST /api/v1/products`

Crea un nuevo producto en la base de datos. Si un producto con el mismo `nombre` ya existe, su `cantidad` se sumará a la existente; de lo contrario, se creará un nuevo producto.

*   **Método:** `POST`
*   **URL:** `http://localhost:3000/api/v1/products`
*   **Cuerpo de la Solicitud (Request Body):**
    ```json
    {
      "nombre": "cocosete",    
      "precio": 100, 
      "disponible": true,
      "cantidad": 50
    }
    ```
    *   `nombre` (string): Requerido. Nombre del producto.
    *   `precio` (number): Requerido. Precio del producto.
    *   `disponible` (boolean): Opcional. Indica si el producto está disponible. Por defecto es `true`.
    *   `cantidad` (number): Requerido. Cantidad del producto.


*   **Respuestas Exitosas (Success Responses):**
    *   **Código:** `201 Created`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "success",
            "message": "Operación exitosa",
            "data": {
                "nombre": "cocosete",
                "precio": 100,
                "disponible": true
            }
        }
        ```

*   **Respuestas de Error (Error Responses):**
    *   **Código:** `400 Bad Request`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Bad Request",
            "error": {
                "0": "El nombre debe ser un texto.",
                "1": "El nombre es requerido.",
                "2": "El precio debe ser un número.",
                "3": "El precio es requerido."
            }
        }
        ```

#### `GET /api/v1/products`

Obtiene una lista de todos los productos (disponibles y no disponibles).

*   **Método:** `GET`
*   **URL:** `http://localhost:3000/api/v1/products`
*   **Respuestas Exitosas (Success Responses):**
    *   **Código:** `200 OK`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "success",
            "message": "Operación exitosa",
            "data": [
                {
                    "id": "jM9gItbDSvpgNl9sDE8N",
                    "precio": 1200,
                    "disponible": true,
                    "nombre": "Laptop Pro"
                },
                {
                    "id": "some-id-1",
                    "precio": 500,
                    "disponible": false,
                    "nombre": "Producto No Disponible 1"
                },
                {
                    "id": "vvA5my1Ls7gvokso3PUU",
                    "nombre": "cocosete",
                    "precio": 100,
                    "disponible": true
                }
            ]
        }
        ```
*   **Respuestas de Error (Error Responses):**
    *   **Código:** `500 Internal Server Error` (o cualquier otro error general del servidor)
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Internal Server Error",
            "error": "Ha ocurrido un error inesperado en el servidor."
        }
        ```

#### `GET /api/v1/products/unavailable`

Obtiene una lista de todos los productos no disponibles.

*   **Método:** `GET`
*   **URL:** `http://localhost:3000/api/v1/products/unavailable`
*   **Respuestas Exitosas (Success Responses):**
    *   **Código:** `200 OK`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "success",
            "message": "Operación exitosa",
            "data": [
                {
                    "id": "some-id-1",
                    "precio": 500,
                    "disponible": false,
                    "nombre": "Producto No Disponible 1"
                },
                {
                    "id": "some-id-2",
                    "nombre": "Producto No Disponible 2",
                    "precio": 250,
                    "disponible": false
                }
            ]
        }
        ```
*   **Respuestas de Error (Error Responses):**
    *   **Código:** `500 Internal Server Error` (o cualquier otro error general del servidor)
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Internal Server Error",
            "error": "Ha ocurrido un error inesperado en el servidor."
        }
        ```

#### `PUT /api/v1/products/:id`

Actualiza un producto existente por su ID.

*   **Método:** `PUT`
*   **URL:** `http://localhost:3000/api/v1/products/:id`
*   **Parámetros de Ruta:**
    *   `id` (string): Requerido. El ID único del producto a actualizar.
*   **Cuerpo de la Solicitud (Request Body):**
    ```json
    {
      "nombre": "Nuevo Nombre",    // Opcional
      "precio": 200,               // Opcional
      "disponible": false,         // Opcional
      "cantidad": 75               // Opcional
    }
    ```
    *   Se requiere al menos uno de los campos (`nombre`, `precio`, `disponible`, `cantidad`) para la actualización.

*   **Respuestas Exitosas (Success Responses):**
    *   **Código:** `200 OK`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "success",
            "message": "Operación exitosa",
            "data": {
                "id": "jM9gItbDSvpgNl9sDE8N",
                "nombre": "Nuevo Nombre",
                "precio": 200,
                "disponible": false
            }
        }
        ```
*   **Respuestas de Error (Error Responses):**
    *   **Código:** `400 Bad Request`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Bad Request",
            "error": {
                "0": "El nombre debe ser un texto."
            }
        }
        ```
    *   **Código:** `404 Not Found`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Not Found",
            "error": "Producto con id [id] no encontrado para actualizar."
        }
        ```

#### `GET /api/v1/products/:id`

Obtiene los detalles de un producto específico por su ID.

*   **Método:** `GET`
*   **URL:** `http://localhost:3000/api/v1/products/:id`
*   **Parámetros de Ruta:**
    *   `id` (string): Requerido. El ID único del producto.
*   **Respuestas Exitosas (Success Responses):**
    *   **Código:** `200 OK`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "success",
            "message": "Operación exitosa",
            "data": {
                "id": "jM9gItbDSvpgNl9sDE8N",
                "precio": 1200,
                "disponible": true,
                "nombre": "Laptop Pro"
            }
        }
        ```
*   **Respuestas de Error (Error Responses):**
    *   **Código:** `404 Not Found`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Not Found",
            "error": "Producto no encontrado."
        }
        ```
    *   **Código:** `400 Bad Request` (si el ID no es válido)
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Bad Request",
            "error": {
                "0": "El ID debe ser un texto válido."
            }
        }
        ```

#### `DELETE /api/v1/products/:id`

Elimina un producto específico por su ID.

*   **Método:** `DELETE`
*   **URL:** `http://localhost:3000/api/v1/products/:id`
*   **Parámetros de Ruta:**
    *   `id` (string): Requerido. El ID único del producto a eliminar.
*   **Respuestas Exitosas (Success Responses):**
    *   **Código:** `200 OK`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "success",
            "message": "Operación exitosa",
            "data": {
                "id": "jM9gItbDSvpgNl9sDE8N"
            }
        }
        ```
*   **Respuestas de Error (Error Responses):**
    *   **Código:** `404 Not Found`
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Not Found",
            "error": "Producto no encontrado."
        }
        ```
    *   **Código:** `400 Bad Request` (si el ID no es válido)
    *   **Ejemplo de Respuesta:**
        ```json
        {
            "status": "error",
            "message": "Bad Request",
            "error": {
                "0": "El ID debe ser un texto válido."
            }
        }
        ```

## Licencia

Este proyecto está licenciado bajo la licencia **MIT**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.
