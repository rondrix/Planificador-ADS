import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { months } from '../data/contentLoader';

export const MonthSelector = () => {
  return (
    <div className="min-h-screen bg-light">
      <header className="bg-navy text-white text-center pt-12 px-5 pb-10 relative before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-gold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[5px] after:bg-gold">
        <div className="text-[10px] font-bold tracking-[5px] text-gold uppercase mb-2">Vidrios ASD</div>
        <h1 className="font-montserrat text-[34px] font-extrabold m-0">
          Calendario de <span className="text-gold">Publicación</span>
        </h1>
        <p className="text-[13px] text-[#A8BFDC] mt-2 m-0">Elegí el mes que querés revisar</p>
      </header>

      <main className="max-w-[980px] mx-auto px-5 py-10">
        {months.length === 0 ? (
          <div className="text-center bg-white border border-[#E2EAF5] rounded-lg p-8 text-[#2D3A5C]">
            No hay carpetas de contenido disponibles.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {months.map((month) => (
              <Link
                key={month.slug}
                to={`/mes/${month.slug}`}
                className="bg-white border border-[#D8E2F0] rounded-lg p-5 shadow-[0_2px_10px_rgba(13,27,75,0.07)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(13,27,75,0.13)] transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase text-gold mb-1">
                      Mes disponible
                    </div>
                    <h2 className="font-montserrat text-2xl font-extrabold text-navy m-0">{month.title}</h2>
                    <p className="text-sm text-[#60708F] mt-2 mb-0">{month.posts.length} publicaciones listas</p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center shrink-0">
                    <Icon icon="ph:calendar-check" className="text-xl" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
