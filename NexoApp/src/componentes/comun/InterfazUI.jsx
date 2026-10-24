import React, { useEffect, useRef, useState } from 'react'
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  LogIn,
  LogOut,
  Target,
  TrendingUp,
  UserPlus,
  UserRound,
} from 'lucide-react'
import {
  coloresEstado,
  coloresPrioridad,
} from '../../configuraciones/entidades.config.js'
import {
  ID_CUENTA_DEMO,
} from '../../servicios/autenticacion.servicio.js'
import {
  displayCount,
  formatDate,
  getName,
  initials,
} from '../../utilidades/formateadores.js'

export function BurbujaIcono({ icon: Icon, variant = 'rose', size = 18 }) {
  return (
    <span className={`icon-bubble ${variant}`}>
      <Icon size={size} strokeWidth={2} />
    </span>
  )
}
export const IconBubble = BurbujaIcono

export function InsigniaEstado({ value, priority = false }) {
  const color = priority
    ? coloresPrioridad[value] || 'neutral'
    : coloresEstado[value] || 'neutral'
  return (
    <span className={`status-badge ${color}`}>
      <span className="status-dot" />
      {value || '—'}
    </span>
  )
}
export const StatusBadge = InsigniaEstado

export function Logotipo() {
  return (
    <div className="brand-logo">
      <span className="brand-glyph">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="brand-name">
        nexo<span className="brand-dot">.</span>
      </span>
    </div>
  )
}
export const Logo = Logotipo

export function Avatar({ name, size = 'regular', index = 0 }) {
  return (
    <span className={`avatar ${size} av-${index % 6}`} title={name}>
      {initials(name)}
    </span>
  )
}

export function EncabezadoSeccion({ eyebrow, title, subtitle, right }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}
export const SectionHeading = EncabezadoSeccion

export function ContenedorModal({ children, onClose, size = 'medium' }) {
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

  return (
    <div
      className="modal-overlay"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className={`modal modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-label="Diálogo de Nexo"
      >
        {children}
      </div>
    </div>
  )
}
export const ModalShell = ContenedorModal

export function TarjetaEstadistica({ icon: Icon, label, value, change, variant }) {
  return (
    <div className="stat-card">
      <div className="stat-heading">
        <BurbujaIcono icon={Icon} variant={variant} />
        <ArrowUpRight size={17} className="stat-arrow" />
      </div>
      <strong className="stat-value">{displayCount(value)}</strong>
      <span className="stat-label">{label}</span>
      <div className="stat-footer">
        <span className={`stat-trend ${variant}`}>
          <TrendingUp size={13} />
          {change}
        </span>
        <span>datos simulados</span>
      </div>
    </div>
  )
}
export const StatCard = TarjetaEstadistica

export function TarjetaReto({ reto, data, onView, index = 0 }) {
  const empresa = getName(data, 'empresas', reto.empresaId)
  const prioridad = getName(data, 'prioridades', reto.prioridadId)
  const categoria = getName(data, 'categorias', reto.categoriaId)

  return (
    <article className="challenge-card">
      <div className="challenge-card-head">
        <span className={`challenge-icon challenge-tone-${index % 5}`}>
          <Target size={21} />
        </span>
        <InsigniaEstado value={reto.estado} />
      </div>
      <div className="challenge-company">{empresa}</div>
      <button className="challenge-title" onClick={() => onView(reto)}>
        {reto.nombre}
      </button>
      <p>{reto.descripcion}</p>
      <div className="challenge-tags">
        <span>{categoria}</span>
        <InsigniaEstado priority value={prioridad} />
      </div>
      <div className="challenge-card-footer">
        <span>
          <CalendarDays size={15} /> Hasta {formatDate(reto.fechaFin)}
        </span>
        <button
          onClick={() => onView(reto)}
          aria-label={`Ver detalle de ${reto.nombre}`}
        >
          <ArrowUpRight size={20} />
        </button>
      </div>
    </article>
  )
}
export const ChallengeCard = TarjetaReto

export function MenuCuenta({ account, navigate, onLogout }) {
  const [abierto, setAbierto] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!abierto) return
    const outside = event => {
      if (!menuRef.current?.contains(event.target)) setAbierto(false)
    }
    const escape = event => {
      if (event.key === 'Escape') setAbierto(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [abierto])

  const irA = pagina => {
    setAbierto(false)
    navigate(pagina)
  }

  return (
    <div className="account-menu" ref={menuRef}>
      <button
        className={`account-trigger ${abierto ? 'is-open' : ''}`}
        onClick={() => setAbierto(v => !v)}
        aria-expanded={abierto}
        aria-haspopup="menu"
        aria-label="Abrir menú de cuenta"
        title="Menú de cuenta"
      >
        <Avatar
          name={account?.nombre || 'Invitado'}
          index={account?.id === ID_CUENTA_DEMO ? 4 : 1}
        />
        <ChevronDown size={14} />
      </button>
      {abierto && (
        <div className="account-dropdown" role="menu" aria-label="Opciones de cuenta">
          <div className="dropdown-user">
            <Avatar
              name={account?.nombre || 'Invitado'}
              index={account?.id === ID_CUENTA_DEMO ? 4 : 1}
            />
            <div>
              <strong>{account?.nombre || 'Invitado'}</strong>
              <span>{account?.correo || 'Sin sesión iniciada'}</span>
            </div>
          </div>
          <div className="dropdown-caption">MI CUENTA</div>
          <button
            role="menuitem"
            className="dropdown-action"
            onClick={() => irA('perfil')}
          >
            <UserRound size={17} /> Mi perfil <ChevronRight size={15} />
          </button>
          <button
            role="menuitem"
            className="dropdown-action"
            onClick={() => irA('login')}
          >
            <LogIn size={17} /> {account ? 'Cambiar de cuenta' : 'Iniciar sesión'}{' '}
            <ChevronRight size={15} />
          </button>
          <button
            role="menuitem"
            className="dropdown-action"
            onClick={() => irA('registro')}
          >
            <UserPlus size={17} /> Registrarse <ChevronRight size={15} />
          </button>
          {account && (
            <>
              <div className="dropdown-separator" />
              <button
                role="menuitem"
                className="dropdown-action logout"
                onClick={() => {
                  setAbierto(false)
                  onLogout()
                }}
              >
                <LogOut size={17} /> Cerrar sesión
              </button>
            </>
          )}
          <div className="dropdown-bottom">
            <span className="mini-live" /> Modo demostración · datos locales
          </div>
        </div>
      )}
    </div>
  )
}
export const AccountMenu = MenuCuenta
