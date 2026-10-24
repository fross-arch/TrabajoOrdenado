import { CLAVE_ALMACENAMIENTO, datosIniciales } from '../configuraciones/entidades.config.js'
import { generarId } from '../utilidades/formateadores.js'

export function cargarDatos() {
  try {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO)
    if (!guardado) return structuredClone(datosIniciales)
    const parseado = JSON.parse(guardado)
    const clavesValidas = Object.keys(datosIniciales).every(clave => Array.isArray(parseado[clave]))
    if (!clavesValidas) throw new Error('Conjunto de datos inválido')
    return parseado
  } catch {
    return structuredClone(datosIniciales)
  }
}
export const loadData = cargarDatos

export function guardarDatos(datos) {
  try {
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(datos))
  } catch {
    /* Manejo silencioso de fallas de almacenamiento */
  }
}

export function restablecerDatos() {
  const datosClonados = structuredClone(datosIniciales)
  guardarDatos(datosClonados)
  return datosClonados
}

export function crearEntidad(tipo, nuevoItem, datosActuales) {
  const itemConId = {
    ...nuevoItem,
    id: nuevoItem.id || generarId(tipo.slice(0, 1)),
  }
  const nuevosDatos = {
    ...datosActuales,
    [tipo]: [itemConId, ...(datosActuales[tipo] || [])],
  }
  guardarDatos(nuevosDatos)
  return { nuevosDatos, itemCreado: itemConId }
}

export function actualizarEntidad(tipo, id, itemActualizado, datosActuales) {
  const nuevosDatos = {
    ...datosActuales,
    [tipo]: (datosActuales[tipo] || []).map(r => (r.id === id ? { ...r, ...itemActualizado } : r)),
  }
  guardarDatos(nuevosDatos)
  return { nuevosDatos, itemActualizado }
}

export function eliminarEntidad(tipo, id, datosActuales) {
  const nuevosDatos = {
    ...datosActuales,
    [tipo]: (datosActuales[tipo] || []).filter(r => r.id !== id),
  }
  guardarDatos(nuevosDatos)
  return { nuevosDatos, idEliminado: id }
}
