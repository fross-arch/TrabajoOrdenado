import {
  ArrowUpRight, BookOpen, Building2, ChevronDown, ClipboardList, Flag,
  Layers3, LayoutDashboard, Sparkles, Tags, Target, UsersRound, X,
} from 'lucide-react'
import { navItems } from '../../configs/entities.js'
import { Avatar, Logo } from '../common/UI.jsx'

const icons = { LayoutDashboard, Target, Building2, Tags, Flag, UsersRound, ClipboardList }

export default function Sidebar({ active, onNavigate, open, onClose, counts }) {
  return <>
    {open && <div className="mobile-backdrop" onClick={onClose}/>}
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-top"><Logo/><button className="icon-only sidebar-close" onClick={onClose} aria-label="Cerrar menú"><X size={19}/></button></div>
      <div className="sidebar-workspace"><span className="workspace-icon"><Layers3 size={19}/></span><div><strong>Espacio de trabajo</strong><small>Proyecto integrador III</small></div><ChevronDown size={15}/></div>
      <div className="menu-caption">MENÚ PRINCIPAL</div>
      <nav aria-label="Navegación principal" className="nav-items">
        {navItems.map(nav => {
          const Icon = icons[nav.icon]
          return <button key={nav.id} className={`nav-item ${active === nav.id ? 'active' : ''}`} onClick={() => { onNavigate(nav.id); onClose() }}>
            <Icon size={19} strokeWidth={1.95}/><span>{nav.label}</span>
            {nav.id === 'registros' && <span className="nav-count">{counts.registros}</span>}
          </button>
        })}
      </nav>
      <div className="sidebar-lower">
        <div className="menu-caption">TU ESPACIO</div>
        <button className="nav-item" onClick={() => { onNavigate('acerca'); onClose() }}><BookOpen size={19}/><span>Sobre el proyecto</span></button>
        <div className="sidebar-promo">
          <span className="sparkle-surface"><Sparkles size={22}/></span>
          <strong>Las grandes ideas empiezan con un reto.</strong>
          <p>Conecta empresas con soluciones que generan impacto.</p>
          <button onClick={() => { onNavigate('retos'); onClose() }}>Explorar retos <ArrowUpRight size={15}/></button>
        </div>
        <div className="sidebar-profile">
          <Avatar name="Nexo" index={4}/>
          <span><strong>Nexo</strong><small>Backend conectado</small></span>
        </div>
      </div>
    </aside>
  </>
}
