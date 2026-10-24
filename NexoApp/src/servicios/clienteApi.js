const URL_BASE = '/api'

let tokenActual = null

export function establecerTokenAutenticacion(token) {
  tokenActual = token
}

export function obtenerTokenAutenticacion() {
  return tokenActual
}

export async function solicitar(ruta, opciones = {}) {
  const cabeceras = {
    ...(opciones.body ? { 'Content-Type': 'application/json' } : {}),
    ...(tokenActual ? { Authorization: `Bearer ${tokenActual}` } : {}),
    ...opciones.headers,
  }

  const respuesta = await fetch(`${URL_BASE}${ruta}`, {
    ...opciones,
    headers: cabeceras,
  })

  if (!respuesta.ok) {
    const errorJson = await respuesta.json().catch(() => null)
    const mensaje = errorJson?.error?.message || `Error en la solicitud HTTP (${respuesta.status}).`
    throw new Error(mensaje)
  }

  if (respuesta.status === 204) {
    return null
  }

  const datos = await respuesta.json()
  return datos.data ?? datos
}

export const clienteApi = {
  solicitar,
  obtener: (ruta, opciones) => solicitar(ruta, { ...opciones, method: 'GET' }),
  crear: (ruta, cuerpo, opciones) =>
    solicitar(ruta, { ...opciones, method: 'POST', body: JSON.stringify(cuerpo) }),
  actualizar: (ruta, cuerpo, opciones) =>
    solicitar(ruta, { ...opciones, method: 'PUT', body: JSON.stringify(cuerpo) }),
  eliminar: (ruta, opciones) => solicitar(ruta, { ...opciones, method: 'DELETE' }),
  obtenerDatosGlobales: () => solicitar('/data'),
}

export default clienteApi
