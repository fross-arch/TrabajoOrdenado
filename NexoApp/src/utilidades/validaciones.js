export const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const emailPattern = patronCorreo

export const validarCorreo = correo => patronCorreo.test(String(correo || '').trim())

export const validarPassword = (password, minLength = 8) => {
  if (!password) return { valido: false, mensaje: 'Escribe tu contraseña.' }
  if (password.length < minLength) {
    return { valido: false, mensaje: `La contraseña debe tener al menos ${minLength} caracteres.` }
  }
  return { valido: true }
}

export const validarFechasReto = (fechaInicio, fechaFin) => {
  if (!fechaInicio || !fechaFin) return { valido: true }
  if (fechaFin < fechaInicio) {
    return { valido: false, mensaje: 'La fecha de cierre no puede ser anterior a la fecha de inicio.' }
  }
  return { valido: true }
}

export const validarInscripcionDuplicada = (usuarioId, retoId, registros = [], excludeId = null) => {
  const duplicado = registros.some(
    reg => reg.usuarioId === usuarioId && reg.retoId === retoId && reg.id !== excludeId
  )
  if (duplicado) {
    return { valido: false, mensaje: 'Este usuario ya está inscrito en ese reto. Elige otra combinación.' }
  }
  return { valido: true }
}

export const validarCorreoDuplicado = (correo, lista = [], excludeId = null) => {
  const normalizado = String(correo || '').trim().toLowerCase()
  const existe = lista.some(
    elem => (elem.correo || '').toLowerCase() === normalizado && elem.id !== excludeId
  )
  if (existe) {
    return { valido: false, mensaje: 'Ese correo ya está registrado.' }
  }
  return { valido: true }
}

export const validarCamposRequeridos = (formulario, campos = []) => {
  const faltante = campos.find(campo => campo.required && !String(formulario[campo.name] ?? '').trim())
  if (faltante) {
    return { valido: false, mensaje: `Completa el campo «${faltante.label}».`, campo: faltante.name }
  }
  return { valido: true }
}

export const obtenerBloqueosEliminacion = (tipo, item, datos, reglasBloqueo = {}) => {
  const reglas = reglasBloqueo[tipo] || []
  return reglas
    .map(([tabla, campo, etiqueta]) => ({
      etiqueta,
      conteo: (datos[tabla] || []).filter(r => r[campo] === item?.id).length,
    }))
    .filter(fila => fila.conteo > 0)
}
