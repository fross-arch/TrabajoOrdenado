export const obtenerNombre = (datos, origen, id) =>
  datos[origen]?.find(item => item.id === id)?.nombre ?? 'No encontrado'

export const getName = obtenerNombre

export const formatearFecha = valor =>
  valor
    ? new Date(`${valor}T12:00:00`).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

export const formatDate = formatearFecha

export const formatearMoneda = valor =>
  typeof valor === 'number'
    ? valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
    : '—'

export const obtenerIniciales = nombre =>
  (nombre || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(palabra => palabra[0])
    .join('')
    .toUpperCase()

export const initials = obtenerIniciales

export const obtenerPrimerNombre = nombre => (nombre ? String(nombre).split(' ')[0] : '')

export const firstName = obtenerPrimerNombre

export const formatearContador = conteo => String(conteo ?? 0).padStart(2, '0')

export const displayCount = formatearContador

export const generarId = prefijo =>
  `${prefijo}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`

export const makeId = generarId

export const formatearValorCsv = valor => `"${String(valor ?? '').replace(/"/g, '""')}"`

export const csvValue = formatearValorCsv

export const obtenerFechaHoy = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const todayString = obtenerFechaHoy
