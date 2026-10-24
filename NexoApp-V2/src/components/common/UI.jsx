import { useEffect } from 'react'
import { initials } from '../../utils/formatters.js'

const statusColors = {
  Abierto: 'green',
  'En revisión': 'amber',
  Cerrado: 'neutral',
  Aprobado: 'green',
  Pendiente: 'amber',
  Rechazado: 'rose',
  Activo: 'green',
  Inactivo: 'neutral',
}

const priorityColors = { Alta: 'rose', Media: 'amber', Baja: 'blue' }

export function IconBubble({ icon: Icon, variant = 'rose', size = 18 }) {
  return <span className={`icon-bubble ${variant}`}><Icon size={size} strokeWidth={2}/></span>
}

export function StatusBadge({ value, priority = false }) {
  const color = priority ? priorityColors[value] || 'neutral' : statusColors[value] || 'neutral'
  return <span className={`status-badge ${color}`}><span className="status-dot"/>{value || '—'}</span>
}

export function Logo() {
  return <div className="brand-logo"><span className="brand-glyph"><span/><span/><span/><span/></span><span className="brand-name">nexo<span className="brand-dot">.</span></span></div>
}

export function Avatar({ name, size = 'regular', index = 0 }) {
  return <span className={`avatar ${size} av-${index % 6}`} title={name}>{initials(name)}</span>
}

export function SectionHeading({ eyebrow, title, subtitle, right }) {
  return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{right}</div>
}

export function ModalShell({ children, onClose, size = 'medium' }) {
  useEffect(() => {
    const handleKey = event => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return <div className="modal-overlay" onMouseDown={event => {
    if (event.target === event.currentTarget) onClose()
  }}>
    <div className={`modal modal-${size}`} role="dialog" aria-modal="true" aria-label="Diálogo de Nexo">{children}</div>
  </div>
}
