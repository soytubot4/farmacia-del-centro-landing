import type { Farmacia } from './tipos';

/**
 * Los colores de la farmacia, volcados a las variables CSS que usa la hoja de
 * estilos. Se inyecta en el HTML al buildear, así no hay un flash con los
 * colores de otra marca antes de que cargue el CSS.
 */
export function variablesCss(f: Farmacia): string {
  const { principal, fuerte, profundo, suave, fondo, linea } = f.colores;
  return [
    ':root{',
    `--teal:${principal};`,
    `--teal-strong:${fuerte};`,
    `--teal-deep:${profundo};`,
    `--aqua:${suave};`,
    `--mist:${fondo};`,
    `--line:${linea};`,
    '}',
  ].join('');
}
