import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { InstagramCard } from './InstagramCard';
import { Link } from 'react-router-dom';

const defaultPost = {
  title: '',
  dateShort: 'Mar 14 Abr',
  dayName: 'Martes',
  copy: '',
  hashtags: '',
  mainImageUrl: '',
  carouselImages: [],
  adImageUrl: '',
  isPost: true,
  isStory: false,
  isCarousel: false,
  isAd: false,
  isOrganic: true,
  adHeadline: '',
  adDescription: '',
  adCta: 'Cotizar',
  likes: '1,200'
};

export const AdminPanel = () => {
  const { posts, addPost, updatePost, deletePost, campaign, updateCampaign } = useData();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(defaultPost);

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // Resize the image to avoid localStorage limits (max width/height 800px)
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress as JPEG (0.7 quality)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData(prev => ({ ...prev, [field]: dataUrl }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarouselUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 800;

          if (width > height) {
            if (width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
          } else {
            if (height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setFormData(prev => ({ 
            ...prev, 
            carouselImages: [...(prev.carouselImages || []), dataUrl] 
          }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCarouselImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      carouselImages: prev.carouselImages.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCampaignChange = (e) => {
    updateCampaign({ [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    try {
      if (editingId) {
        updatePost(editingId, formData);
        setEditingId(null);
      } else {
        addPost(formData);
      }
      setFormData(defaultPost);
    } catch (error) {
      alert("Error al guardar: " + error.message + ". Es posible que hayas excedido el límite de almacenamiento local. Prueba subir imágenes más pequeñas.");
    }
  };

  return (
    <div className="font-inter bg-gray-50 min-h-screen text-gray-800 pb-12">
      <header className="bg-white shadow-sm border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-navy">Admin Panel</h1>
          <p className="text-xs text-gray-500">Configuración del Calendario</p>
        </div>
        <Link to="/" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
          ← Volver al Calendario
        </Link>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4">Datos de la Campaña</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Mes/Título</label>
                <input type="text" name="title" value={campaign.title} onChange={handleCampaignChange} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Subtítulo</label>
                <input type="text" name="subtitle" value={campaign.subtitle} onChange={handleCampaignChange} className="w-full border rounded px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Editar Publicación' : 'Nueva Publicación'}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Título Interno (Solo tabla)</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" placeholder="Ej: Transformando Espacios" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Fecha Corta</label>
                  <input type="text" name="dateShort" value={formData.dateShort} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" placeholder="Ej: Mar 14 Abr" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Día de la semana</label>
                  <input type="text" name="dayName" value={formData.dayName} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" placeholder="Ej: Martes" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Copy / Texto principal</label>
                <textarea name="copy" value={formData.copy} onChange={handleChange} rows="3" className="w-full border rounded px-3 py-2 text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold mb-1">Hashtags</label>
                <input type="text" name="hashtags" value={formData.hashtags} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm" placeholder="#VidriosASD #Diseño" />
              </div>

              <div className="border-t pt-4 mt-4">
                <label className="block text-sm font-bold mb-3">Formatos y Atributos</label>
                <div className="flex flex-wrap gap-4 mb-4">
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isPost" checked={formData.isPost} onChange={handleChange} className="rounded text-navy focus:ring-navy" /> Post (4:5)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isStory" checked={formData.isStory} onChange={handleChange} className="rounded text-navy focus:ring-navy" /> Story (9:16)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isCarousel" checked={formData.isCarousel} onChange={handleChange} className="rounded text-navy focus:ring-navy" /> Carrusel</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isAd" checked={formData.isAd} onChange={handleChange} className="rounded text-navy focus:ring-navy" /> Lleva Pauta (Ad)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isOrganic" checked={formData.isOrganic} onChange={handleChange} className="rounded text-navy focus:ring-navy" /> Orgánico</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.isCarousel ? (
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-semibold mb-2">Imágenes del Carrusel</label>
                    <div className="flex gap-3 overflow-x-auto pb-4 snap-x">
                      {formData.carouselImages && formData.carouselImages.map((imgSrc, idx) => (
                        <div key={idx} className="relative shrink-0 w-32 h-40 rounded-lg border border-gray-200 overflow-hidden group snap-start bg-gray-50">
                          <img src={imgSrc} alt={`carousel-${idx}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <span className="text-white text-xs font-bold px-2">Img {idx+1}</span>
                            <button type="button" onClick={() => removeCarouselImage(idx)} className="bg-red-500 text-white text-[11px] font-bold px-3 py-1 rounded hover:bg-red-600 shadow-sm">
                              Quitar
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <label className="shrink-0 w-32 h-40 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors snap-start">
                        <svg className="w-6 h-6 mb-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <p className="text-[11px] text-gray-600 font-semibold text-center px-2">Agregar<br/>al carrusel</p>
                        <input type="file" accept="image/*" onChange={handleCarouselUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold mb-2">Imagen Principal</label>
                    {formData.mainImageUrl ? (
                      <div className="relative w-full h-32 rounded-lg border border-gray-200 overflow-hidden group">
                        <img src={formData.mainImageUrl} alt="preview" className="w-full h-full object-contain bg-gray-50" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="bg-white text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded cursor-pointer hover:bg-gray-200 shadow-sm">
                            Cambiar
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mainImageUrl')} className="hidden" />
                          </label>
                          <button type="button" onClick={() => setFormData(prev => ({...prev, mainImageUrl: ''}))} className="bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded hover:bg-red-600 shadow-sm">
                            Quitar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-4 pb-3">
                          <svg className="w-6 h-6 mb-1 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="text-xs text-gray-600 font-semibold">Clic para subir</p>
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'mainImageUrl')} className="hidden" />
                      </label>
                    )}
                  </div>
                )}
                
                {formData.isAd && (
                  <div>
                    <label className="block text-xs font-semibold mb-2">Imagen Pauta (Ad)</label>
                    {formData.adImageUrl ? (
                      <div className="relative w-full h-32 rounded-lg border border-yellow-300 overflow-hidden group">
                        <img src={formData.adImageUrl} alt="preview" className="w-full h-full object-contain bg-yellow-50" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label className="bg-white text-gray-800 text-[11px] font-bold px-3 py-1.5 rounded cursor-pointer hover:bg-gray-200 shadow-sm">
                            Cambiar
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'adImageUrl')} className="hidden" />
                          </label>
                          <button type="button" onClick={() => setFormData(prev => ({...prev, adImageUrl: ''}))} className="bg-red-500 text-white text-[11px] font-bold px-3 py-1.5 rounded hover:bg-red-600 shadow-sm">
                            Quitar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-yellow-400 border-dashed rounded-lg cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-4 pb-3">
                          <svg className="w-6 h-6 mb-1 text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="text-xs text-yellow-700 font-semibold">Subir imagen Ad</p>
                        </div>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'adImageUrl')} className="hidden" />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {formData.isAd && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-yellow-800">Atributos del Anuncio (Ad)</h3>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Titular (Headline)</label>
                    <input type="text" name="adHeadline" value={formData.adHeadline} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm bg-white" placeholder="Ej: Instalación de Vidrios" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Descripción</label>
                    <input type="text" name="adDescription" value={formData.adDescription} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm bg-white" placeholder="Ej: Expertos con 40 años..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Botón Call to Action</label>
                    <select name="adCta" value={formData.adCta} onChange={handleChange} className="w-full border rounded px-3 py-2 text-sm bg-white">
                      <option value="Cotizar">Cotizar</option>
                      <option value="Más Información">Más Información</option>
                      <option value="Enviar Mensaje">Enviar Mensaje</option>
                      <option value="Comprar">Comprar</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button onClick={handleSave} className="bg-navy text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-900 transition-colors flex-1">
                  {editingId ? 'Guardar Cambios' : 'Agregar Publicación'}
                </button>
                {editingId && (
                  <button onClick={() => { setEditingId(null); setFormData(defaultPost); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-300 transition-colors">
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Preview & List */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border sticky top-24">
            <h2 className="text-lg font-bold mb-4">Vista Previa</h2>
            <div className="w-full max-w-[350px] mx-auto scale-95 origin-top">
              <InstagramCard post={formData} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-bold mb-4">Publicaciones Guardadas ({posts.length})</h2>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {posts.map(post => (
                <div key={post.id} className="border rounded-lg p-3 flex items-center justify-between bg-gray-50">
                  <div>
                    <div className="font-bold text-sm">{post.title || 'Sin Título'}</div>
                    <div className="text-xs text-gray-500">{post.dateShort}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-800 text-sm font-semibold bg-blue-50 px-2 py-1 rounded">Editar</button>
                    <button onClick={() => deletePost(post.id)} className="text-red-600 hover:text-red-800 text-sm font-semibold bg-red-50 px-2 py-1 rounded">Eliminar</button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <div className="text-sm text-gray-500 text-center py-4">No hay publicaciones.</div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
