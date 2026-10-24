import { generarId, obtenerFechaHoy } from '../utilidades/formateadores.js'

export const CLAVE_CUENTAS = 'nexo-auth-accounts-v1'
export const ACCOUNTS_KEY = CLAVE_CUENTAS

export const CLAVE_SESION = 'nexo-auth-session-v1'
export const SESSION_KEY = CLAVE_SESION

export const ID_CUENTA_DEMO = 'demo-admin'
export const DEMO_ACCOUNT_ID = ID_CUENTA_DEMO

export const cuentaDemo = {
  id: ID_CUENTA_DEMO,
  nombre: 'Administrador Demo',
  correo: 'admin@nexo.demo',
  rol: 'Administrador',
  empresa: 'Nexo · Proyecto Integrador',
  telefono: '',
  biografia: 'Explorando retos empresariales y oportunidades de innovación.',
  creadoEl: '2026-10-01',
  usuarioId: null,
  passwordHash: null,
  salt: null,
}

export const obtenerCuentaDemo = () => ({ ...cuentaDemo })
export const getDemoAccount = obtenerCuentaDemo

export function cargarCuentas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_CUENTAS) || 'null')
    if (Array.isArray(guardadas)) {
      const demo = guardadas.find(cuenta => cuenta?.id === ID_CUENTA_DEMO)
      const usuarios = guardadas.filter(
        cuenta => cuenta?.id && cuenta.id !== ID_CUENTA_DEMO && cuenta.correo
      )
      return [{ ...cuentaDemo, ...demo }, ...usuarios]
    }
  } catch {
    /* Fallback si el localStorage está deshabilitado */
  }
  return [obtenerCuentaDemo()]
}
export const loadAccounts = cargarCuentas

export function guardarCuentas(cuentas) {
  try {
    localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentas))
  } catch {
    /* Ignorar error de cuota o modo privado */
  }
}

export function cargarSesion() {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION)
    if (guardada === null) return ID_CUENTA_DEMO
    return guardada === 'guest' ? null : guardada
  } catch {
    return ID_CUENTA_DEMO
  }
}
export const loadSession = cargarSesion

export function guardarSesion(idSesion) {
  try {
    localStorage.setItem(CLAVE_SESION, idSesion || 'guest')
  } catch {
    /* Ignorar error */
  }
}

export function nuevoSalt() {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('')
}
export const newSalt = nuevoSalt

export async function hashearPassword(password, salt) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`)
  const resultado = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(resultado), b => b.toString(16).padStart(2, '0')).join('')
}
export const hashPassword = hashearPassword

export async function autenticarUsuario(correo, password, cuentas = [], usuarios = []) {
  const normalizado = correo.trim().toLowerCase()
  const candidato = cuentas.find(
    a => a.id !== ID_CUENTA_DEMO && a.correo.toLowerCase() === normalizado
  )
  if (!candidato) {
    return {
      ok: false,
      mensaje: 'Correo o contraseña incorrectos. Puedes crear una cuenta o entrar como demo.',
    }
  }
  if (!candidato.salt || !candidato.passwordHash) {
    return { ok: false, mensaje: 'Esta cuenta no tiene credenciales configuradas.' }
  }
  const hashCalculado = await hashearPassword(password, candidato.salt)
  if (hashCalculado !== candidato.passwordHash) {
    return { ok: false, mensaje: 'Correo o contraseña incorrectos.' }
  }
  const vinculado = usuarios.find(u => u.id === candidato.usuarioId)
  if (!vinculado || vinculado.estado !== 'Activo') {
    return { ok: false, mensaje: 'Esta cuenta no está activa en el módulo Usuarios.' }
  }
  return { ok: true, cuenta: candidato }
}

export async function registrarNuevaCuenta(formulario, cuentas = [], usuarios = []) {
  const email = formulario.correo.trim().toLowerCase()
  const existe =
    cuentas.some(a => a.correo.toLowerCase() === email) ||
    usuarios.some(u => u.correo.toLowerCase() === email)

  if (existe) {
    return { ok: false, mensaje: 'Este correo ya está registrado. Prueba con uno diferente.' }
  }

  const salt = nuevoSalt()
  const passwordHash = await hashearPassword(formulario.password, salt)
  const usuarioId = generarId('u')
  const nuevaCuenta = {
    id: generarId('cuenta'),
    usuarioId,
    nombre: formulario.nombre.trim(),
    correo: email,
    empresa: formulario.empresa.trim(),
    telefono: '',
    biografia: '',
    rol: 'Participante',
    creadoEl: obtenerFechaHoy(),
    salt,
    passwordHash,
  }

  const nuevoUsuario = {
    id: usuarioId,
    nombre: nuevaCuenta.nombre,
    correo: email,
    rol: 'Participante',
    estado: 'Activo',
  }

  return { ok: true, cuenta: nuevaCuenta, usuario: nuevoUsuario }
}

export function actualizarDatosPerfil(formulario, cuentaActiva, cuentas = [], usuarios = []) {
  if (!cuentaActiva) {
    return { ok: false, mensaje: 'Inicia sesión para editar tu perfil.' }
  }
  const email = formulario.correo.trim().toLowerCase()
  const conflicto =
    cuentas.some(a => a.id !== cuentaActiva.id && a.correo.toLowerCase() === email) ||
    usuarios.some(u => u.id !== cuentaActiva.usuarioId && u.correo.toLowerCase() === email)

  if (conflicto) {
    return { ok: false, mensaje: 'Este correo ya pertenece a otra cuenta o usuario.' }
  }

  const actualizados = {
    nombre: formulario.nombre.trim(),
    correo: email,
    empresa: formulario.empresa.trim(),
    telefono: formulario.telefono.trim(),
    biografia: formulario.biografia.trim(),
  }

  return { ok: true, datosActualizados: actualizados }
}
