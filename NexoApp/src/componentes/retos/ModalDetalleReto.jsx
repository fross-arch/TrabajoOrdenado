import React from 'react'
import {
  Building2,
  CalendarDays,
  Clock3,
  Pencil,
  Plus,
  Tags,
  UsersRound,
  X,
} from 'lucide-react'
import {
  Avatar,
  ContenedorModal,
  InsigniaEstado,
} from '../comun/InterfazUI.jsx'
import { formatDate, getName } from '../../utilidades/formateadores.js'

export function ModalDetalleReto({ item, data, onClose, onEdit, onRegister }) {
  const company = data.empresas.find(e => e.id === item.empresaId)
  const registros = data.registros.filter(r => r.retoId === item.id)
  const priority = getName(data, 'prioridades', item.prioridadId)

  return (
    <ContenedorModal onClose={onClose} size="detail">
      <div className="modal-header detail-header">
        <div>
          <div className="eyebrow">DETALLE DEL RETO</div>
          <h2>{item.nombre}</h2>
          <p>Presentado por {company?.nombre || 'Empresa no disponible'}</p>
        </div>
        <button className="modal-x" onClick={onClose} aria-label="Cerrar">
          <X size={21} />
        </button>
      </div>
      <div className="detail-body">
        <div className="detail-badges">
          <InsigniaEstado value={item.estado} />
          <InsigniaEstado priority value={priority} />
          <span className="detail-category">
            <Tags size={15} />
            {getName(data, 'categorias', item.categoriaId)}
          </span>
        </div>
        <div className="detail-section">
          <h3>Acerca del desafío</h3>
          <p>{item.descripcion}</p>
        </div>
        <div className="detail-facts">
          <div>
            <CalendarDays size={20} />
            <span>
              <small>Fecha de inicio</small>
              <strong>{formatDate(item.fechaInicio)}</strong>
            </span>
          </div>
          <div>
            <Clock3 size={20} />
            <span>
              <small>Fecha de cierre</small>
              <strong>{formatDate(item.fechaFin)}</strong>
            </span>
          </div>
          <div>
            <Building2 size={20} />
            <span>
              <small>Empresa</small>
              <strong>{company?.nombre || '—'}</strong>
            </span>
          </div>
          <div>
            <UsersRound size={20} />
            <span>
              <small>Participaciones</small>
              <strong>
                {registros.length} inscrito{registros.length === 1 ? '' : 's'}
              </strong>
            </span>
          </div>
        </div>
        <div className="detail-section detail-participants">
          <h3>
            Personas inscritas <span>{registros.length}</span>
          </h3>
          {registros.length ? (
            registros.map((reg, index) => (
              <div key={reg.id} className="participant-row">
                <Avatar
                  name={getName(data, 'usuarios', reg.usuarioId)}
                  index={index}
                  size="small"
                />
                <strong>{getName(data, 'usuarios', reg.usuarioId)}</strong>
                <InsigniaEstado value={reg.estado} />
              </div>
            ))
          ) : (
            <p>Aún no hay inscripciones para este desafío.</p>
          )}
        </div>
      </div>
      <div className="modal-footer">
        <button
          className="btn btn-outline"
          onClick={() => onEdit('retos', item)}
        >
          <Pencil size={17} /> Editar reto
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onRegister({ retoId: item.id })}
        >
          <Plus size={17} /> Inscribir usuario
        </button>
      </div>
    </ContenedorModal>
  )
}

export const DetailModal = ModalDetalleReto
export const ChallengeDetailModal = ModalDetalleReto
export default ModalDetalleReto
