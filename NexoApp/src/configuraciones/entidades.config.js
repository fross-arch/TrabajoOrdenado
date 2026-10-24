export const CLAVE_ALMACENAMIENTO = 'nexo-retos-demo-v1'
export const STORAGE_KEY = CLAVE_ALMACENAMIENTO

export const paletaColores = ['#f1a3bf', '#94a9f8', '#9bdcca', '#fed69a', '#b5a3e9', '#c1c8d7']
export const colors = paletaColores

export const coloresEstado = {
  Abierto: 'green',
  'En revisión': 'amber',
  Cerrado: 'neutral',
  Aprobado: 'green',
  Pendiente: 'amber',
  Rechazado: 'rose',
  Activo: 'green',
  Inactivo: 'neutral',
}
export const statusColors = coloresEstado

export const coloresPrioridad = {
  Alta: 'rose',
  Media: 'amber',
  Baja: 'blue',
}
export const priorityColors = coloresPrioridad

export const bloqueoRelaciones = {
  empresas: [['retos', 'empresaId', 'retos']],
  categorias: [['retos', 'categoriaId', 'retos']],
  prioridades: [['retos', 'prioridadId', 'retos']],
  usuarios: [['registros', 'usuarioId', 'registros']],
  retos: [['registros', 'retoId', 'registros']],
}
export const relationBlocking = bloqueoRelaciones

export const elementosNavegacion = [
  { id: 'dashboard', label: 'Resumen', icon: 'LayoutDashboard' },
  { id: 'retos', label: 'Retos', icon: 'Target' },
  { id: 'empresas', label: 'Empresas', icon: 'Building2' },
  { id: 'categorias', label: 'Categorías', icon: 'Tags' },
  { id: 'prioridades', label: 'Prioridades', icon: 'Flag' },
  { id: 'usuarios', label: 'Usuarios', icon: 'UsersRound' },
  { id: 'registros', label: 'Registros', icon: 'ClipboardList' },
]
export const navItems = elementosNavegacion

export const datosIniciales = {
  empresas: [
    { id: 'e1', nombre: 'Andina Tech', nit: '901456781-2', sector: 'Tecnología', contacto: 'Mariana Gómez', correo: 'alianzas@andinatech.demo', telefono: '300 456 7812' },
    { id: 'e2', nombre: 'EcoFuturo SAS', nit: '901234567-1', sector: 'Sostenibilidad', contacto: 'Carlos Rojas', correo: 'contacto@ecofuturo.demo', telefono: '301 234 5678' },
    { id: 'e3', nombre: 'Grupo Horizonte', nit: '900876543-5', sector: 'Servicios', contacto: 'Andrea Torres', correo: 'innovacion@horizonte.demo', telefono: '310 876 5432' },
    { id: 'e4', nombre: 'NovaLogística', nit: '901112233-4', sector: 'Logística', contacto: 'Felipe Castro', correo: 'retos@novalogistica.demo', telefono: '315 112 2334' },
    { id: 'e5', nombre: 'Alimentos del Valle', nit: '900334455-6', sector: 'Alimentos', contacto: 'Lucía Méndez', correo: 'talento@alimentosvalle.demo', telefono: '316 334 4556' },
    { id: 'e6', nombre: 'Salud Conecta', nit: '901667788-0', sector: 'Salud', contacto: 'Pablo Vargas', correo: 'ideas@saludconecta.demo', telefono: '317 667 7880' },
  ],
  categorias: [
    { id: 'c1', nombre: 'Tecnología', descripcion: 'Soluciones digitales y transformación tecnológica.' },
    { id: 'c2', nombre: 'Sostenibilidad', descripcion: 'Proyectos con impacto ambiental y social.' },
    { id: 'c3', nombre: 'Innovación', descripcion: 'Nuevos productos, servicios y oportunidades.' },
    { id: 'c4', nombre: 'Operaciones', descripcion: 'Optimización de procesos y productividad.' },
    { id: 'c5', nombre: 'Talento humano', descripcion: 'Experiencia y desarrollo de las personas.' },
  ],
  prioridades: [
    { id: 'p1', nombre: 'Alta', nivel: 1 },
    { id: 'p2', nombre: 'Media', nivel: 2 },
    { id: 'p3', nombre: 'Baja', nivel: 3 },
  ],
  usuarios: [
    { id: 'u1', nombre: 'Valentina Pérez', correo: 'valentina.perez@ejemplo.demo', rol: 'Participante', estado: 'Activo' },
    { id: 'u2', nombre: 'Mateo Herrera', correo: 'mateo.herrera@ejemplo.demo', rol: 'Participante', estado: 'Activo' },
    { id: 'u3', nombre: 'Isabella Rodríguez', correo: 'isabella.rodriguez@ejemplo.demo', rol: 'Participante', estado: 'Activo' },
    { id: 'u4', nombre: 'Santiago Martínez', correo: 'santiago.martinez@ejemplo.demo', rol: 'Participante', estado: 'Activo' },
    { id: 'u5', nombre: 'Camila López', correo: 'camila.lopez@ejemplo.demo', rol: 'Evaluador', estado: 'Activo' },
    { id: 'u6', nombre: 'Nicolás Ramírez', correo: 'nicolas.ramirez@ejemplo.demo', rol: 'Participante', estado: 'Activo' },
    { id: 'u7', nombre: 'Daniela Castro', correo: 'daniela.castro@ejemplo.demo', rol: 'Participante', estado: 'Inactivo' },
    { id: 'u8', nombre: 'Juan Felipe Ortiz', correo: 'juan.ortiz@ejemplo.demo', rol: 'Administrador', estado: 'Activo' },
  ],
  retos: [
    { id: 'r1', nombre: 'Reducir la huella de carbono', descripcion: 'Diseñar una propuesta digital y medible que permita disminuir las emisiones operativas en nuestros centros de distribución.', empresaId: 'e2', categoriaId: 'c2', prioridadId: 'p1', fechaInicio: '2026-10-01', fechaFin: '2026-11-30', estado: 'Abierto' },
    { id: 'r2', nombre: 'Experiencia de atención inteligente', descripcion: 'Prototipar un asistente que mejore la experiencia de pacientes y reduzca tiempos de espera en procesos de atención.', empresaId: 'e6', categoriaId: 'c1', prioridadId: 'p1', fechaInicio: '2026-10-05', fechaFin: '2026-12-10', estado: 'Abierto' },
    { id: 'r3', nombre: 'Optimizar rutas de última milla', descripcion: 'Crear una solución para planear rutas de entrega más eficientes a partir de datos ficticios de pedidos.', empresaId: 'e4', categoriaId: 'c4', prioridadId: 'p2', fechaInicio: '2026-09-20', fechaFin: '2026-11-15', estado: 'Abierto' },
    { id: 'r4', nombre: 'Empaques que cuidan el planeta', descripcion: 'Proponer empaques reutilizables para alimentos sin comprometer la conservación ni el transporte.', empresaId: 'e5', categoriaId: 'c2', prioridadId: 'p2', fechaInicio: '2026-10-10', fechaFin: '2026-12-20', estado: 'Abierto' },
    { id: 'r5', nombre: 'Analítica para decisiones comerciales', descripcion: 'Desarrollar un tablero que conecte indicadores clave y facilite la toma de decisiones del equipo comercial.', empresaId: 'e1', categoriaId: 'c1', prioridadId: 'p1', fechaInicio: '2026-09-10', fechaFin: '2026-10-31', estado: 'En revisión' },
    { id: 'r6', nombre: 'Bienestar laboral 360°', descripcion: 'Idear una estrategia para conocer y mejorar el bienestar y la motivación de colaboradores.', empresaId: 'e3', categoriaId: 'c5', prioridadId: 'p3', fechaInicio: '2026-09-05', fechaFin: '2026-10-21', estado: 'En revisión' },
    { id: 'r7', nombre: 'Automatización de inventarios', descripcion: 'Diseñar un flujo de inventario ágil con herramientas digitales de bajo costo.', empresaId: 'e4', categoriaId: 'c4', prioridadId: 'p2', fechaInicio: '2026-08-15', fechaFin: '2026-09-30', estado: 'Cerrado' },
    { id: 'r8', nombre: 'Laboratorio de ideas abiertas', descripcion: 'Construir una dinámica participativa para transformar ideas de equipos en pilotos de innovación.', empresaId: 'e1', categoriaId: 'c3', prioridadId: 'p3', fechaInicio: '2026-10-07', fechaFin: '2026-12-01', estado: 'Abierto' },
    { id: 'r9', nombre: 'Consumo energético inteligente', descripcion: 'Identificar oportunidades de ahorro energético en sedes con apoyo de medición y análisis de datos.', empresaId: 'e2', categoriaId: 'c2', prioridadId: 'p2', fechaInicio: '2026-09-28', fechaFin: '2026-11-18', estado: 'Abierto' },
    { id: 'r10', nombre: 'Alimentación saludable accesible', descripcion: 'Diseñar un nuevo canal que acerque opciones nutritivas a jóvenes y familias.', empresaId: 'e5', categoriaId: 'c3', prioridadId: 'p2', fechaInicio: '2026-09-02', fechaFin: '2026-10-05', estado: 'Cerrado' },
  ],
  registros: [
    { id: 'g1', usuarioId: 'u1', retoId: 'r1', fechaRegistro: '2026-10-12', observacion: 'Propuesta de medición ambiental.', estado: 'Pendiente' },
    { id: 'g2', usuarioId: 'u2', retoId: 'r2', fechaRegistro: '2026-10-11', observacion: 'Prototipo de chatbot.', estado: 'Aprobado' },
    { id: 'g3', usuarioId: 'u3', retoId: 'r1', fechaRegistro: '2026-10-10', observacion: 'Interés en economía circular.', estado: 'Aprobado' },
    { id: 'g4', usuarioId: 'u4', retoId: 'r4', fechaRegistro: '2026-10-09', observacion: 'Diseño de nuevos materiales.', estado: 'Pendiente' },
    { id: 'g5', usuarioId: 'u6', retoId: 'r3', fechaRegistro: '2026-10-08', observacion: 'Modelo de rutas.', estado: 'Pendiente' },
    { id: 'g6', usuarioId: 'u1', retoId: 'r5', fechaRegistro: '2026-10-07', observacion: 'Dashboard de indicadores.', estado: 'Aprobado' },
    { id: 'g7', usuarioId: 'u2', retoId: 'r8', fechaRegistro: '2026-10-07', observacion: 'Metodología de ideación.', estado: 'Pendiente' },
    { id: 'g8', usuarioId: 'u3', retoId: 'r9', fechaRegistro: '2026-10-06', observacion: 'Sistema de análisis.', estado: 'Rechazado' },
    { id: 'g9', usuarioId: 'u4', retoId: 'r6', fechaRegistro: '2026-10-05', observacion: 'Encuesta digital.', estado: 'Aprobado' },
    { id: 'g10', usuarioId: 'u5', retoId: 'r3', fechaRegistro: '2026-10-03', observacion: 'Optimización de recorridos.', estado: 'Pendiente' },
    { id: 'g11', usuarioId: 'u6', retoId: 'r2', fechaRegistro: '2026-10-02', observacion: 'Asistente de atención.', estado: 'Aprobado' },
    { id: 'g12', usuarioId: 'u7', retoId: 'r7', fechaRegistro: '2026-09-25', observacion: 'Prototipo inventarios.', estado: 'Aprobado' },
    { id: 'g13', usuarioId: 'u1', retoId: 'r9', fechaRegistro: '2026-10-12', observacion: 'Sensores inteligentes.', estado: 'Pendiente' },
    { id: 'g14', usuarioId: 'u2', retoId: 'r4', fechaRegistro: '2026-10-11', observacion: 'Material biodegradable.', estado: 'Pendiente' },
  ],
}
export const initialData = datosIniciales

export const configuracionEntidades = {
  retos: {
    title: 'Retos empresariales',
    singular: 'reto',
    description: 'Administra los desafíos, empresas y oportunidades de innovación.',
    icon: 'Target',
    columns: [
      { field: 'nombre', label: 'Reto' },
      { field: 'empresaId', label: 'Empresa', relation: 'empresas' },
      { field: 'categoriaId', label: 'Categoría', relation: 'categorias' },
      { field: 'prioridadId', label: 'Prioridad', relation: 'prioridades' },
      { field: 'estado', label: 'Estado' },
      { field: 'fechaFin', label: 'Cierre', type: 'date' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre del reto', required: true, placeholder: 'Ej. Reducir tiempos de entrega', span: 2 },
      { name: 'descripcion', label: 'Descripción', type: 'textarea', required: true, placeholder: 'Describe el desafío y qué se espera lograr...', span: 2 },
      { name: 'empresaId', label: 'Empresa', type: 'relation', source: 'empresas', required: true },
      { name: 'categoriaId', label: 'Categoría', type: 'relation', source: 'categorias', required: true },
      { name: 'prioridadId', label: 'Prioridad', type: 'relation', source: 'prioridades', required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Abierto', 'En revisión', 'Cerrado'], required: true },
      { name: 'fechaInicio', label: 'Fecha de inicio', type: 'date', required: true },
      { name: 'fechaFin', label: 'Fecha de cierre', type: 'date', required: true },
    ],
  },
  empresas: {
    title: 'Empresas',
    singular: 'empresa',
    description: 'Organizaciones que proponen los retos de la plataforma.',
    icon: 'Building2',
    columns: [
      { field: 'nombre', label: 'Empresa' },
      { field: 'nit', label: 'NIT' },
      { field: 'sector', label: 'Sector' },
      { field: 'contacto', label: 'Contacto' },
      { field: 'correo', label: 'Correo' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre de la empresa', required: true, span: 2, placeholder: 'Ej. Innovación del Norte SAS' },
      { name: 'nit', label: 'NIT', required: true, placeholder: '900123456-7' },
      { name: 'sector', label: 'Sector', required: true, placeholder: 'Ej. Tecnología' },
      { name: 'contacto', label: 'Persona de contacto', required: true },
      { name: 'telefono', label: 'Teléfono', type: 'tel' },
      { name: 'correo', label: 'Correo de contacto', type: 'email', required: true, span: 2 },
    ],
  },
  categorias: {
    title: 'Categorías',
    singular: 'categoría',
    description: 'Clasifica los retos por temática o sector de interés.',
    icon: 'Tags',
    columns: [
      { field: 'nombre', label: 'Categoría' },
      { field: 'descripcion', label: 'Descripción' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre de la categoría', required: true, span: 2 },
      { name: 'descripcion', label: 'Descripción', type: 'textarea', span: 2, required: true },
    ],
  },
  prioridades: {
    title: 'Prioridades',
    singular: 'prioridad',
    description: 'Define la atención requerida para cada reto.',
    icon: 'Flag',
    columns: [
      { field: 'nombre', label: 'Prioridad' },
      { field: 'nivel', label: 'Nivel' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre', required: true, placeholder: 'Ej. Urgente' },
      { name: 'nivel', label: 'Nivel numérico', type: 'number', required: true, min: 1, placeholder: '1' },
    ],
  },
  usuarios: {
    title: 'Usuarios',
    singular: 'usuario',
    description: 'Personas que consultan y participan en los retos.',
    icon: 'UsersRound',
    columns: [
      { field: 'nombre', label: 'Usuario' },
      { field: 'correo', label: 'Correo' },
      { field: 'rol', label: 'Rol' },
      { field: 'estado', label: 'Estado' },
    ],
    fields: [
      { name: 'nombre', label: 'Nombre completo', required: true, span: 2 },
      { name: 'correo', label: 'Correo electrónico', type: 'email', required: true, span: 2 },
      { name: 'rol', label: 'Rol', type: 'select', options: ['Participante', 'Evaluador', 'Administrador'], required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Activo', 'Inactivo'], required: true },
    ],
  },
  registros: {
    title: 'Registros',
    singular: 'registro',
    description: 'Gestiona las inscripciones de usuarios a los retos.',
    icon: 'ClipboardList',
    columns: [
      { field: 'usuarioId', label: 'Participante', relation: 'usuarios' },
      { field: 'retoId', label: 'Reto', relation: 'retos' },
      { field: 'fechaRegistro', label: 'Fecha', type: 'date' },
      { field: 'estado', label: 'Estado' },
      { field: 'observacion', label: 'Observación' },
    ],
    fields: [
      { name: 'usuarioId', label: 'Usuario', type: 'relation', source: 'usuarios', required: true },
      { name: 'retoId', label: 'Reto', type: 'relation', source: 'retos', required: true },
      { name: 'fechaRegistro', label: 'Fecha de registro', type: 'date', required: true },
      { name: 'estado', label: 'Estado', type: 'select', options: ['Pendiente', 'Aprobado', 'Rechazado'], required: true },
      { name: 'observacion', label: 'Observación', type: 'textarea', span: 2, placeholder: 'Observaciones opcionales...' },
    ],
  },
}
export const entityConfig = configuracionEntidades
