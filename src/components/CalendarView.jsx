import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { InstagramCard } from './InstagramCard';
import { getMonthBySlug } from '../data/contentLoader';

const getWeekKey = (dateValue) => {
  const date = new Date(`${dateValue}T12:00:00`);
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
};

const groupPostsByWeek = (posts) => {
  return posts.reduce((weeks, post) => {
    const weekNumber = getWeekKey(post.date);
    const existing = weeks.find((week) => week.weekNumber === weekNumber);

    if (existing) {
      existing.posts.push(post);
      return weeks;
    }

    return [...weeks, { weekNumber, posts: [post] }];
  }, []);
};

export const CalendarView = () => {
  const { monthSlug } = useParams();
  const month = getMonthBySlug(monthSlug);

  if (!month) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-5">
        <div className="bg-white border border-[#D8E2F0] rounded-lg p-8 text-center max-w-md">
          <Icon icon="ph:calendar-x" className="text-4xl text-gold mx-auto mb-3" />
          <h1 className="font-montserrat text-2xl font-extrabold text-navy m-0">Mes no disponible</h1>
          <p className="text-sm text-[#60708F] mt-2 mb-5">Solo se muestran las carpetas que existen en contenidos.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-md text-sm font-bold">
            <Icon icon="ph:arrow-left" />
            Volver a meses
          </Link>
        </div>
      </div>
    );
  }

  const weeks = groupPostsByWeek(month.posts);
  const totalPosts = month.posts.length;
  const totalCarousels = month.posts.filter((post) => post.isCarousel).length;
  const totalFiles = month.posts.reduce((acc, post) => acc + post.fileNames.length, 0);

  return (
    <div className="font-sans min-h-screen pb-10 bg-light">
      <header className="bg-navy text-white text-center pt-[38px] px-5 pb-[30px] relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[5px] after:bg-gold">
        <Link
          to="/"
          className="absolute top-4 left-4 bg-white/10 text-white px-3 py-1.5 text-xs font-bold rounded-md hover:bg-white/20 transition-colors inline-flex items-center gap-1.5"
        >
          <Icon icon="ph:arrow-left" />
          Meses
        </Link>

        <div className="text-[10px] font-bold tracking-[5px] text-gold uppercase mb-2">Vidrios ASD</div>
        <h1 className="font-montserrat text-[32px] font-extrabold m-0">
          Calendario de <span className="text-gold">Publicación</span>
        </h1>
        <p className="text-[13px] text-[#A8BFDC] mt-2 m-0">
          {month.title} &nbsp;·&nbsp; {month.subtitle}
        </p>

        <div className="flex justify-center gap-9 mt-5 flex-wrap">
          <div className="text-center">
            <span className="block text-[26px] font-extrabold text-gold">{totalPosts}</span>
            <span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Publicaciones</span>
          </div>
          <div className="text-center">
            <span className="block text-[26px] font-extrabold text-gold">{weeks.length}</span>
            <span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Semanas</span>
          </div>
          <div className="text-center">
            <span className="block text-[26px] font-extrabold text-gold">{totalFiles}</span>
            <span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Archivos</span>
          </div>
          <div className="text-center">
            <span className="block text-[26px] font-extrabold text-gold">{totalCarousels}</span>
            <span className="text-[10px] text-[#A8BFDC] tracking-[1px] uppercase">Carruseles</span>
          </div>
        </div>
      </header>

      <div className="flex justify-center gap-3.5 flex-wrap py-3 px-5 bg-white border-b-2 border-[#E2EAF5] text-[11.5px] font-semibold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-[#1A6B3C]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          Post · 1080×1350
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-[#5B21B6]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          Carrusel · Secuencia
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white bg-[#1B6FA8]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
          Copy listo para copiar
        </span>
      </div>

      {weeks.map((week) => (
        <section key={week.weekNumber} className="max-w-[1120px] mx-auto mt-7 px-4">
          <div className="bg-navy text-white py-2.5 px-5 rounded-t-lg flex items-center justify-between border-l-[5px] border-gold">
            <h2 className="font-montserrat text-base font-bold tracking-wide m-0">SEMANA {week.weekNumber}</h2>
            <span className="text-xs text-[#A8BFDC]">{week.posts[0].dateShort} en adelante</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 bg-[#DDE5F2] p-3.5 rounded-b-lg border border-t-0 border-[#C8D4E8]">
            {week.posts.map((post) => (
              <InstagramCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ))}

      <section className="max-w-[1120px] mx-auto mt-7 mb-12 px-4">
        <h3 className="font-montserrat text-[15px] font-bold text-navy border-l-4 border-gold pl-3 mb-3.5">
          Archivos por contenido
        </h3>
        <div className="overflow-x-auto rounded-lg shadow-[0_2px_10px_rgba(13,27,75,0.07)]">
          <table className="w-full border-collapse bg-white text-xs">
            <thead>
              <tr>
                <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">#</th>
                <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Contenido</th>
                <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Formato</th>
                <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Archivos</th>
                <th className="bg-navy text-white px-3.5 py-2 text-left font-semibold text-[10.5px] tracking-wide uppercase">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {month.posts.map((post) => (
                <tr key={post.id} className="even:bg-[#F8FAFE]">
                  <td className="px-3.5 py-2 border-b border-[#E2EAF5] text-[#2D3A5C]">{post.contentNumber}</td>
                  <td className="px-3.5 py-2 border-b border-[#E2EAF5] font-bold text-[#2D3A5C]">{post.title}</td>
                  <td className="px-3.5 py-2 border-b border-[#E2EAF5] text-[#2D3A5C]">
                    {post.isCarousel ? 'Carrusel' : 'Post'}
                  </td>
                  <td className="px-3.5 py-2 border-b border-[#E2EAF5] text-[#2D3A5C]">
                    {post.fileNames.join(', ')}
                  </td>
                  <td className="px-3.5 py-2 border-b border-[#E2EAF5] text-[#2D3A5C]">{post.dateShort}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
