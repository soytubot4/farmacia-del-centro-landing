import type { Farmacia } from '@/lib/tipos';
import { farmaciaDelCentro } from './farmacias/farmacia-del-centro';

/**
 * Todas las farmacias del repo. Cada build genera el sitio de UNA:
 *
 *   FARMACIA=farmacia-del-centro yarn build
 *
 * En DigitalOcean cada cliente es un static site apuntando a este mismo repo,
 * con su variable `FARMACIA` y su dominio. Un arreglo acá lo reciben todas en
 * el próximo deploy.
 */
export const FARMACIAS: Record<string, Farmacia> = {
  [farmaciaDelCentro.slug]: farmaciaDelCentro,
};

/** La que se está buildeando. Solo se llama desde componentes de servidor. */
export function getFarmacia(): Farmacia {
  const slug = process.env.FARMACIA?.trim() || Object.keys(FARMACIAS)[0]!;
  const farmacia = FARMACIAS[slug];

  if (!farmacia) {
    throw new Error(
      `No existe la farmacia "${slug}". Las que hay: ${Object.keys(FARMACIAS).join(', ')}.`,
    );
  }

  return farmacia;
}
