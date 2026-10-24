import {
  ArrowUpRight, ChevronRight, Layers3, ShieldCheck, Zap,
} from 'lucide-react'
import { IconBubble, SectionHeading } from '../common/UI.jsx'

export default function AboutPage({ navigate, data }) {
  return <div className="page about-page">
    <div className="page-breadcrumb">Espacio de trabajo <ChevronRight size={14}/> <strong>Sobre el proyecto</strong></div>
    <SectionHeading eyebrow="PROYECTO INTEGRADOR III" title="Sobre Nexo" subtitle="Una plataforma para conectar empresas, retos y talento."/>
    <div className="about-hero"><div className="eyebrow">API REST + MYSQL</div><h2>Innovación que conecta.</h2><p>Administra retos empresariales con datos persistidos en MySQL y operaciones realizadas a través de una API REST.</p><button className="btn btn-white" onClick={() => navigate('retos')}>Explorar la plataforma <ArrowUpRight size={18}/></button></div>
    <div className="about-grid">
      <div className="content-panel"><IconBubble icon={Layers3} variant="rose" size={21}/><h3>6 entidades relacionadas</h3><p>Empresas, retos, categorías, prioridades, usuarios y registros. El modelo mantiene las relaciones del documento académico.</p></div>
      <div className="content-panel"><IconBubble icon={Zap} variant="blue" size={21}/><h3>API con operaciones CRUD</h3><p>Consulta, crea, actualiza y elimina registros con validaciones y respuestas de error explícitas.</p></div>
      <div className="content-panel"><IconBubble icon={ShieldCheck} variant="green" size={21}/><h3>Persistencia en MySQL</h3><p>Las claves foráneas y restricciones de la base de datos protegen la integridad entre entidades.</p></div>
    </div>
    <div className="about-settings content-panel"><div><h3>Datos de la plataforma</h3><p>Actualmente hay {data.empresas.length} empresas, {data.retos.length} retos, {data.usuarios.length} usuarios y {data.registros.length} inscripciones conectados a la API.</p></div></div>
  </div>
}
