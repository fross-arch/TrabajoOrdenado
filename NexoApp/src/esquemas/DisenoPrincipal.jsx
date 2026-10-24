import React from 'react'
import { ChevronRight, Menu, Search } from 'lucide-react'
import BarraLateral from './BarraLateral.jsx'
import { MenuCuenta } from '../componentes/comun/InterfazUI.jsx'

export function DisenoPrincipal({
  page,
  navigate,
  sidebarOpen,
  setSidebarOpen,
  counts,
  account,
  onReset,
  onLogout,
  searchRef,
  headerSearch,
  onSearchChange,
  activeLabel,
  children,
}) {
  return (
    <div className="app-shell">
      <BarraLateral
        active={page}
        onNavigate={navigate}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        counts={counts}
        account={account}
        onReset={onReset}
      />
      <div className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu icon-only"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
            <span className="topbar-location">
              <span>Workspace</span>
              <ChevronRight size={14} />
              <strong>{activeLabel || 'Sobre el proyecto'}</strong>
            </span>
          </div>
          <div className="topbar-right">
            <label className="topbar-search">
              <Search size={18} />
              <input
                ref={searchRef}
                aria-label="Buscar retos globalmente"
                value={headerSearch}
                onFocus={() => {
                  if (page !== 'retos') navigate('retos')
                }}
                onChange={event => {
                  onSearchChange(event.target.value)
                  if (page !== 'retos') navigate('retos')
                }}
                placeholder="Buscar retos..."
              />
              <kbd>⌘ K</kbd>
            </label>
            <span className="topbar-divider" />
            <span className="demo-pill">
              <span /> DEMO
            </span>
            <MenuCuenta
              account={account}
              navigate={navigate}
              onLogout={onLogout}
            />
          </div>
        </header>

        <main id="contenido">{children}</main>

        <footer className="app-footer">
          <span>
            © {new Date().getFullYear()} Nexo · Plataforma de retos empresariales
          </span>
          <span>
            Frontend demo <span className="footer-dot">•</span> React + localStorage
          </span>
        </footer>
      </div>
    </div>
  )
}

export default DisenoPrincipal
