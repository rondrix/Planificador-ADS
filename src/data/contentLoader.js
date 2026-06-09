const imageModules = import.meta.glob('../Contenidos/*/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const MONTH_META = {
  Junio: {
    slug: 'junio',
    title: 'Junio 2026',
    subtitle: 'Calendario de contenidos',
  },
};

const JUNE_POSTS = {
  1: {
    date: '2026-06-09',
    dateShort: 'Mar 9 Jun',
    dayName: 'Martes',
    title: 'Los detalles asegurados',
    copy: 'Los detalles aseguran el resultado ✨ En Vidrios ASD elegimos el vidrio correcto para cada espacio, con instalación precisa y acabados pensados para durar. ¿Tenés un proyecto en mente? Escribinos y lo cotizamos.',
    hashtags: '#VidriosASD #VidrioCorrecto #Remodelacion #CostaRica',
  },
  2: {
    date: '2026-06-11',
    dateShort: 'Jue 11 Jun',
    dayName: 'Jueves',
    title: 'Baño moderno y seguro',
    copy: 'Un baño más seguro, moderno y fácil de limpiar 🚿 El vidrio templado transforma el espacio sin recargarlo. Medimos, asesoramos e instalamos para que todo quede como debe ser.',
    hashtags: '#VidrioTemplado #PuertasDeBaño #Vidrieria #Remodelacion',
  },
  3: {
    date: '2026-06-13',
    dateShort: 'Sáb 13 Jun',
    dayName: 'Sábado',
    title: 'Tipos de vidrio',
    copy: 'No todos los vidrios son iguales 👀 Común, templado o laminado: cada uno tiene una función distinta. Te asesoramos para elegir el ideal según seguridad, uso y estilo.',
    hashtags: '#TiposDeVidrio #VidrioTemplado #VidrioLaminado #ConsejosASD',
  },
  4: {
    date: '2026-06-15',
    dateShort: 'Lun 15 Jun',
    dayName: 'Lunes',
    title: 'Europa Plex premium',
    copy: 'Puertas de vidrio premium Europa Plex ✨ Más amplitud, mejor aislamiento y una transición elegante entre ambientes. Una solución moderna para espacios que quieren verse abiertos y funcionales.',
    hashtags: '#EuropaPlex #PuertasDeVidrio #DiseñoInterior #VidriosASD',
  },
  5: {
    date: '2026-06-17',
    dateShort: 'Mié 17 Jun',
    dayName: 'Miércoles',
    title: 'Acabado limpio para baño',
    copy: 'Estético, seguro y profesional ✅ El vidrio bien instalado eleva cualquier baño: más luz, más orden visual y un acabado limpio que se nota desde el primer vistazo.',
    hashtags: '#VidrioParaBaño #DiseñoModerno #Vidrieria #Hogar',
  },
  6: {
    date: '2026-06-19',
    dateShort: 'Vie 19 Jun',
    dayName: 'Viernes',
    title: 'Proyectos de revista',
    copy: 'Proyectos de revista, hechos a medida 🏡 El vidrio correcto puede cambiar por completo la sensación de una casa: más luz, más vista y un acabado premium.',
    hashtags: '#ProyectosDeRevista #VidriosASD #Arquitectura #Remodelacion',
  },
  7: {
    date: '2026-06-21',
    dateShort: 'Dom 21 Jun',
    dayName: 'Domingo',
    title: 'Barandas seguras',
    copy: 'La seguridad también puede verse increíble 💪 Las barandas de vidrio templado protegen sin cerrar el espacio. Ideales para escaleras, terrazas y proyectos modernos.',
    hashtags: '#BarandasDeVidrio #VidrioTemplado #Seguridad #Diseño',
  },
  8: {
    date: '2026-06-23',
    dateShort: 'Mar 23 Jun',
    dayName: 'Martes',
    title: 'Europa Plex exterior',
    copy: 'Europa Plex para espacios que necesitan amplitud y conexión 🌿 Puertas de vidrio premium, adaptables y con acabados pensados para verse bien todos los días.',
    hashtags: '#EuropaPlex #PuertasPremium #VidriosASD #Terrazas',
  },
  9: {
    date: '2026-06-24',
    dateShort: 'Mié 24 Jun',
    dayName: 'Miércoles',
    title: 'Puerta funcional',
    copy: 'Cuando el vidrio se adapta al espacio, todo fluye mejor ✨ Una puerta funcional, estética y limpia para separar ambientes sin perder luz ni amplitud.',
    hashtags: '#PuertasDeVidrio #Interiores #Vidrieria #DiseñoFuncional',
  },
  10: {
    date: '2026-06-25',
    dateShort: 'Jue 25 Jun',
    dayName: 'Jueves',
    title: 'Proyecto terminado',
    copy: 'Proyecto terminado ✅ Vidrio correcto, instalación cuidada y opción de financiamiento con 0% interés con BN Tarjeta de Crédito. Así de sencillo es empezar a renovar tu espacio.',
    hashtags: '#ProyectoTerminado #VidriosASD #Financiamiento #Remodelacion',
  },
  11: {
    date: '2026-06-26',
    dateShort: 'Vie 26 Jun',
    dayName: 'Viernes',
    title: 'Estilo y seguridad',
    copy: 'Estilo, seguridad y personalización en una sola pieza 🚪 Las puertas con estructura negra dan carácter al espacio y mantienen ese look moderno que combina con todo.',
    hashtags: '#PuertasModernas #VidrioYMetal #DiseñoInterior #VidriosASD',
  },
  12: {
    date: '2026-06-28',
    dateShort: 'Dom 28 Jun',
    dayName: 'Domingo',
    title: 'Acabados profesionales',
    copy: 'Acabados profesionales de principio a fin 🔧 Un proyecto bien hecho se nota en los detalles: medidas exactas, vidrio correcto y una instalación lista para disfrutarse.',
    hashtags: '#AcabadosProfesionales #VidrioCorrecto #VidriosASD #Instalacion',
  },
  13: {
    date: '2026-06-30',
    dateShort: 'Mar 30 Jun',
    dayName: 'Martes',
    title: 'Privacidad profesional',
    copy: 'Profesional, limpio y con privacidad 👌 El vidrio arenado o decorativo ayuda a dividir espacios sin perder luz. Perfecto para oficinas, comercios y áreas que necesitan verse bien y funcionar mejor.',
    hashtags: '#VidrioDecorativo #Privacidad #Oficinas #Vidrieria',
  },
};

const MONTH_POSTS = {
  Junio: JUNE_POSTS,
};

const stripExtension = (fileName) => fileName.replace(/\.[^.]+$/, '');

const parseContentName = (fileName) => {
  const baseName = stripExtension(fileName);
  const match = baseName.match(/^(.+?)\s+(\d+)(?:\s*-\s*(\d+))?$/);

  if (!match) {
    return null;
  }

  return {
    monthName: match[1],
    contentNumber: Number(match[2]),
    slideNumber: match[3] ? Number(match[3]) : 1,
  };
};

const normalizeMonthSlug = (monthName) =>
  (MONTH_META[monthName]?.slug || monthName.toLowerCase())
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const getModuleParts = (path) => {
  const parts = path.split('/');
  return {
    monthName: parts.at(-2),
    fileName: parts.at(-1),
  };
};

const buildMonth = (monthName, entries) => {
  const grouped = new Map();
  const postsMeta = MONTH_POSTS[monthName] || {};

  entries.forEach(({ fileName, src }) => {
    const parsed = parseContentName(fileName);

    if (!parsed) {
      return;
    }

    const key = parsed.contentNumber;
    const current = grouped.get(key) || [];
    current.push({
      src,
      fileName,
      slideNumber: parsed.slideNumber,
    });
    grouped.set(key, current);
  });

  const posts = Array.from(grouped.entries())
    .map(([contentNumber, images]) => {
      const sortedImages = images.sort((a, b) => a.slideNumber - b.slideNumber);
      const meta = postsMeta[contentNumber] || {};
      const isCarousel = sortedImages.length > 1;

      return {
        id: `${normalizeMonthSlug(monthName)}-${contentNumber}`,
        contentNumber,
        fileNames: sortedImages.map((image) => image.fileName),
        mainImageUrl: sortedImages[0]?.src,
        carouselImages: sortedImages.map((image) => image.src),
        isCarousel,
        isPost: true,
        isOrganic: true,
        likes: '1,200',
        ...meta,
      };
    })
    .filter((post) => post.date)
    .sort((a, b) => a.date.localeCompare(b.date));

  const meta = MONTH_META[monthName] || {
    slug: normalizeMonthSlug(monthName),
    title: monthName,
    subtitle: 'Calendario de contenidos',
  };

  return {
    name: monthName,
    slug: meta.slug,
    title: meta.title,
    subtitle: meta.subtitle,
    posts,
    totalFiles: entries.length,
  };
};

const modulesByMonth = Object.entries(imageModules).reduce((months, [path, src]) => {
  const { monthName, fileName } = getModuleParts(path);

  if (!months.has(monthName)) {
    months.set(monthName, []);
  }

  months.get(monthName).push({ fileName, src });
  return months;
}, new Map());

export const months = Array.from(modulesByMonth.entries())
  .map(([monthName, entries]) => buildMonth(monthName, entries))
  .filter((month) => month.posts.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name, 'es'));

export const getMonthBySlug = (slug) => months.find((month) => month.slug === slug);
