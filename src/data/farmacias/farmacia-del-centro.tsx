import type { Farmacia } from '@/lib/tipos';

/**
 * Farmacia del Centro — Rosario, Santa Fe.
 *
 * Para dar de alta otra farmacia: copiá este archivo, cambiá los datos y
 * sumalo al registro de `src/data/index.ts`.
 */
export const farmaciaDelCentro: Farmacia = {
  slug: 'farmacia-del-centro',
  nombre: 'Farmacia del Centro',

  logo: () => (
    <symbol id="logo" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#3A9B95" />
      <g fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 57C40.5 49.5 29.5 42 29.5 33.5C29.5 27.5 34 23 39.8 23C44.3 23 47.6 25.5 50 29C52.4 25.5 55.7 23 60.2 23C66 23 70.5 27.5 70.5 33.5C70.5 42 59.5 49.5 50 57Z" />
        <path d="M47.7 31.5h4.6v4.8h4.8v4.6h-4.8v4.8h-4.6v-4.8h-4.8v-4.6h4.8z" />
        <g id="mano">
          <path d="M33.5 72C29 67.5 25.8 62.5 24.2 56.5L21.8 48.6C21.2 46.4 24 45.3 25 47.4L28.2 55.3" />
          <path d="M47.2 72V66.8C47.2 64.8 46.3 63.3 44.8 62.2L37.6 56.8C35.9 55.6 33.8 57.3 34.9 59.1L39.8 63.6" />
          <rect x="31.6" y="72" width="16.8" height="5.6" rx="1.6" />
        </g>
        <use href="#mano" transform="translate(100 0) scale(-1 1)" />
      </g>
    </symbol>
  ),

  marca: {
    linea1: 'FARMACIA',
    linea2: 'DEL CENTRO',
    /**
     * El logo, igual que en la web.
     *
     * Dos cosas cambian respecto del original: el trazo pasa de 2.3 a 4.2
     * porque a 16 píxeles las líneas finas directamente no se dibujan, y la
     * mano derecha va escrita entera en vez de un `<use href="#mano">` — dentro
     * de un data URI no hay documento donde resolver esa referencia y el ícono
     * saldría con una sola mano.
     */
    favicon:
      "data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%20100%27%3E%3Ccircle%20cx%3D%2750%27%20cy%3D%2750%27%20r%3D%2750%27%20fill%3D%27%233A9B95%27%2F%3E%3Cg%20fill%3D%27none%27%20stroke%3D%27%23fff%27%20stroke-width%3D%274.2%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%3E%3Cpath%20d%3D%22M50%2057C40.5%2049.5%2029.5%2042%2029.5%2033.5C29.5%2027.5%2034%2023%2039.8%2023C44.3%2023%2047.6%2025.5%2050%2029C52.4%2025.5%2055.7%2023%2060.2%2023C66%2023%2070.5%2027.5%2070.5%2033.5C70.5%2042%2059.5%2049.5%2050%2057Z%22%2F%3E%3Cpath%20d%3D%22M47.7%2031.5h4.6v4.8h4.8v4.6h-4.8v4.8h-4.6v-4.8h-4.8v-4.6h4.8z%22%2F%3E%3Cg%3E%3Cpath%20d%3D%22M33.5%2072C29%2067.5%2025.8%2062.5%2024.2%2056.5L21.8%2048.6C21.2%2046.4%2024%2045.3%2025%2047.4L28.2%2055.3%22%2F%3E%3Cpath%20d%3D%22M47.2%2072V66.8C47.2%2064.8%2046.3%2063.3%2044.8%2062.2L37.6%2056.8C35.9%2055.6%2033.8%2057.3%2034.9%2059.1L39.8%2063.6%22%2F%3E%3Crect%20x%3D%2231.6%22%20y%3D%2272%22%20width%3D%2216.8%22%20height%3D%225.6%22%20rx%3D%221.6%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate%28100%200%29%20scale%28-1%201%29%22%3E%3Cpath%20d%3D%22M33.5%2072C29%2067.5%2025.8%2062.5%2024.2%2056.5L21.8%2048.6C21.2%2046.4%2024%2045.3%2025%2047.4L28.2%2055.3%22%2F%3E%3Cpath%20d%3D%22M47.2%2072V66.8C47.2%2064.8%2046.3%2063.3%2044.8%2062.2L37.6%2056.8C35.9%2055.6%2033.8%2057.3%2034.9%2059.1L39.8%2063.6%22%2F%3E%3Crect%20x%3D%2231.6%22%20y%3D%2272%22%20width%3D%2216.8%22%20height%3D%225.6%22%20rx%3D%221.6%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
  },

  colores: {
    principal: '#3A9B95',
    fuerte: '#26776F',
    profundo: '#17504B',
    suave: '#8ED1CF',
    fondo: '#EDF6F5',
    linea: '#D6E8E6',
  },

  // De acá salen el canonical, el sitemap y los links que se ven al compartir.
  sitio: {
    url: 'https://farmadelcentro.com',
    // ogImage: '/og.png',
  },

  seo: {
    titulo: 'Farmacia del Centro | Farmacia en Rosario abierta de 8 a 1',
    descripcion:
      'Farmacia en el centro de Rosario abierta todos los días de 8:00 a 1:00. Aplicación de inyectables, control de presión, receta electrónica y atención de obras sociales.',
  },

  hero: {
    titulo: 'Tu farmacia, todos los días hasta la 1 de la mañana',
    bajada:
      'Medicamentos, aplicación de inyectables y control de presión en pleno centro de Rosario, con atención de las principales obras sociales. Abrimos de lunes a domingo desde las 8.',
  },

  horario: {
    abre: '08:00',
    cierra: '01:00',
    dias: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    texto: 'Todos los días',
    detalle: 'De corrido, sin cortar al mediodía',
    zona: 'America/Argentina/Buenos_Aires',
  },

  contacto: {
    whatsapp: '5493412103422',
    mensaje: 'Hola, Farmacia del Centro. Quería hacer una consulta.',
    telefono: '341 210-3422',
    telefonoLink: '+5493412103422',
    direccion: {
      calle: 'Corrientes 888',
      localidad: 'Rosario',
      provincia: 'Santa Fe',
    },
  },

  servicios: [
    {
      icono: 'inyectables',
      titulo: 'Aplicación de inyectables',
      texto: 'Traé tu medicación con la orden médica y te la aplicamos en el momento.',
    },
    {
      icono: 'presion',
      titulo: 'Control de presión arterial',
      texto: 'Pasá cuando quieras y te tomamos la presión en pocos minutos, sin turno.',
    },
    {
      icono: 'receta',
      titulo: 'Receta electrónica',
      texto: 'Recibimos recetas digitales y en papel, con la cobertura de tu obra social o prepaga.',
    },
    {
      icono: 'medicamentos',
      titulo: 'Medicamentos y asesoramiento',
      texto: 'Consultá con el farmacéutico cómo tomar tu medicación, dosis e interacciones.',
    },
    {
      icono: 'dermocosmetica',
      titulo: 'Dermocosmética y perfumería',
      texto: 'Cuidado de la piel, protección solar, higiene personal y productos para bebés.',
    },
    {
      icono: 'consultas',
      titulo: 'Consultas por WhatsApp',
      texto: 'Preguntanos por precio y stock antes de venir, así no perdés el viaje.',
    },
  ],

  // Pegá el link de la farmacia en cada app. Si queda vacío, no se muestra la sección.
  tiendas: [
    {
      nombre: 'PedidosYa',
      url: 'https://www.pedidosya.com.ar/restaurantes/rosario/farmacia-del-centro-d15da6b3-4b32-4d20-85ff-cca9b09e318e-menu',
    },
    { nombre: 'Rappi', url: 'https://www.rappi.com.ar/tiendas/231017-farmaciadelcentroar-mt-nc' },
    {
      nombre: 'Uber Eats',
      url: 'https://www.ubereats.com/cr/store/farmacia-del-centro-corrientes/RheCH1b_WWqYeiRSL4XBwQ',
    },
  ],

  obrasSociales: {
    // En orden alfabético: con el buscador arriba, es lo que hace que cada uno
    // encuentre la suya de un vistazo.
    items: [
      'Alianza Médica',
      'AMR',
      'ANDAR',
      'Arte de Curar',
      'Británica Salud',
      'Caja Forense',
      'Ciencias Económicas',
      'DASUTEN',
      'DEMI',
      'Esencial',
      'Federada Salud',
      'IAPOS',
      'Ingeniería Salud',
      'Integral',
      'Jerárquicos',
      'Medicus',
      'Medifé',
      'MUTUALYF',
      'Omint',
      'OPDEA',
      'OSDE',
      'OSDOP',
      'OSPATRONES',
      'PAMI',
      'Plenit',
      'Poder Judicial',
      'Prevención Salud',
      'Primero Salud',
      'Recetario Solidario',
      'Salud del Nuevo Rosario',
      'Sancor Salud',
      'Sindicato de Prensa (OSPRO)',
      'Swiss Medical',
      'Unión Personal',
      'Vale Salud',
    ],
    buscadorDesde: 15,
  },

  legal: {
    rotulo: 'Directora técnica',
    nombre: 'Farm. Gabriela Bacigaluppo',
    matricula: '2978',
  },
};
