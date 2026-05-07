import React from 'react';
import { useData } from '../context/DataContext';
import { InstagramCard } from './InstagramCard';
import { Link } from 'react-router-dom';

export const CalendarView = () => {
  const { posts, campaign } = useData();

  // Group posts by week (mock simple logic, just breaking by chunks of 4 for demo)
  // Real implementation might group by actual date ranges
  const weeks = [];
  for (let i = 0; i < posts.length; i += 4) {
    weeks.push(posts.slice(i, i + 4));
  }

  const totalPosts = posts.length;
  const totalWeeks = weeks.length;
  const formatsCount = 3; // Mocked stat
  const totalFiles = posts.reduce((acc, p) => acc + (p.isPost?1:0) + (p.isStory?1:0) + (p.isAd?2:0), 0);

  return (
    <div className="font-sans min-h-screen pb-10">
      <header className="bg-navy text-white text-center pt-[38px] px-5 pb-[30px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[5px] after:bg-gold">
        <div className="text-[10px] font-bold tracking-[5px] text-gold uppercase mb-2">Vidrios ASD</div>
        <h1 className="font-montserrat text-[32px] font-extrabold m-0">Calendario de <span className="text-gold">Publicación</span></h1>
        <p className="text-[13px] text-[#A8BFDC] mt-2 m-0">{campaign.title} &nbsp;·&nbsp; {campaign.subtitle}</p>
        
        <div className="flex justify-center gap-9 mt-5 flex-wrap">
          <div className="text-center"><span className="block text-[26px] font-extrabold text-gold">{totalPosts}</span><span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Publicaciones</span></div>
          <div className="text-center"><span className="block text-[26px] font-extrabold text-gold">{totalWeeks}</span><span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Semanas</span></div>
          <div className="text-center"><span className="block text-[26px] font-extrabold text-gold">{totalFiles}</span><span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Archivos</span></div>
          <div className="text-center"><span className="block text-[26px] font-extrabold text-gold">{formatsCount}</span><span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Formatos</span></div>
        </div>

        <Link to="/admin" className="absolute top-4 right-4 bg-white text-navy px-3 py-1 text-xs font-bold rounded-md hover:bg-gray-100 transition-colors">Admin Panel</Link>
      </header>

      <div className="flex justify-center gap-3.5 flex-wrap py-3 px-5 bg-white border-b-2 border-[#E2EAF5] text-[11.5px] font-semibold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-[#1A6B3C]"><span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> Post · 1080×1350</span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-[#1B6FA8]"><span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> Story H · 1080×1920</span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-[#8B4513]"><span className="w-1.5 h-1.5 rounded-full bg-white/50"></span> Ad · 1080×1080 — botón debajo</span>
      </div>

      {weeks.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No hay publicaciones aún. <Link to="/admin" className="text-blue underline">Agrega una desde el Admin Panel</Link>.
        </div>
      )}

      {weeks.map((weekPosts, index) => (
        <section key={index} className="max-w-[1120px] mx-auto mt-7 px-4">
          <div className="bg-navy text-white py-2.5 px-5 rounded-t-xl flex items-center justify-between border-l-[5px] border-gold">
            <h2 className="font-montserrat text-base font-bold tracking-wide m-0">SEMANA {index + 1}</h2>
            <span className="text-xs text-[#A8BFDC]">Fechas aprox.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 bg-[#DDE5F2] p-3.5 rounded-b-xl border border-t-0 border-[#C8D4E8]">
            {weekPosts.map(post => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ))}
      
      {weeks.length > 0 && (
        <section className="max-w-[1120px] mx-auto mt-7 mb-12 px-4">
          <h3 className="font-montserrat text-[15px] font-bold text-navy border-l-4 border-gold pl-3 mb-3.5">Archivos por contenido y formato</h3>
          <div className="overflow-x-auto rounded-xl shadow-[0_2px_10px_rgba(13,27,75,0.07)]">
            <table className="w-full border-collapse bg-white text-xs">
              <thead>
                <tr>
                  <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">#</th>
                  <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Contenido</th>
                  <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Post 4:5</th>
                  <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Story H 9:16</th>
                  <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Ad 1:1</th>
                  <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr key={post.id} className="even:bg-[#F8FAFE]">
                    <td className="px-3.5 py-2 border-b border-[#E2EAF5] text-[#2D3A5C]">{i + 1}</td>
                    <td className="px-3.5 py-2 border-b border-[#E2EAF5] font-bold text-[#2D3A5C]">{post.title || `Publicación ${i+1}`}</td>
                    <td className={`px-3.5 py-2 border-b border-[#E2EAF5] font-bold ${post.isPost ? 'text-[#1A6B3C]' : 'text-[#CBD5E1]'}`}>{post.isPost ? '✓' : '—'}</td>
                    <td className={`px-3.5 py-2 border-b border-[#E2EAF5] font-bold ${post.isStory ? 'text-[#1A6B3C]' : 'text-[#CBD5E1]'}`}>{post.isStory ? '✓' : '—'}</td>
                    <td className={`px-3.5 py-2 border-b border-[#E2EAF5] font-bold ${post.isAd ? 'text-[#1A6B3C]' : 'text-[#CBD5E1]'}`}>{post.isAd ? '✓' : '—'}</td>
                    <td className="px-3.5 py-2 border-b border-[#E2EAF5] text-[#2D3A5C]">{post.dateShort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};
