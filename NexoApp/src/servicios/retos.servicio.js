import { generarId, obtenerFechaHoy } from '../utilidades/formateadores.js'
import { paletaColores } from '../configuraciones/entidades.config.js'

export function obtenerRetosAbiertos(retos = []) {
  return retos.filter(r => r.estado === 'Abierto')
}

export function obtenerRetosDestacados(retos = [], limite = 3) {
  return obtenerRetosAbiertos(retos).slice(0, limite)
}

export function obtenerDistribucionCategorias(categorias = [], retos = [], colores = paletaColores) {
  const calculadas = categorias.map((cat, indice) => ({
    name: cat.nombre,
    count: retos.filter(r => r.categoriaId === cat.id).length,
    color: colores[indice % colores.length],
  }))
  return calculadas.sort((a, b) => b.count - a.count)
}

export function obtenerActividadReciente(registros = [], limite = 5) {
  return [...registros]
    .sort((a, b) => (b.fechaRegistro || '').localeCompare(a.fechaRegistro || ''))
    .slice(0, limite)
}

export function obtenerParticipacionSemanal(registros = []) {
  const hoy = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - (6 - i))
    const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
    const conteo = registros.filter(r => r.fechaRegistro === clave).length
    return {
      day: fecha.toLocaleDateString('es-CO', { weekday: 'short' }).replace('.', ''),
      key: clave,
      count: conteo,
    }
  })
}

export function inscribirUsuarioEnReto(retoId, usuarioId, observacion = '', datosActuales) {
  const nuevaInscripcion = {
    id: generarId('g'),
    usuarioId,
    retoId,
    fechaRegistro: obtenerFechaHoy(),
    observacion,
    estado: 'Pendiente',
  }
  const nuevosDatos = {
    ...datosActuales,
    registros: [nuevaInscripcion, ...(datosActuales.registros || [])],
  }
  return { nuevosDatos, nuevaInscripcion }
}
