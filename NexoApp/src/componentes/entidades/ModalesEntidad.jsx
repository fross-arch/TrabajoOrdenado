import React, { useMemo, useState } from 'react'
import {
  Check,
  CircleAlert,
  Info,
  LockKeyhole,
  RotateCcw,
  Trash2,
  X,
} from 'lucide-react'
import { ContenedorModal } from '../comun/InterfazUI.jsx'
import {
  bloqueoRelaciones,
  configuracionEntidades,
} from '../../configuraciones/entidades.config.js'
import {
  generarId,
  getName,
  todayString,
} from '../../utilidades/formateadores.js'
import {
  obtenerBloqueosEliminacion,
  validarCorreo,
} from '../../utilidades/validaciones.js'

export function ModalFormulario({ type, item, data, onClose, onSave, initialValues }) {
  const cfg = configuracionEntidades[type]
  const initial = useMemo(
    () =>
      cfg.fields.reduce((acc, field) => {
        acc[field.name] =
          item?.[field.name] ??
          initialValues?.[field.name] ??
          (field.name === 'fechaRegistro' || field.name === 'fechaInicio'
            ? todayString()
            : field.type === 'select'
            ? field.options[0]
            : '')
        return acc
      }, {}),
    [cfg, item, initialValues]
  )
  const [form, setForm] = useState(initial)
  const [error, setError] = useState('')

  const guardar = event => {
    event.preventDefault()
    const missing = cfg.fields.find(
      field => field.required && !String(form[field.name] ?? '').trim()
    )
    if (missing) {
      setError(`Completa el campo «${missing.label}».`)
      return
    }
    if (type === 'retos' && form.fechaFin < form.fechaInicio) {
      setError('La fecha de cierre no puede ser anterior a la fecha de inicio.')
      return
    }
    if (
      type === 'registros' &&
      data.registros.some(
        reg =>
          reg.usuarioId === form.usuarioId &&
          reg.retoId === form.retoId &&
          reg.id !== item?.id
      )
    ) {
      setError(
        'Este usuario ya está inscrito en ese reto. Elige otra combinación.'
      )
      return
    }
    if (
      (type === 'usuarios' || type === 'empresas') &&
      form.correo &&
      !validarCorreo(form.correo)
    ) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    if (
      type === 'usuarios' &&
      data.usuarios.some(
        user =>
          user.correo.toLowerCase() === form.correo.toLowerCase() &&
          user.id !== item?.id
      )
    ) {
      setError('Ese correo ya está registrado.')
      return
    }

    const limpio = { ...form }
    for (const field of cfg.fields) {
      if (field.type === 'number') limpio[field.name] = Number(form[field.name])
      else limpio[field.name] = String(form[field.name] ?? '').trim()
    }
    onSave(
      type,
      { ...limpio, id: item?.id ?? generarId(type.slice(0, 1)) },
      Boolean(item)
    )
  }

  return (
    <ContenedorModal onClose={onClose} size="large">
      <form onSubmit={guardar}>
        <div className="modal-header">
          <div>
            <div className="eyebrow">
              {item ? 'EDITAR REGISTRO' : 'CREAR NUEVO REGISTRO'}
            </div>
            <h2>
              {item ? 'Editar' : 'Nuevo'} {cfg.singular}
            </h2>
            <p>
              Completa la información para{' '}
              {item ? 'actualizar' : 'agregar'}{' '}
              {type === 'registros' ? 'la participación' : `este ${cfg.singular}`}.
            </p>
          </div>
          <button
            type="button"
            className="modal-x"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <X size={21} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-grid">
            {cfg.fields.map(field => (
              <label
                key={field.name}
                className={`form-field ${field.span === 2 ? 'full' : ''}`}
              >
                <span>
                  {field.label}
                  {field.required && <em>*</em>}
                </span>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={form[field.name] ?? ''}
                    placeholder={field.placeholder ?? ''}
                    onChange={event => {
                      setForm(v => ({ ...v, [field.name]: event.target.value }))
                      setError('')
                    }}
                  />
                ) : field.type === 'relation' ? (
                  <select
                    required={field.required}
                    value={form[field.name] ?? ''}
                    onChange={event => {
                      setForm(v => ({ ...v, [field.name]: event.target.value }))
                      setError('')
                    }}
                  >
                    <option value="">Selecciona {field.label.toLowerCase()}</option>
                    {data[field.source].map(source => (
                      <option key={source.id} value={source.id}>
                        {source.nombre}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'select' ? (
                  <select
                    required={field.required}
                    value={form[field.name] ?? ''}
                    onChange={event => {
                      setForm(v => ({ ...v, [field.name]: event.target.value }))
                      setError('')
                    }}
                  >
                    {field.options.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    required={field.required}
                    type={field.type || 'text'}
                    min={field.min ?? undefined}
                    placeholder={field.placeholder ?? ''}
                    value={form[field.name] ?? ''}
                    onChange={event => {
                      setForm(v => ({ ...v, [field.name]: event.target.value }))
                      setError('')
                    }}
                  />
                )}
              </label>
            ))}
          </div>
          {type === 'registros' && (
            <div className="form-hint">
              <Info size={16} /> Cada usuario puede tener una inscripción por
              reto. Las inscripciones son simuladas.
            </div>
          )}
          {error && (
            <div className="form-error" role="alert">
              <CircleAlert size={17} />
              {error}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" type="submit">
            <Check size={18} />
            {item ? 'Guardar cambios' : 'Crear registro'}
          </button>
        </div>
      </form>
    </ContenedorModal>
  )
}
export const FormModal = ModalFormulario

export function ModalEliminar({ type, item, data, onClose, onConfirm }) {
  const links = obtenerBloqueosEliminacion(type, item, data, bloqueoRelaciones)
  const canDelete = links.length === 0

  return (
    <ContenedorModal onClose={onClose} size="small">
      <div className="delete-body">
        <span className={`delete-icon ${canDelete ? '' : 'blocked'}`}>
          {canDelete ? <Trash2 size={27} /> : <LockKeyhole size={27} />}
        </span>
        <h2>{canDelete ? '¿Eliminar registro?' : 'Este registro está en uso'}</h2>
        <p>
          {canDelete ? (
            <>
              Vas a eliminar{' '}
              <strong>
                {item.nombre ||
                  `${getName(data, 'usuarios', item.usuarioId)} · ${getName(
                    data,
                    'retos',
                    item.retoId
                  )}`}
              </strong>
              . Esta acción no se puede deshacer.
            </>
          ) : (
            <>
              No puedes eliminar <strong>{item.nombre}</strong> porque tiene
              información relacionada. Primero elimina o reasigna los registros
              dependientes.
            </>
          )}
        </p>
        {!canDelete && (
          <div className="dependency-list">
            {links.map(row => (
              <span key={row.etiqueta}>
                <CircleAlert size={16} /> {row.conteo} {row.etiqueta} relacionado
                {row.conteo === 1 ? '' : 's'}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>
          Cancelar
        </button>
        {canDelete && (
          <button
            className="btn btn-danger"
            onClick={() => onConfirm(type, item.id)}
          >
            <Trash2 size={17} /> Eliminar
          </button>
        )}
      </div>
    </ContenedorModal>
  )
}
export const DeleteModal = ModalEliminar

export function ModalRestablecer({ onClose, onConfirm }) {
  return (
    <ContenedorModal onClose={onClose} size="small">
      <div className="delete-body">
        <span className="delete-icon blocked">
          <RotateCcw size={26} />
        </span>
        <h2>¿Restablecer la demo?</h2>
        <p>
          Se restaurarán los datos ficticios originales y se eliminarán las
          cuentas creadas para la demo en este navegador. Esta acción no se puede
          deshacer.
        </p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={onConfirm}>
          <RotateCcw size={17} /> Restablecer
        </button>
      </div>
    </ContenedorModal>
  )
}
export const ResetModal = ModalRestablecer
