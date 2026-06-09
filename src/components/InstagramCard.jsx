import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export const InstagramCard = ({ post }) => {
  const [copied, setCopied] = useState(false);

  const formats = [
    ...(post.isPost ? ['Post 4:5'] : []),
    ...(post.isCarousel ? ['Carrusel'] : []),
    ...(post.isOrganic ? ['Orgánico'] : []),
  ];

  const copyText = [post.copy, post.hashtags].filter(Boolean).join('\n\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error('No se pudo copiar el texto', error);
    }
  };

  return (
    <div className="bg-white border border-ig-border rounded-lg overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] flex flex-col">
      <div className="flex items-center justify-between p-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-blue flex items-center justify-center text-[11px] font-extrabold text-gold shrink-0 ring-2 ring-gold">
            ASD
          </div>
          <div>
            <div className="text-[13px] font-semibold text-[#262626] leading-none">vidriosASD</div>
            <div className="text-[10px] text-[#8e8e8e] mt-0.5">Costa Rica</div>
          </div>
        </div>
        <Icon icon="bi:three-dots" className="text-[#8e8e8e] text-lg" />
      </div>

      <div className="bg-navy px-3 py-1.5 border-t border-[#1c3a7a] flex items-center gap-2">
        <span className="text-gold text-xs font-bold tracking-wide">{post.dateShort}</span>
        <span className="text-[#a8bfdc] text-[11px]">· {post.dayName}</span>
      </div>

      <div className="relative w-full shrink-0 bg-gray-100">
        {post.isCarousel ? (
          <>
            <div className="flex overflow-x-auto snap-x snap-mandatory w-full aspect-[4/5]">
              {post.carouselImages.map((imgSrc, idx) => (
                <img
                  key={imgSrc}
                  className="block shrink-0 w-full h-full snap-center object-cover"
                  src={imgSrc}
                  alt={`${post.title} slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="absolute top-2 right-2 bg-black/65 text-white text-[10px] font-bold rounded-full px-2 py-1">
              1/{post.carouselImages.length}
            </div>
          </>
        ) : (
          <img className="block w-full h-auto aspect-[4/5] object-cover" src={post.mainImageUrl} alt={post.title} />
        )}
      </div>

      <div className="flex items-center px-3 pt-2 pb-1 gap-3.5 shrink-0">
        <div className="flex gap-3.5 flex-1">
          <Icon icon="ph:heart" className="text-2xl text-[#262626]" />
          <Icon icon="ph:chat-circle" className="text-2xl text-[#262626]" />
          <Icon icon="ph:paper-plane-tilt" className="text-2xl text-[#262626]" />
        </div>
        <Icon icon="ph:bookmark-simple" className="text-2xl text-[#262626]" />
      </div>

      <div className="px-3 pb-1 text-[13px] font-semibold text-[#262626] shrink-0">
        {post.likes} Me gusta
      </div>

      <div className="px-3 pb-2 text-[13px] leading-relaxed text-[#262626] shrink-0">
        <span className="font-bold mr-1.5">vidriosASD</span>
        <span>{post.copy}</span>
        {post.hashtags && <div className="text-[#00376b] text-xs mt-1">{post.hashtags}</div>}
      </div>

      <div className="px-3 pb-3 shrink-0">
        <button
          type="button"
          onClick={handleCopy}
          className="w-full border border-[#D8E2F0] rounded-md py-2 px-2.5 cursor-pointer text-[11px] font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 bg-[#F8FAFE] hover:bg-[#EEF4FC] text-navy"
        >
          <Icon icon={copied ? 'ph:check-circle' : 'ph:copy'} className="text-base" />
          {copied ? 'Copiado' : 'Copiar texto'}
        </button>
      </div>

      <div className="flex gap-1.5 flex-wrap px-3 pb-3 shrink-0 mt-auto">
        {formats.map((fmt) => (
          <span
            key={fmt}
            className={`text-[9px] font-bold py-0.5 px-2 rounded-full text-white tracking-wide uppercase ${
              fmt.includes('Post') ? 'bg-[#1a6b3c]' : fmt.includes('Carrusel') ? 'bg-[#5b21b6]' : 'bg-[#6b7280]'
            }`}
          >
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
};
