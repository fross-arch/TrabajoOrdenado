import React, { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'
import { DisenoPrincipal } from './esquemas/DisenoPrincipal.jsx'
import {
  PaginaLogin,
  PaginaPerfil,
  PaginaRegistro,
} from './paginas/autenticacion/PaginaAutenticacion.jsx'
import { PaginaTablero } from './paginas/tablero/PaginaTablero.jsx'
import { PaginaEntidades } from './paginas/entidades/PaginaEntidades.jsx'
import { PaginaAcercaDe } from './paginas/acerca-de/PaginaAcercaDe.jsx'
import { ModalDetalleReto } from './componentes/retos/ModalDetalleReto.jsx'
import {
  ModalEliminar,
  ModalFormulario,
  ModalRestablecer,
} from './componentes/entidades/ModalesEntidad.jsx'
import {
  configuracionEntidades,
  elementosNavegacion,
} from './configuraciones/entidades.config.js'
import {
  actualizarEntidad,
  cargarDatos,
  crearEntidad,
  eliminarEntidad,
  guardarDatos,
  restablecerDatos,
} from './servicios/entidades.servicio.js'
import {
  actualizarDatosPerfil,
  autenticarUsuario,
  cargarCuentas,
  cargarSesion,
  guardarCuentas,
  guardarSesion,
  ID_CUENTA_DEMO,
  registrarNuevaCuenta,
} from './servicios/autenticacion.servicio.js'

export default function App() {
  const [data, setData] = useState(cargarDatos)
  const [accounts, setAccounts] = useState(cargarCuentas)
  const [sessionId, setSessionId] = useState(cargarSesion)
  const activeAccount = accounts.find(account => account.id === sessionId) || null

  const resolvePage = () => {
    const pageHash = window.location.hash.slice(1) || 'dashboard'
    return pageHash === 'dashboard' ||
      pageHash === 'acerca' ||
      pageHash === 'login' ||
      pageHash === 'registro' ||
      pageHash === 'perfil' ||
      configuracionEntidades[pageHash]
      ? pageHash
      : 'dashboard'
  }

  const [page, setPage] = useState(resolvePage)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [searches, setSearches] = useState({})
  const [filters, setFilters] = useState({})
  const [viewMode, setViewMode] = useState('cards')
  const [toast, setToast] = useState('')
  const searchRef = useRef(null)

  useEffect(() => {
    guardarDatos(data)
  }, [data])

  useEffect(() => {
    guardarCuentas(accounts)
  }, [accounts])

  useEffect(() => {
    guardarSesion(sessionId)
  }, [sessionId])

  useEffect(() => {
    const sync = () => setPage(resolvePage())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    const handler = event => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (page !== 'retos') window.location.hash = 'retos'
        setTimeout(() => searchRef.current?.focus(), 60)
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [page])

  useEffect(() => {
    if (!toast) return
    const timeout = setTimeout(() => setToast(''), 4200)
    return () => clearTimeout(timeout)
  }, [toast])

  const navigate = next => {
    window.location.hash = next
    setPage(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const notify = message => setToast(message)

  const login = async (email, password) => {
    const res = await autenticarUsuario(email, password, accounts, data.usuarios)
    if (!res.ok) return res
    setSessionId(res.cuenta.id)
    navigate('perfil')
    notify(`¡Bienvenido de nuevo, ${res.cuenta.nombre.split(' ')[0]}!`)
    return { ok: true }
  }

  const loginDemo = () => {
    setSessionId(ID_CUENTA_DEMO)
    navigate('dashboard')
    notify('Ingresaste como administrador demo.')
  }

  const logout = () => {
    setSessionId(null)
    navigate('login')
    notify('Sesión de demostración cerrada.')
  }

  const register = async form => {
    const res = await registrarNuevaCuenta(form, accounts, data.usuarios)
    if (!res.ok) return res

    setAccounts(prev => [...prev, res.cuenta])
    setData(prev => ({
      ...prev,
      usuarios: [res.usuario, ...prev.usuarios],
    }))
    setSessionId(res.cuenta.id)
    navigate('perfil')
    notify('¡Tu cuenta ficticia está lista! Ya apareces en Usuarios.')
    return { ok: true }
  }

  const saveProfile = form => {
    const res = actualizarDatosPerfil(form, activeAccount, accounts, data.usuarios)
    if (!res.ok) return res

    const updated = res.datosActualizados
    setAccounts(prev =>
      prev.map(a => (a.id === activeAccount.id ? { ...a, ...updated } : a))
    )
    if (activeAccount.usuarioId) {
      setData(prev => ({
        ...prev,
        usuarios: prev.usuarios.map(u =>
          u.id === activeAccount.usuarioId
            ? { ...u, nombre: updated.nombre, correo: updated.correo }
            : u
        ),
      }))
    }
    notify('Perfil actualizado correctamente.')
    return { ok: true }
  }

  const openCreate = (type, values) =>
    setModal({ kind: 'form', type, initialValues: values })
  const openEdit = (type, item) => setModal({ kind: 'form', type, item })
  const openView = item => setModal({ kind: 'detail', itemId: item.id })
  const openDelete = (type, item) => setModal({ kind: 'delete', type, item })

  const save = (type, row, isEdit) => {
    if (isEdit) {
      const { nuevosDatos } = actualizarEntidad(type, row.id, row, data)
      setData(nuevosDatos)
    } else {
      const { nuevosDatos } = crearEntidad(type, row, data)
      setData(nuevosDatos)
    }

    if (type === 'usuarios' && isEdit) {
      setAccounts(prev =>
        prev.map(a =>
          a.usuarioId === row.id
            ? { ...a, nombre: row.nombre, correo: row.correo, rol: row.rol }
            : a
        )
      )
    }
    setModal(null)
    notify(
      `${configuracionEntidades[type].singular[0].toUpperCase() +
        configuracionEntidades[type].singular.slice(1)} ${
        isEdit ? 'actualizado' : 'creado'
      } correctamente.`
    )
  }

  const deleteRow = (type, id) => {
    const { nuevosDatos } = eliminarEntidad(type, id, data)
    setData(nuevosDatos)

    if (type === 'usuarios') {
      setAccounts(prev => prev.filter(a => a.usuarioId !== id))
      if (activeAccount?.usuarioId === id) {
        setSessionId(null)
        navigate('login')
      }
    }
    setModal(null)
    notify('Registro eliminado correctamente.')
  }

  const reset = () => {
    const datosRestaurados = restablecerDatos()
    setData(datosRestaurados)
    setAccounts(cargarCuentas())
    setSessionId(ID_CUENTA_DEMO)
    setModal(null)
    setSearches({})
    setFilters({})
    navigate('dashboard')
    notify('Datos y cuentas ficticias restablecidos correctamente.')
  }

  const activeItem = elementosNavegacion.find(nav => nav.id === page)
  const accountPageLabels = {
    login: 'Iniciar sesión',
    registro: 'Crear cuenta',
    perfil: 'Mi perfil',
  }
  const relatedItem =
    modal?.kind === 'detail'
      ? data.retos.find(r => r.id === modal.itemId)
      : null
  const headerSearch = searches.retos ?? ''
  const totalCounts = { registros: data.registros.length }

  return (
    <>
      <DisenoPrincipal
        page={page}
        navigate={navigate}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        counts={totalCounts}
        account={activeAccount}
        onReset={() => setModal({ kind: 'reset' })}
        onLogout={logout}
        searchRef={searchRef}
        headerSearch={headerSearch}
        onSearchChange={val =>
          setSearches(v => ({ ...v, retos: val }))
        }
        activeLabel={activeItem?.label || accountPageLabels[page]}
      >
        {page === 'login' ? (
          <PaginaLogin
            navigate={navigate}
            onLogin={login}
            onDemo={loginDemo}
            account={activeAccount}
          />
        ) : page === 'registro' ? (
          <PaginaRegistro navigate={navigate} onRegister={register} />
        ) : page === 'perfil' ? (
          <PaginaPerfil
            account={activeAccount}
            data={data}
            navigate={navigate}
            onSave={saveProfile}
            onLogout={logout}
            onView={openView}
          />
        ) : page === 'dashboard' ? (
          <PaginaTablero
            data={data}
            navigate={navigate}
            onView={openView}
            onCreate={openCreate}
            onRegister={values => openCreate('registros', values)}
          />
        ) : page === 'acerca' ? (
          <PaginaAcercaDe
            navigate={navigate}
            onReset={() => setModal({ kind: 'reset' })}
            data={data}
          />
        ) : configuracionEntidades[page] ? (
          <PaginaEntidades
            type={page}
            data={data}
            onCreate={openCreate}
            onEdit={openEdit}
            onDelete={openDelete}
            onView={openView}
            onRegister={values => openCreate('registros', values)}
            search={searches[page] || ''}
            setSearch={value =>
              setSearches(prev => ({ ...prev, [page]: value }))
            }
            filter={filters[page] || ''}
            setFilter={value =>
              setFilters(prev => ({ ...prev, [page]: value }))
            }
            viewMode={viewMode}
            setViewMode={setViewMode}
            onNotify={notify}
          />
        ) : null}
      </DisenoPrincipal>

      {modal?.kind === 'form' && (
        <ModalFormulario
          key={`${modal.type}-${modal.item?.id || 'new'}`}
          type={modal.type}
          item={modal.item}
          initialValues={modal.initialValues}
          data={data}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}

      {modal?.kind === 'delete' && (
        <ModalEliminar
          type={modal.type}
          item={modal.item}
          data={data}
          onClose={() => setModal(null)}
          onConfirm={deleteRow}
        />
      )}

      {modal?.kind === 'detail' && relatedItem && (
        <ModalDetalleReto
          item={relatedItem}
          data={data}
          onClose={() => setModal(null)}
          onEdit={openEdit}
          onRegister={values => openCreate('registros', values)}
        />
      )}

      {modal?.kind === 'reset' && (
        <ModalRestablecer
          onClose={() => setModal(null)}
          onConfirm={reset}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <span className="toast-icon">
            <Check size={17} />
          </span>
          {toast}
          <button
            aria-label="Cerrar notificación"
            onClick={() => setToast('')}
          >
            <X size={16} />
          </button>
        </div>
      )}
    </>
  )
}
