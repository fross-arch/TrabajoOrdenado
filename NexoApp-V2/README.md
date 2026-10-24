# Nexo — Plataforma Web de Retos Empresariales

Frontend **SPA en React.js con Vite** del *Proyecto Integrador III*. El backend
es un proyecto independiente en la carpeta hermana `nexo-retos-backend`.

## Ejecutar el backend

Requisitos: **Node.js 20.19+ o 22.12+**, npm y MySQL.

```bash
cd ..\nexo-retos-backend
npm install
Copy-Item .env.example .env
```

Configura las credenciales en `nexo-retos-backend/.env`. Antes de ejecutar la
API, crea la base de datos:

```powershell
mysql -u root -p -e "CREATE DATABASE nexo_retos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

```bash
npm run db:setup
npm run dev
```

El setup crea las tablas e inserta los datos iniciales solo cuando sus IDs no
existen; no borra ni reemplaza los registros existentes. La API estará en
`http://localhost:3001`.

## Ejecutar el frontend

En otra terminal, desde la carpeta `nexo-retos-spa`:

```powershell
cd ..\nexo-retos-spa
npm install
npm run dev
```

Abre `http://localhost:5173`. Vite reenvía las solicitudes `/api` al backend
local. La interfaz carga los datos desde MySQL y muestra un error con opción
de reintento si la API no está disponible.

Para compilar una versión de producción:

```bash
npm run build
npm run preview
```

## Características

- **Dashboard:** indicadores, retos destacados, distribución por categorías, inscripciones recientes y participación semanal.
- **6 módulos con CRUD:** Empresas, Retos, Categorías, Prioridades, Usuarios y Registros.
- Crear, consultar, editar y eliminar registros mediante formularios y tablas.
- Vista de tarjetas y de tabla para Retos; detalle del reto e inscripciones asociadas.
- Búsqueda, filtro por estado, ordenamiento, exportación a CSV y diseño responsive.
- API REST en Node.js/Express con arquitectura MVC y conexión a MySQL.
- CRUD conectado a la base de datos para las seis entidades.
- Datos ficticios de demostración insertados por `npm run db:setup`.
- Registro e inicio de sesión de participantes con contraseñas protegidas mediante hash y token JWT.
- El frontend no mantiene una copia en `localStorage`: la base de datos es la fuente de verdad.

## Modelo relacional

| Relación | Cardinalidad |
|---|---|
| Empresa → Reto | 1:N |
| Categoría → Reto | 1:N |
| Prioridad → Reto | 1:N |
| Usuario → Registro | 1:N |
| Reto → Registro | 1:N |

Las relaciones se protegen con claves foráneas. MySQL también impide registros
duplicados del mismo usuario y reto, y correos repetidos en usuarios. El
backend valida campos, estados y rangos de fechas; los errores de integridad se
devuelven con códigos HTTP apropiados.

## Endpoints

Todos los endpoints están bajo `/api` y devuelven respuestas JSON. Los listados
y lecturas usan el formato `{ "data": ... }`; los errores usan
`{ "error": { "message": "..." } }`.

| Método | Ruta | Acción |
|---|---|---|
| GET | `/health` | Verifica disponibilidad de la API y MySQL |
| GET | `/api/data` | Carga conjunta de las seis entidades para el frontend |
| GET | `/api/{entidad}` | Lista registros |
| GET | `/api/{entidad}/:id` | Consulta un registro |
| POST | `/api/{entidad}` | Crea un registro |
| PUT | `/api/{entidad}/:id` | Actualiza un registro |
| DELETE | `/api/{entidad}/:id` | Elimina un registro |
| POST | `/api/auth/register` | Registra un participante y devuelve un token Bearer |
| POST | `/api/auth/login` | Inicia sesión y devuelve un token Bearer |
| GET | `/api/auth/me` | Valida el token y devuelve el usuario autenticado |

`{entidad}` puede ser `empresas`, `retos`, `categorias`, `prioridades`,
`usuarios` o `registros`.

La autenticación se usa en `/api/auth/me`; el CRUD existente sigue siendo
público para conservar el funcionamiento de la interfaz de demostración. Las
contraseñas se guardan como hashes en una tabla separada y los tokens expiran
en una hora. Para probar ejemplos de todos los endpoints, abre
[`peticiones.http`](../nexo-retos-backend/peticiones.http) con la extensión
REST Client de VS Code.

Configura `JWT_SECRET` en `nexo-retos-backend/.env` con una clave aleatoria de
al menos 32 caracteres antes de usar la autenticación. Puedes generarla con
`node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`.
Después de cambiar o crear `.env`, ejecuta `npm run db:setup` en el backend
para crear también la tabla de credenciales.

## Estructura del backend

```text
nexo-retos-spa/
└── ...frontend...
nexo-retos-backend/
├── .env.example
├── package.json
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── database/
```

El endpoint de verificación de sesión requiere token Bearer. Los demás
endpoints CRUD aún no requieren autenticación ni autorización; antes de
exponerlos fuera del entorno académico/local, protege las operaciones
administrativas y limita el acceso según el rol.

## Estructura del proyecto

```text
nexo-retos-spa/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                 # Estado global, navegación y operaciones CRUD
    ├── api/
    │   └── client.js           # Cliente HTTP de la API
    ├── assets/
    │   └── styles.css          # Estilos globales y de la interfaz
    ├── configs/
    │   └── entities.js         # Entidades, campos y navegación
    ├── components/             # Componentes agrupados por funcionalidad
    │   ├── about/
    │   ├── challenges/
    │   ├── common/
    │   ├── dashboard/
    │   ├── entities/
    │   └── layout/
    └── utils/
        └── formatters.js       # Formato de fechas, nombres y contadores
```

La estructura separa primero por tipo de recurso (`api`, `assets`, `configs`,
`components`, `utils`) y agrupa los componentes por funcionalidad. Por ejemplo,
el dashboard está en `components/dashboard`, los CRUD en `components/entities`
y los elementos reutilizables en `components/common`.

> Todos los nombres de empresas, usuarios, correos, retos e inscripciones incluidos son ficticios y se usan únicamente como demostración.

## Solución al error `Cannot find module '@tailwindcss/postcss'`

Este proyecto usa **CSS normal**, no Tailwind. Si hay un `postcss.config.mjs`
en una carpeta superior (por ejemplo `C:\Users\...\Downloads\`), Vite puede
intentar aplicar esa configuración a este proyecto y fallar porque no está
instalado `@tailwindcss/postcss`.

El archivo `vite.config.js` incluye `css.postcss.plugins: []` para indicar a
Vite que utilice una configuración PostCSS local vacía y **no busque
configuraciones ajenas en carpetas superiores**.

Si ya tenías el proyecto abierto, reemplaza `vite.config.js` por el del ZIP
corregido, detén el servidor con `Ctrl+C` y ejecuta `npm run dev` de nuevo.
No es necesario instalar Tailwind ni borrar archivos de otros proyectos.
