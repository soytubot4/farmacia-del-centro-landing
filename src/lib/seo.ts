import { DIA_SCHEMA } from './horario';
import { direccionTexto, mapaLink } from './links';
import type { Farmacia } from './tipos';

/**
 * Los datos estructurados que lee Google para mostrar la ficha de la farmacia
 * (horario, dirección, teléfono) en los resultados.
 *
 * Ojo con `openingHoursSpecification`: el string corto `"Mo-Su 08:00-01:00"`
 * que se usaba antes cruza la medianoche y Google lo interpreta mal.
 */
export function jsonLd(f: Farmacia): Record<string, unknown> {
  const { direccion } = f.contacto;

  return {
    '@context': 'https://schema.org',
    '@type': 'Pharmacy',
    '@id': `${f.sitio.url}/#farmacia`,
    name: f.nombre,
    url: f.sitio.url,
    telephone: f.contacto.telefonoLink,
    ...(f.sitio.ogImage ? { image: `${f.sitio.url}${f.sitio.ogImage}` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: direccion.calle,
      addressLocality: direccion.localidad,
      addressRegion: direccion.provincia,
      addressCountry: 'AR',
    },
    ...(direccion.lat != null && direccion.lng != null
      ? { geo: { '@type': 'GeoCoordinates', latitude: direccion.lat, longitude: direccion.lng } }
      : {}),
    hasMap: mapaLink(direccion),
    areaServed: direccion.localidad,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: f.horario.dias.map((d) => DIA_SCHEMA[d]),
        opens: f.horario.abre,
        closes: f.horario.cierra,
      },
    ],
    ...(f.obrasSociales.items.length
      ? {
          makesOffer: {
            '@type': 'Offer',
            name: 'Atención de obras sociales y prepagas',
            description: `Trabajamos con ${f.obrasSociales.items.length} coberturas: ${f.obrasSociales.items.join(', ')}.`,
          },
        }
      : {}),
    description: `${f.seo.descripcion} ${direccionTexto(direccion)}.`,
  };
}
