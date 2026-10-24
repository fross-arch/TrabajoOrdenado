import React, { useEffect, useRef, useState } from 'react'
import {
  Search, ChevronRight, Check, X, Menu,
} from 'lucide-react'
import {
  navItems, entityConfig,
} from './configs/entities.js'
import { api } from './api/client.js'
import Dashboard from './components/dashboard/Dashboard.jsx'
import EntityPage from './components/entities/EntityPage.jsx'
import { DeleteModal, FormModal } from './components/entities/EntityModals.jsx'
import AboutPage from './components/about/AboutPage.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import ChallengeDetailModal from './components/challenges/ChallengeDetailModal.jsx'
import { Avatar } from './components/common/UI.jsx'

export default function App(){
  const [data,setData]=useState(()=>Object.fromEntries(Object.keys(entityConfig).map(type=>[type,[]])))
  const [loading,setLoading]=useState(true)
  const [apiError,setApiError]=useState('')
  const [reloadKey,setReloadKey]=useState(0)
  const resolvePage=()=>{const page=window.location.hash.slice(1)||'dashboard';return page==='dashboard'||page==='acerca'||entityConfig[page]?page:'dashboard'}
  const [page,setPage]=useState(resolvePage)
  const [sidebarOpen,setSidebarOpen]=useState(false)
  const [modal,setModal]=useState(null)
  const [searches,setSearches]=useState({})
  const [filters,setFilters]=useState({})
  const [viewMode,setViewMode]=useState('cards')
  const [toast,setToast]=useState('')
  const searchRef=useRef(null)
  useEffect(()=>{
    let active=true
    setLoading(true)
    api.getData().then(result=>{
      if(active){setData(result);setApiError('')}
    }).catch(error=>{
      if(active)setApiError(error.message)
    }).finally(()=>{
      if(active)setLoading(false)
    })
    return ()=>{active=false}
  },[reloadKey])
  useEffect(()=>{const sync=()=>setPage(resolvePage());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[])
  useEffect(()=>{const handler=event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(page!=='retos')window.location.hash='retos';setTimeout(()=>searchRef.current?.focus(),60)}};document.addEventListener('keydown',handler);return()=>document.removeEventListener('keydown',handler)},[page])
  useEffect(()=>{if(!toast)return;const timeout=setTimeout(()=>setToast(''),4200);return()=>clearTimeout(timeout)},[toast])
  const navigate=next=>{window.location.hash=next;setPage(next);window.scrollTo({top:0,behavior:'smooth'})}
  const notify=message=>setToast(message)
  const openCreate=(type,values)=>setModal({kind:'form',type,initialValues:values})
  const openEdit=(type,item)=>setModal({kind:'form',type,item})
  const openView=item=>setModal({kind:'detail',itemId:item.id})
  const openDelete=(type,item)=>setModal({kind:'delete',type,item})
  const save=async(type,row,isEdit)=>{
    try{
      const saved=isEdit?await api.update(type,row.id,row):await api.create(type,row)
      setData(prev=>({...prev,[type]:isEdit?prev[type].map(r=>r.id===saved.id?saved:r):[saved,...prev[type]]}))
      setModal(null);notify(`${entityConfig[type].singular[0].toUpperCase()+entityConfig[type].singular.slice(1)} ${isEdit?'actualizado':'creado'} correctamente.`)
    }catch(error){notify(`No se pudo guardar: ${error.message}`)}
  }
  const deleteRow=async(type,id)=>{
    try{
      await api.remove(type,id)
      setData(prev=>({...prev,[type]:prev[type].filter(r=>r.id!==id)}))
      setModal(null);notify('Registro eliminado correctamente.')
    }catch(error){notify(`No se pudo eliminar: ${error.message}`)}
  }
  const activeItem=navItems.find(nav=>nav.id===page)
  const relatedItem=modal?.kind==='detail'?data.retos.find(r=>r.id===modal.itemId):null
  const headerSearch=searches.retos??''
  const totalCounts={registros:data.registros.length}
  return <div className="app-shell">
    <Sidebar active={page} onNavigate={navigate} open={sidebarOpen} onClose={()=>setSidebarOpen(false)} counts={totalCounts}/>
    <div className="main-area"><header className="topbar"><div className="topbar-left"><button className="mobile-menu icon-only" onClick={()=>setSidebarOpen(true)} aria-label="Abrir menú"><Menu size={22}/></button><span className="topbar-location"><span>Workspace</span><ChevronRight size={14}/><strong>{activeItem?.label||'Sobre el proyecto'}</strong></span></div>
      <div className="topbar-right"><label className="topbar-search"><Search size={18}/><input ref={searchRef} aria-label="Buscar retos globalmente" value={headerSearch} onFocus={()=>{if(page!=='retos') navigate('retos')}} onChange={event=>{setSearches(v=>({...v,retos:event.target.value}));if(page!=='retos')navigate('retos')}} placeholder="Buscar retos..."/><kbd>⌘ K</kbd></label><span className="topbar-divider"/><span className="demo-pill"><span/>{loading?'CONECTANDO':apiError?'SIN API':'API'}</span><Avatar name="Nexo" index={4}/></div>
    </header>
    <main id="contenido">{loading?<div className="page"><div className="content-panel"><h2>Conectando con la API…</h2><p>Cargando información de MySQL.</p></div></div>:apiError?<div className="page"><div className="content-panel" role="alert"><h2>No se pudo conectar con el backend</h2><p>{apiError}</p><button className="btn btn-primary" onClick={()=>setReloadKey(key=>key+1)}>Reintentar conexión</button></div></div>:page==='dashboard'?<Dashboard data={data} navigate={navigate} onView={openView} onCreate={openCreate} onRegister={values=>openCreate('registros',values)}/>:page==='acerca'?<AboutPage navigate={navigate} data={data}/>:entityConfig[page]?<EntityPage type={page} data={data} onCreate={openCreate} onEdit={openEdit} onDelete={openDelete} onView={openView} onRegister={values=>openCreate('registros',values)} search={searches[page]||''} setSearch={value=>setSearches(prev=>({...prev,[page]:value}))} filter={filters[page]||''} setFilter={value=>setFilters(prev=>({...prev,[page]:value}))} viewMode={viewMode} setViewMode={setViewMode} onNotify={notify}/>:null}</main>
    <footer className="app-footer"><span>© {new Date().getFullYear()} Nexo · Plataforma de retos empresariales</span><span>API REST <span className="footer-dot">•</span> Node.js + MySQL</span></footer>
    </div>
    {modal?.kind==='form'&&<FormModal key={`${modal.type}-${modal.item?.id||'new'}`} type={modal.type} item={modal.item} initialValues={modal.initialValues} data={data} onClose={()=>setModal(null)} onSave={save}/>}
    {modal?.kind==='delete'&&<DeleteModal type={modal.type} item={modal.item} data={data} onClose={()=>setModal(null)} onConfirm={deleteRow}/>}
    {modal?.kind==='detail'&&relatedItem&&<ChallengeDetailModal item={relatedItem} data={data} onClose={()=>setModal(null)} onEdit={openEdit} onRegister={values=>openCreate('registros',values)}/>}
    {toast&&<div className="toast" role="status"><span className="toast-icon"><Check size={17}/></span>{toast}<button aria-label="Cerrar notificación" onClick={()=>setToast('')}><X size={16}/></button></div>}
  </div>
}
