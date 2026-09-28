import type { ReactElement } from 'react';

/**
 * Todo lo que cambia de una farmacia a otra vive acá. La estructura de la
 * página es fija: si querés sumar una farmacia, copiás un archivo de
 * `src/data/farmacias/` y cambiás los datos. Nada más.
 */

/** Días en el formato corto de schema.org. */
export type Dia = 'Mo' | 'Tu' | 'We' | 'Th' | 'Fr' | 'Sa' | 'Su';

/** Iconos disponibles para la grilla de servicios (son de lucide-react). */
export type IconoServicio =
  | 'inyectables'
  | 'presion'
  | 'receta'
  | 'medicamentos'
  | 'dermocosmetica'
  | 'consultas'
  | 'bebes'
  | 'ortopedia'
  | 'vacunas'
  | 'perfumeria'
  | 'delivery'
  | 'analisis'
  | 'cobertura'
  | 'asesoramiento';

export interface Servicio {
  icono: IconoServicio;
  titulo: string;
  texto: string;
}

export interface Tienda {
  /** Se muestra tal cual en la tarjeta: "PedidosYa", "Rappi", "Uber Eats". */
  nombre: string;
  url: string;
}

export interface Horario {
  /** Formato 24 h, "HH:MM". */
  abre: string;
  /** Puede ser después de medianoche: abre 08:00 y cierra 01:00 es un turno de 17 h. */
  cierra: string;
  /** Días en los que ABRE (el turno que cruza medianoche se cuenta en el día que arranca). */
  dias: Dia[];
  /** Cómo se lee: "Todos los días", "De lunes a sábado". */
  texto: string;
  /** Aclaración corta: "De corrido, sin cortar al mediodía". */
  detalle: string;
  /** Zona horaria IANA. Siempre la de la farmacia, no la del visitante. */
  zona: string;
}

export interface Direccion {
  calle: string;
  localidad: string;
  provincia: string;
  /** Opcional: si están, el JSON-LD sale más completo para Google. */
  lat?: number;
  lng?: number;
}

export interface Contacto {
  /** Solo números: 54 + 9 + área sin 0 + número sin 15. */
  whatsapp: string;
  /** Mensaje que aparece escrito al abrir el chat. */
  mensaje: string;
  /** Como se muestra: "341 210-3422". */
  telefono: string;
  /** Como se marca: "+5493412103422". */
  telefonoLink: string;
  direccion: Direccion;
}

export interface Farmacia {
  slug: string;
  /** Nombre legal/comercial, el que ve Google. */
  nombre: string;
  /** El símbolo del logo: tiene que devolver un <symbol id="logo"> de SVG. */
  logo: () => ReactElement;
  marca: {
    /** Las dos líneas del isologo del encabezado. */
    linea1: string;
    linea2: string;
    /** Icono de la pestaña: ruta a un archivo de `public/` o un data URI. */
    favicon: string;
  };
  /** Paleta. Se vuelca a variables CSS, así que no hay colores hardcodeados. */
  colores: {
    principal: string;
    fuerte: string;
    profundo: string;
    suave: string;
    fondo: string;
    linea: string;
  };
  sitio: {
    /** Dominio final, sin barra al final. Se usa para el canonical y el sitemap. */
    url: string;
    /** Imagen que se ve al compartir por WhatsApp. 1200×630 px, en `public/`. */
    ogImage?: string;
  };
  seo: {
    titulo: string;
    descripcion: string;
  };
  hero: {
    titulo: string;
    bajada: string;
  };
  horario: Horario;
  contacto: Contacto;
  servicios: Servicio[];
  /** Si está vacío, la sección de delivery no se muestra. */
  tiendas: Tienda[];
  obrasSociales: {
    /** Si está vacío, la sección no se muestra. */
    items: string[];
    /** El buscador aparece solo si hay muchas (con 5 no tiene sentido). */
    buscadorDesde: number;
  };
  legal: {
    /** Cómo se anuncia la dirección técnica: "Directora técnica" / "Director técnico". */
    rotulo: string;
    nombre: string;
    /** Matrícula provincial. Se imprime como "M.P. 2978". */
    matricula: string;
  };
}
