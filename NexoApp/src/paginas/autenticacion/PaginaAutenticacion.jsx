import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardList,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  LogIn,
  Mail,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  Target,
  UserPlus,
  UserRound,
} from 'lucide-react'
import {
  formatDate,
  getName,
  initials,
} from '../../utilidades/formateadores.js'
import {
  emailPattern,
  validarCorreo,
} from '../../utilidades/validaciones.js'

const fieldChange = setter => event =>
  setter(prev => ({ ...prev, [event.target.name]: event.target.value }))

function AuthLogo() {
  return (
    <div className="auth-mark">
      <span>✳</span>
    </div>
  )
}

function FormError({ message }) {
  return message ? (
    <div className="account-alert" role="alert">
      <CircleAlert size={17} />
      <span>{message}</span>
    </div>
  ) : null
}

function AccountInput({
  label,
  icon: Icon,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
  required = true,
  extra,
  disabled = false,
}) {
  return (
    <label className="account-field">
      <span className="account-field-name">{label}</span>
      <span className="account-input-wrap">
        <Icon size={17} />
        <input
          id={`account-${name}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
        />
        {extra}
      </span>
    </label>
  )
}

function PasswordInput({
  label = 'Contraseña',
  name = 'password',
  value,
  onChange,
  autoComplete = 'current-password',
}) {
  const [visible, setVisible] = useState(false)
  return (
    <AccountInput
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      icon={LockKeyhole}
      type={visible ? 'text' : 'password'}
      placeholder="••••••••"
      autoComplete={autoComplete}
      extra={
        <button
          className="account-visibility"
          type="button"
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          title={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {visible ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      }
    />
  )
}

function AccountLayout({ mode, navigate, children }) {
  const isRegister = mode === 'registro'
  return (
    <div className="page account-page">
      <div className="page-breadcrumb">
        <button className="account-back" onClick={() => navigate('dashboard')}>
          <ArrowLeft size={15} /> Volver al inicio
        </button>
        <ChevronRight size={14} />
        <strong>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</strong>
      </div>
      <div className="account-layout">
        <section className="account-showcase">
          <span className="account-showcase-label">
            <Sparkles size={16} /> TU ESPACIO DE INNOVACIÓN
          </span>
          <div className="account-showcase-content">
            <AuthLogo />
            <h2>
              Las ideas crecen
              <br />
              cuando nos <em>conectamos.</em>
            </h2>
            <p>
              Empresas, talento y desafíos reales en un solo lugar. Descubre
              oportunidades y transforma cada reto en una posibilidad.
            </p>
            <div className="account-showcase-features">
              <span>
                <CheckCircle2 size={17} /> Explora retos empresariales
              </span>
              <span>
                <CheckCircle2 size={17} /> Participa en proyectos de impacto
              </span>
              <span>
                <CheckCircle2 size={17} /> Gestiona tu actividad
              </span>
            </div>
          </div>
          <div className="account-showcase-foot">
            <div className="account-showcase-avatars">
              <b>VP</b>
              <b>MH</b>
              <b>IR</b>
            </div>
            <span>Una comunidad para crear soluciones juntos.</span>
          </div>
          <span className="account-orbit account-orbit-a" />
          <span className="account-orbit account-orbit-b" />
        </section>
        <section className="account-card">{children}</section>
      </div>
    </div>
  )
}

export function PaginaLogin({ navigate, onLogin, onDemo, account }) {
  const [form, setForm] = useState({ correo: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const onChange = event => {
    fieldChange(setForm)(event)
    setError('')
  }
  const submit = async event => {
    event.preventDefault()
    setError('')
    if (!validarCorreo(form.correo)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    if (!form.password) {
      setError('Escribe tu contraseña.')
      return
    }
    setBusy(true)
    try {
      const result = await onLogin(form.correo, form.password)
      if (!result.ok) setError(result.mensaje || result.message)
    } catch {
      setError('No fue posible validar la cuenta en este navegador.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AccountLayout mode="login" navigate={navigate}>
      <div className="account-card-tag">
        <span /> ACCESO A LA PLATAFORMA
      </div>
      <h1>¡Qué bueno verte de nuevo!</h1>
      <p className="account-intro">
        Ingresa a tu cuenta y continúa construyendo soluciones para grandes
        desafíos.
      </p>
      {account && (
        <div className="account-session-hint">
          <UserRound size={16} /> Sesión actual: <strong>{account.nombre}</strong>.
          Puedes cambiar de cuenta.
        </div>
      )}
      <form className="account-form" onSubmit={submit}>
        <AccountInput
          label="Correo electrónico"
          icon={Mail}
          name="correo"
          value={form.correo}
          onChange={onChange}
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
        />
        <PasswordInput value={form.password} onChange={onChange} />
        <FormError message={error} />
        <button className="account-submit" disabled={busy} type="submit">
          {busy ? 'Validando...' : 'Iniciar sesión'} <ArrowRight size={18} />
        </button>
      </form>
      <div className="account-divider">
        <span /> o continúa con <span />
      </div>
      <button
        className="account-demo-button"
        type="button"
        onClick={onDemo}
      >
        <Fingerprint size={19} /> Entrar como administrador demo{' '}
        <ArrowUpRight size={17} />
      </button>
      <p className="account-switch">
        ¿Aún no tienes una cuenta?{' '}
        <button onClick={() => navigate('registro')}>Regístrate gratis</button>
      </p>
      <div className="account-footnote">
        <ShieldCheck size={15} /> Acceso simulado: no utiliza servidor ni
        autenticación real.
      </div>
    </AccountLayout>
  )
}
export const LoginPage = PaginaLogin

export function PaginaRegistro({ navigate, onRegister }) {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    empresa: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const onChange = event => {
    fieldChange(setForm)(event)
    setError('')
  }
  const submit = async event => {
    event.preventDefault()
    setError('')
    if (form.nombre.trim().length < 3) {
      setError('Escribe tu nombre completo (mínimo 3 caracteres).')
      return
    }
    if (!validarCorreo(form.correo)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    if (form.password.length < 8) {
      setError('La contraseña debe contener al menos 8 caracteres.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (!agreed) {
      setError('Confirma que entiendes que este registro es una demostración.')
      return
    }
    setBusy(true)
    try {
      const result = await onRegister(form)
      if (!result.ok) setError(result.mensaje || result.message)
    } catch {
      setError('No fue posible crear la cuenta. Revisa el almacenamiento del navegador.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AccountLayout mode="registro" navigate={navigate}>
      <div className="account-card-tag">
        <span /> ÚNETE A LA COMUNIDAD
      </div>
      <h1>Crea tu cuenta.</h1>
      <p className="account-intro">
        Empieza a explorar, conectar y participar en los retos que mueven la
        innovación.
      </p>
      <form className="account-form" onSubmit={submit}>
        <AccountInput
          label="Nombre completo"
          icon={UserRound}
          name="nombre"
          value={form.nombre}
          onChange={onChange}
          placeholder="Tu nombre y apellido"
          autoComplete="name"
        />
        <AccountInput
          label="Correo electrónico"
          icon={Mail}
          name="correo"
          value={form.correo}
          onChange={onChange}
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
        />
        <AccountInput
          label="Empresa o institución (opcional)"
          icon={Building2}
          name="empresa"
          value={form.empresa}
          onChange={onChange}
          placeholder="Ej. Universidad CESDE"
          required={false}
          autoComplete="organization"
        />
        <div className="account-password-row">
          <PasswordInput
            label="Contraseña"
            value={form.password}
            onChange={onChange}
            autoComplete="new-password"
          />
          <PasswordInput
            label="Confirmar contraseña"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            autoComplete="new-password"
          />
        </div>
        <p className="account-password-note">
          <ShieldCheck size={14} /> Mínimo 8 caracteres. No utilices una
          contraseña real.
        </p>
        <label className="account-agree">
          <input
            type="checkbox"
            checked={agreed}
            onChange={event => setAgreed(event.target.checked)}
          />
          <span>
            Entiendo que esta cuenta es <strong>ficticia y local</strong>; los
            datos se guardan en este navegador.
          </span>
        </label>
        <FormError message={error} />
        <button className="account-submit" disabled={busy} type="submit">
          {busy ? 'Creando cuenta...' : 'Crear mi cuenta'}{' '}
          <ArrowRight size={18} />
        </button>
      </form>
      <p className="account-switch">
        ¿Ya tienes una cuenta?{' '}
        <button onClick={() => navigate('login')}>Inicia sesión</button>
      </p>
    </AccountLayout>
  )
}
export const RegisterPage = PaginaRegistro

export function PaginaPerfil({
  account,
  data,
  navigate,
  onSave,
  onLogout,
  onView,
}) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    nombre: account?.nombre || '',
    correo: account?.correo || '',
    empresa: account?.empresa || '',
    telefono: account?.telefono || '',
    biografia: account?.biografia || '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    setForm({
      nombre: account?.nombre || '',
      correo: account?.correo || '',
      empresa: account?.empresa || '',
      telefono: account?.telefono || '',
      biografia: account?.biografia || '',
    })
    setEditing(false)
    setError('')
  }, [account?.id])

  if (!account) {
    return (
      <div className="page account-guest-profile">
        <span className="guest-profile-icon">
          <LockKeyhole size={31} />
        </span>
        <h1>Tu perfil te está esperando</h1>
        <p>
          Inicia sesión para gestionar tus datos y consultar tus inscripciones a
          los retos.
        </p>
        <div>
          <button className="btn btn-primary" onClick={() => navigate('login')}>
            <LogIn size={17} /> Iniciar sesión
          </button>
          <button
            className="btn btn-outline"
            onClick={() => navigate('registro')}
          >
            <UserPlus size={17} /> Crear cuenta
          </button>
        </div>
      </div>
    )
  }

  const mine = data.registros.filter(reg => reg.usuarioId === account.usuarioId)
  const participating = new Set(mine.map(reg => reg.retoId)).size
  const onChange = fieldChange(setForm)

  const submit = event => {
    event.preventDefault()
    setError('')
    if (form.nombre.trim().length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.')
      return
    }
    if (!validarCorreo(form.correo)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }
    const result = onSave(form)
    if (result.ok) {
      setEditing(false)
    } else {
      setError(result.mensaje || result.message)
    }
  }

  return (
    <div className="page profile-page">
      <div className="page-breadcrumb">
        <span>Mi espacio</span>
        <ChevronRight size={14} />
        <strong>Mi perfil</strong>
      </div>
      <div className="profile-title">
        <div>
          <span className="eyebrow">TU ESPACIO PERSONAL</span>
          <h1>Mi perfil</h1>
          <p>Consulta tu actividad y mantén tu información actualizada.</p>
        </div>
        <button className="btn btn-outline" onClick={onLogout}>
          <LogIn size={17} /> Cerrar sesión
        </button>
      </div>
      <div className="profile-cover">
        <span className="profile-cover-sparkle">✳</span>
        <div className="profile-cover-doodle">✦</div>
      </div>
      <div className="profile-identity">
        <div className="profile-big-avatar">{initials(account.nombre)}</div>
        <div className="profile-identity-text">
          <h2>
            {account.nombre} <BadgeCheck size={19} />
          </h2>
          <span>{account.correo}</span>
          <div className="profile-tags">
            <span>
              <ShieldCheck size={13} />
              {account.rol}
            </span>
            <span>
              <CalendarDays size={13} /> Miembro desde{' '}
              {formatDate(account.creadoEl)}
            </span>
            {account.id === 'demo-admin' && (
              <span className="profile-demo-tag">Cuenta demo</span>
            )}
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditing(v => !v)
            setError('')
          }}
        >
          {editing ? <ArrowLeft size={17} /> : <Pencil size={17} />}{' '}
          {editing ? 'Cancelar' : 'Editar perfil'}
        </button>
      </div>
      <div className="profile-stats">
        <div>
          <span>
            <Target size={20} />
          </span>
          <strong>{participating}</strong>
          <small>Retos en los que participas</small>
        </div>
        <div>
          <span>
            <ClipboardList size={20} />
          </span>
          <strong>{mine.length}</strong>
          <small>Inscripciones realizadas</small>
        </div>
        <div>
          <span>
            <CheckCircle2 size={20} />
          </span>
          <strong>{mine.filter(reg => reg.estado === 'Aprobado').length}</strong>
          <small>Inscripciones aprobadas</small>
        </div>
      </div>
      <div className="profile-columns">
        <section className="profile-panel">
          <div className="profile-panel-heading">
            <div>
              <h3>Información personal</h3>
              <p>Los datos que identifican tu cuenta.</p>
            </div>
            {editing && (
              <span className="profile-edit-label">
                <Pencil size={14} /> Editando
              </span>
            )}
          </div>
          <form onSubmit={submit} className="profile-form">
            <div className="profile-form-grid">
              <AccountInput
                label="Nombre completo"
                icon={UserRound}
                name="nombre"
                value={form.nombre}
                onChange={onChange}
                disabled={!editing}
                required={true}
              />
              <AccountInput
                label="Correo electrónico"
                icon={Mail}
                name="correo"
                type="email"
                value={form.correo}
                onChange={onChange}
                disabled={!editing}
              />
              <AccountInput
                label="Organización"
                icon={Building2}
                name="empresa"
                value={form.empresa}
                onChange={onChange}
                disabled={!editing}
                required={false}
              />
              <AccountInput
                label="Teléfono"
                icon={Phone}
                name="telefono"
                type="tel"
                value={form.telefono}
                onChange={onChange}
                disabled={!editing}
                required={false}
              />
            </div>
            <label className="account-field profile-bio">
              <span className="account-field-name">Sobre mí</span>
              <textarea
                name="biografia"
                value={form.biografia}
                onChange={onChange}
                disabled={!editing}
                maxLength={280}
                rows={3}
                placeholder="Cuéntanos un poco sobre ti..."
              />
            </label>
            <FormError message={error} />
            {editing && (
              <div className="profile-form-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setEditing(false)
                    setForm({
                      nombre: account.nombre,
                      correo: account.correo,
                      empresa: account.empresa || '',
                      telefono: account.telefono || '',
                      biografia: account.biografia || '',
                    })
                    setError('')
                  }}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" type="submit">
                  <Save size={16} /> Guardar cambios
                </button>
              </div>
            )}
          </form>
        </section>
        <section className="profile-panel">
          <div className="profile-panel-heading">
            <div>
              <h3>Mis inscripciones</h3>
              <p>Los retos a los que te has unido.</p>
            </div>
            <span className="count-badge">{mine.length}</span>
          </div>
          {mine.length ? (
            <div className="profile-enrollments">
              {mine.slice(0, 5).map(reg => (
                <button
                  key={reg.id}
                  onClick={() => {
                    const reto = data.retos.find(r => r.id === reg.retoId)
                    if (reto) onView(reto)
                  }}
                >
                  <span className="profile-enrollment-icon">
                    <Target size={18} />
                  </span>
                  <span>
                    <strong>{getName(data, 'retos', reg.retoId)}</strong>
                    <small>
                      {formatDate(reg.fechaRegistro)} · {reg.estado}
                    </small>
                  </span>
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
          ) : (
            <div className="profile-empty">
              <span>
                <Target size={27} />
              </span>
              <strong>Aún no tienes inscripciones</strong>
              <p>
                Explora retos empresariales y participa en nuevas oportunidades.
              </p>
              <button
                className="btn btn-outline"
                onClick={() => navigate('retos')}
              >
                Explorar retos <ArrowRight size={16} />
              </button>
            </div>
          )}
          <div className="profile-safety-note">
            <ShieldCheck size={18} />
            <span>
              Este perfil es parte de una demostración. La información solo se
              guarda en este navegador.
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
export const ProfilePage = PaginaPerfil

export function PaginaAutenticacion({
  mode,
  navigate,
  account,
  data,
  onLogin,
  onDemo,
  onRegister,
  onSave,
  onLogout,
  onView,
}) {
  if (mode === 'registro') {
    return <PaginaRegistro navigate={navigate} onRegister={onRegister} />
  }
  if (mode === 'perfil') {
    return (
      <PaginaPerfil
        account={account}
        data={data}
        navigate={navigate}
        onSave={onSave}
        onLogout={onLogout}
        onView={onView}
      />
    )
  }
  return (
    <PaginaLogin
      navigate={navigate}
      onLogin={onLogin}
      onDemo={onDemo}
      account={account}
    />
  )
}

export default PaginaAutenticacion
