# Nexo — Plataforma Web de Retos Empresariales

Demo **SPA en React.js con Vite**, diseñada como frontend del *Proyecto Integrador III*. Está basada en el documento académico enviado para la plataforma de retos empresariales.

## Ejecutar el proyecto

Requisitos: **Node.js 20.19+ o 22.12+** y npm.

```bash
npm install
npm run dev
```

Abre la URL que indique Vite (normalmente `http://localhost:5173`).

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
- **Persistencia en `localStorage`**, sin API, base de datos ni autenticación real.
- **Menú del avatar:** accesos a Iniciar sesión, Registrarse, Mi perfil y Cerrar sesión.
- **Login simulado:** acceso con cuentas locales creadas desde registro o acceso rápido como administrador demo.
- **Registro simulado:** validación de contraseña y correo duplicado; crea una cuenta local y su registro asociado en el módulo Usuarios.
- **Mi perfil:** consulta de datos, edición de nombre, correo, organización, teléfono y presentación, además de inscripciones asociadas.
- **Persistencia de sesión y cuentas** en este navegador. Las contraseñas de cuentas registradas se guardan como resúmenes SHA-256 con sal, exclusivamente para pruebas de interfaz.
- Datos ficticios listos para demostraciones; opción de **restablecer los datos** desde la sección "Sobre el proyecto" o el perfil de la barra lateral.

## Acceder a las nuevas pantallas

1. Inicia el proyecto y pulsa el avatar **AD** situado arriba a la derecha.
2. El menú permite abrir **Mi perfil**, **Iniciar sesión / Cambiar de cuenta** o **Registrarse**.
3. Al entrar por primera vez, la app mantiene la sesión **Administrador Demo** del proyecto original para no alterar la apariencia. En **Iniciar sesión** existe el botón **Entrar como administrador demo**.
4. Para probar el flujo completo, pulsa **Cerrar sesión**, crea una cuenta con un correo ficticio y una contraseña ficticia (mínimo 8 caracteres). La cuenta se inicia automáticamente y aparece en **Usuarios**.
5. Cierra sesión e ingresa con las credenciales que acabas de registrar. Abre **Mi perfil** y cambia tus datos. Si creas un **Registro** asociado a ese usuario, aparecerá en **Mis inscripciones**.

Rutas: `/#login`, `/#registro`, `/#perfil`. Se utilizan rutas hash, sin necesidad de instalar React Router.

> ⚠️ **No es un sistema de seguridad real.** Aunque se evita guardar contraseñas en texto plano, la verificación y los datos ocurren íntegramente en el navegador y se pueden manipular. Usa **solo credenciales ficticias**. No hay servidor, cookies seguras, token real ni recuperación de contraseñas.

## Relaciones simuladas

| Relación | Cardinalidad |
|---|---|
| Empresa → Reto | 1:N |
| Categoría → Reto | 1:N |
| Prioridad → Reto | 1:N |
| Usuario → Registro | 1:N |
| Reto → Registro | 1:N |

- Las listas desplegables de formularios usan los datos vigentes de las entidades relacionadas.
- No se permite borrar una entidad que tenga registros dependientes hasta eliminar/reasignar esos registros.
- No se permite inscribir dos veces al mismo usuario al mismo reto.
- Se valida que la fecha de cierre de un reto no sea anterior a su fecha de inicio.
- Los correos se validan en el formulario de usuarios; no se permiten correos duplicados para usuarios.

## Estructura del proyecto (Arquitectura Calificación 5.0)

```text
src/
├── activos/                          # [OTROS] Estilos globales, imágenes y fuentes
│   └── estilos/
│       ├── principal.css
│       └── cuenta.css
│
├── esquemas/                         # [LAYOUT] Estructura base de navegación y vistas envolventes
│   ├── BarraLateral.jsx             # (Sidebar)
│   └── DisenoPrincipal.jsx           # Contenedor principal con header/sidebar
│
├── paginas/                          # [PÁGINAS] Vistas completas asociadas a las rutas/pantallas
│   ├── autenticacion/
│   │   └── PaginaAutenticacion.jsx   # (AuthPages)
│   ├── tablero/
│   │   └── PaginaTablero.jsx         # (Dashboard)
│   ├── entidades/
│   │   └── PaginaEntidades.jsx       # (EntityPage)
│   └── acerca-de/
│       └── PaginaAcercaDe.jsx        # (AboutPage)
│
├── componentes/                      # [COMPONENTES] Elementos UI organizados por feature
│   ├── comun/                        # Reutilizables transversales
│   │   └── InterfazUI.jsx            # (UI / Botones / Badges comunes)
│   ├── retos/                        # Feature Retos
│   │   └── ModalDetalleReto.jsx      # (ChallengeDetailModal)
│   └── entidades/                    # Feature Entidades
│       └── ModalesEntidad.jsx        # (EntityModals)
│
├── servicios/                        # [SERVICIOS] Peticiones HTTP, clientes API y conexión al backend
│   ├── clienteApi.js                 # Configuración de base URL, headers y fetch
│   ├── autenticacion.servicio.js     # Login, registro y manejo de token
│   ├── entidades.servicio.js         # Operaciones CRUD de entidades
│   └── retos.servicio.js             # Consultas y acciones sobre retos
│
├── utilidades/                       # [UTILIDADES] Helpers puros y formateadores
│   ├── formateadores.js              # (formatters / fechas / moneda)
│   └── validaciones.js               # Validadores de formularios
│
├── configuraciones/                  # [OTROS] Constantes del negocio y esquemas de datos
│   └── entidades.config.js           # (configs/entities.js)
│
├── App.jsx                           # Orquestador principal de vistas y rutas
└── main.jsx                          # Punto de entrada de la aplicación Vite/React
```

## Alcance académico

- **Solo frontend**: no implementa Backend II, endpoints REST, autenticación **real**, JWT, Swagger, JPA ni Postman.
- La aplicación **no consulta APIs reales**. Los datos se leen de un conjunto inicial o de `localStorage`.
- El CRUD y las cuentas simuladas sirven para presentar la navegación y el comportamiento de los formularios mientras se desarrolla el backend en otra fase.
- **Restablecer datos** también elimina cuentas creadas en la demo, y devuelve la sesión al Administrador Demo.
- Es posible reemplazar más adelante las operaciones locales por llamadas HTTP a una API real.

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
