import {
  Building2, CalendarDays, Clock3, Pencil, Plus, Tags, UsersRound, X,
} from 'lucide-react'
import { formatDate, getName } from '../../utils/formatters.js'
import { Avatar, ModalShell, StatusBadge } from '../common/UI.jsx'

export default function ChallengeDetailModal({ item, data, onClose, onEdit, onRegister }) {
  const company = data.empresas.find(empresa => empresa.id === item.empresaId)
  const registrations = data.registros.filter(registration => registration.retoId === item.id)
  const priority = getName(data, 'prioridades', item.prioridadId)

  return <ModalShell onClose={onClose} size="detail">
    <div className="modal-header detail-header"><div><div className="eyebrow">DETALLE DEL RETO</div><h2>{item.nombre}</h2><p>Presentado por {company?.nombre || 'Empresa no disponible'}</p></div><button className="modal-x" onClick={onClose} aria-label="Cerrar"><X size={21}/></button></div>
    <div className="detail-body">
      <div className="detail-badges"><StatusBadge value={item.estado}/><StatusBadge priority value={priority}/><span className="detail-category"><Tags size={15}/>{getName(data, 'categorias', item.categoriaId)}</span></div>
      <div className="detail-section"><h3>Acerca del desafío</h3><p>{item.descripcion}</p></div>
      <div className="detail-facts">
        <div><CalendarDays size={20}/><span><small>Fecha de inicio</small><strong>{formatDate(item.fechaInicio)}</strong></span></div>
        <div><Clock3 size={20}/><span><small>Fecha de cierre</small><strong>{formatDate(item.fechaFin)}</strong></span></div>
        <div><Building2 size={20}/><span><small>Empresa</small><strong>{company?.nombre || '—'}</strong></span></div>
        <div><UsersRound size={20}/><span><small>Participaciones</small><strong>{registrations.length} inscrito{registrations.length === 1 ? '' : 's'}</strong></span></div>
      </div>
      <div className="detail-section detail-participants"><h3>Personas inscritas <span>{registrations.length}</span></h3>{registrations.length ? registrations.map((registration, index) => <div key={registration.id} className="participant-row"><Avatar name={getName(data, 'usuarios', registration.usuarioId)} index={index} size="small"/><strong>{getName(data, 'usuarios', registration.usuarioId)}</strong><StatusBadge value={registration.estado}/></div>) : <p>Aún no hay inscripciones para este desafío.</p>}</div>
    </div>
    <div className="modal-footer"><button className="btn btn-outline" onClick={() => onEdit('retos', item)}><Pencil size={17}/> Editar reto</button><button className="btn btn-primary" onClick={() => onRegister({ retoId: item.id })}><Plus size={17}/> Inscribir usuario</button></div>
  </ModalShell>
}
