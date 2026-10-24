import React from 'react'
import {
  ArrowUpRight,
  ChevronRight,
  Layers3,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import {
  BurbujaIcono,
  EncabezadoSeccion,
} from '../../componentes/comun/InterfazUI.jsx'

export function PaginaAcercaDe({ navigate, onReset, data }) {
  return (
    <div className="page about-page">
      <div className="page-breadcrumb">
        Espacio de trabajo <ChevronRight size={14} />{' '}
        <strong>Sobre el proyecto</strong>
      </div>
      <EncabezadoSeccion
        eyebrow="PROYECTO INTEGRADOR III"
        title="Sobre Nexo"
        subtitle="Una propuesta frontend para conectar empresas, retos y talento."
      />
      <div className="about-hero">
        <div className="eyebrow">UNA DEMO, MUCHAS POSIBILIDADES</div>
        <h2>Innovación que conecta.</h2>
        <p>
          Esta aplicación muestra cómo podría funcionar el frontend de una
          plataforma de retos empresariales. Todos los datos son ficticios y las
          operaciones se realizan en el navegador.
        </p>
        <button className="btn btn-white" onClick={() => navigate('retos')}>
          Explorar la plataforma <ArrowUpRight size={18} />
        </button>
      </div>
      <div className="about-grid">
        <div className="content-panel">
          <BurbujaIcono icon={Layers3} variant="rose" size={21} />
          <h3>6 entidades relacionadas</h3>
          <p>
            Empresas, retos, categorías, prioridades, usuarios y registros. El
            modelo respeta las relaciones del documento académico.
          </p>
        </div>
        <div className="content-panel">
          <BurbujaIcono icon={Zap} variant="blue" size={21} />
          <h3>CRUD completamente simulado</h3>
          <p>
            Crea, consulta, edita y elimina información, con validaciones de
            formularios e integridad básica entre entidades.
          </p>
        </div>
        <div className="content-panel">
          <BurbujaIcono icon={ShieldCheck} variant="green" size={21} />
          <h3>Persistencia local</h3>
          <p>
            Sin servidor ni API real. Los cambios se guardan en localStorage y
            permanecen al actualizar la pestaña.
          </p>
        </div>
      </div>
      <div className="about-settings content-panel">
        <div>
          <h3>Datos de demostración</h3>
          <p>
            Actualmente hay {data.empresas.length} empresas, {data.retos.length}{' '}
            retos, {data.usuarios.length} usuarios y {data.registros.length}{' '}
            inscripciones. Puedes restablecer los datos iniciales cuando
            quieras.
          </p>
        </div>
        <button className="btn btn-outline" onClick={onReset}>
          <RotateCcw size={17} /> Restablecer datos
        </button>
      </div>
    </div>
  )
}

export const AboutPage = PaginaAcercaDe
export default PaginaAcercaDe
