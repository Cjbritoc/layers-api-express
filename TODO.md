# Plan de Desarrollo del Proyecto

Este documento desglosa el desarrollo del proyecto en Sprints, cada uno con objetivos claros y tareas específicas. El progreso se puede seguir marcando las casillas.

---

## Sprint 1: Fundamentos y Estructura de la Aplicación

**Objetivo:** Establecer una base de código sólida, escalable y profesional.

### Épica 1: Refactorización de la Estructura Base
-   [x] **Tarea 1.1: Separar la Lógica del Servidor**
    -   Crear `src/server.js` para la configuración de Express.
    -   Modificar `src/index.js` para que solo inicie el servidor.
-   [x] **Tarea 1.2: Habilitar CORS**
    -   Instalar `cors` (`npm install cors`).
    -   Añadir el middleware `cors()` en `src/server.js`.
-   [x] **Tarea 1.3: Versionado de la API**
    -   Crear un enrutador principal en `src/routes/index.js`.
    -   Montar todas las rutas bajo el prefijo `/api/v1`.

### Épica 2: Configuración Crítica
-   [x] **Tarea 2.1: Configurar Variables de Entorno (Nativo de Node.js 22)**
    -   Crear el archivo `.env` a partir de `.env.example`.
    -   Mover toda la configuración sensible (puerto, credenciales de DB) a `.env`.
    -   Actualizar los scripts `start` y `dev` en `package.json` para usar el flag `--env-file=.env` (ej. `node --env-file=.env src/index.js`).
-   [x] **Tarea 2.2: Asegurar Conexión a la Base de Datos**
    -   Verificar que la conexión a Firebase se establece correctamente al iniciar la aplicación.

---

## Sprint 2: Robustez y Calidad del Código

**Objetivo:** Implementar un sistema centralizado de manejo de errores y validación de datos para hacer la API más segura y predecible.

### Épica 3: Sistema de Manejo de Errores y Respuestas
-   [x] **Tarea 3.1: Crear Wrappers de Respuesta**
    -   Crear `src/utils/response.js` con funciones `success` y `error` para estandarizar las respuestas JSON con `status`, `message`, `data`/`error` campos.
-   [x] **Tarea 3.2: Crear Clases de Error Personalizadas**
    -   Crear `src/utils/errors.js` con clases como `NotFoundError`, `BadRequestError`, etc., incluyendo una propiedad `data` para errores detallados.
-   [x] **Tarea 3.3: Implementar Middlewares de Error**
    -   Crear un middleware para manejar rutas no encontradas (404).
    -   Crear un middleware de error centralizado (con 4 argumentos) para capturar todos los errores y formatearlos según el estándar.
-   [x] **Tarea 3.4: Refactorizar Controladores**
    -   Eliminar `try...catch` y usar el nuevo sistema de errores y respuestas.

### Épica 4: Validación de Entrada
-   [x] **Tarea 4.1: Configurar `express-validator`**
    -   Instalar `express-validator` (`npm install express-validator`).
    -   Crear el directorio `src/middlewares/validators`.
-   [x] **Tarea 4.2: Crear Middlewares de Validación**
    -   Crear un validador para la creación/actualización de productos.
    -   Crear un validador para la obtención y eliminación de productos por ID.
    -   Modificar la función `validate` para almacenar los datos validados en `res.locals.data`.

---

## Sprint 3: Implementación de la API Core

**Objetivo:** Desarrollar los endpoints principales de la aplicación.

### Épica 5: API de Productos (CRUD)**
-   [x] **Tarea 5.1: Implementar Rutas de Productos**
    -   `GET /api/v1/products`: Listar todos los productos.
    -   `GET /api/v1/products/:id`: Obtener un producto por ID (con validación).
    -   `POST /api/v1/products`: Crear un nuevo producto (con validación).
    -   `DELETE /api/v1/products/:id`: Eliminar un producto (con validación).

---

## Tareas Adicionales Completadas

-   [x] **Corrección del Script `dev`:** Ajustado el script `dev` en `package.json` para compatibilidad con Windows.
-   [x] **Script de Build:** Añadido un script `build` en `package.json` para limpiar y copiar archivos a la carpeta `dist`.
-   [x] **Configuración de Depuración:** Creado `.vscode/launch.json` para facilitar la depuración en VS Code.
-   [x] **Control de Versiones:** Creado `.gitignore` para excluir archivos y directorios innecesarios del control de versiones.
-   [x] **Configuración de Pruebas:** Instalado `jest` y `supertest`, y configurado el script `test` en `package.json`.
-   [x] **Implementación de Pruebas de API:** Creado `tests/product.test.js` con pruebas exhaustivas para la API de productos, incluyendo mocking de la base de datos.
-   [x] **Eliminación de Referencias de Autenticación:** Eliminadas todas las referencias a la autenticación del proyecto.

---

## Backlog (Sprints Futuros)

**Objetivo:** Añadir funcionalidades avanzadas y asegurar la calidad a largo plazo.

-   [ ] **Épica 8: Pruebas Automatizadas**
    -   [ ] Escribir pruebas unitarias para los servicios y utilidades.
-   [ ] **Épica 9: Funcionalidades Adicionales**
    -   [ ] Implementar paginación en la ruta de listar productos.
    -   [ ] Implementar la ruta `PUT /api/v1/products/:id` para actualizar productos.
