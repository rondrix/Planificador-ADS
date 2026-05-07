import React, { useState } from 'react';
import { Icon } from '@iconify/react';

export const InstagramCard = ({ post }) => {
  const [showAd, setShowAd] = useState(false);

  const formats = [
    ...(post.isPost ? ['Post 4:5'] : []),
    ...(post.isCarousel ? ['Carrusel'] : []),
    ...(post.isStory ? ['Story H 9:16'] : []),
    ...(post.isAd ? ['Ad 1:1'] : []),
    ...(post.isOrganic ? ['Orgánico'] : [])
  ];

  return (
    <div className="bg-white border border-ig-border rounded-xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy to-blue flex items-center justify-center text-[11px] font-extrabold text-gold shrink-0 ring-2 ring-gold">ASD</div>
          <div>
            <div className="text-[13px] font-semibold text-[#262626] leading-none">vidriosASD</div>
            <div className="text-[10px] text-[#8e8e8e] mt-0.5">Costa Rica</div>
          </div>
        </div>
        <Icon icon="bi:three-dots" className="text-[#8e8e8e] text-lg" />
      </div>

      {/* Date Bar */}
      <div className="bg-navy px-3 py-1.5 border-t border-[#1c3a7a] flex items-center gap-2">
        <span className="text-gold text-xs font-bold tracking-wide">{post.dateShort || 'Fecha'}</span>
        <span className="text-[#a8bfdc] text-[11px]">· {post.dayName || 'Día'}</span>
      </div>

      {/* Image Wrap */}
      <div className="relative w-full shrink-0 bg-gray-100">
        {post.isAd && showAd ? (
          <img className="block w-full h-auto aspect-square object-cover" src={post.adImageUrl || 'https://placehold.co/1080x1080/0D1B4B/C8A951?text=Ad+Image'} alt="Ad" />
        ) : post.isCarousel && post.carouselImages && post.carouselImages.length > 0 ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide w-full h-auto aspect-[4/5]">
            {post.carouselImages.map((imgSrc, idx) => (
              <img key={idx} className="block shrink-0 w-full h-full snap-center object-cover" src={imgSrc} alt={`Carousel ${idx+1}`} />
            ))}
          </div>
        ) : (
          <img className="block w-full h-auto aspect-[4/5] object-cover" src={post.mainImageUrl || 'https://placehold.co/1080x1350/0D1B4B/C8A951?text=Main+Image'} alt="Main" />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center px-3 pt-2 pb-1 gap-3.5 shrink-0">
        <div className="flex gap-3.5 flex-1">
          <Icon icon="ph:heart" className="text-2xl text-[#262626]" />
          <Icon icon="ph:chat-circle" className="text-2xl text-[#262626]" />
          <Icon icon="ph:paper-plane-tilt" className="text-2xl text-[#262626]" />
        </div>
        <div>
          <Icon icon="ph:bookmark-simple" className="text-2xl text-[#262626]" />
        </div>
      </div>

      {/* Text Content */}
      <div className="px-3 pb-1 text-[13px] font-semibold text-[#262626] shrink-0">
        {post.likes || '1,200'} Me gusta
      </div>
      
      {showAd && post.isAd ? (
        <div className="px-3 pb-1.5 text-[13px] leading-relaxed text-[#262626] shrink-0">
          <span className="font-bold mr-1.5">vidriosASD</span>
          <span className="block font-bold text-sm mb-1">{post.adHeadline}</span>
          <span>{post.adDescription}</span>
        </div>
      ) : (
        <div className="px-3 pb-1.5 text-[13px] leading-relaxed text-[#262626] shrink-0">
          <span className="font-bold mr-1.5">vidriosASD</span>
          <span>{post.copy}</span>
          {post.hashtags && <div className="text-[#00376b] text-xs mt-0.5">{post.hashtags}</div>}
        </div>
      )}

      {/* Ad Toggle */}
      {post.isAd && (
        <div className="px-3 pb-2 shrink-0">
          <button 
            onClick={() => setShowAd(!showAd)}
            className={`w-full border-none rounded-md py-1.5 px-2.5 cursor-pointer text-[11px] font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 ${showAd ? 'bg-[#1a6b3c] hover:bg-[#145228] text-white' : 'bg-[#8b4513] hover:bg-[#a0522d] hover:scale-[1.01] text-white'}`}
          >
            <span className="text-[13px]">{showAd ? '↩️' : '🔲'}</span> 
            {showAd ? 'Ver versión Post (original)' : `Ver versión Ad (${post.adCta || 'Cotizar'})`}
          </button>
        </div>
      )}

      {/* Formats */}
      <div className="flex gap-1.5 flex-wrap px-3 pb-3 shrink-0 mt-auto">
        {formats.map((fmt, i) => (
          <span key={i} className={`text-[9px] font-bold py-0.5 px-2 rounded-full text-white tracking-wide uppercase ${fmt.includes('Post') ? 'bg-[#1a6b3c]' : fmt.includes('Carrusel') ? 'bg-[#5b21b6]' : fmt.includes('Story') ? 'bg-[#1b6fa8]' : fmt.includes('Ad') ? 'bg-[#8b4513]' : 'bg-[#6b7280]'}`}>
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
};
