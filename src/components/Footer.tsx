import { Marca } from './Marca';
import type { Farmacia } from '@/lib/tipos';

interface Props {
  marca: Farmacia['marca'];
  nombre: string;
  legal: Farmacia['legal'];
  localidad: string;
}

export function Footer({ marca, nombre, legal, localidad }: Props) {
  // Se resuelve al buildear. Cada deploy lo deja al día.
  const anio = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <Marca linea1={marca.linea1} linea2={marca.linea2} etiqueta="Volver arriba" />
        <p className="legal">
          {legal.rotulo}: {legal.nombre}, M.P. {legal.matricula}
          <br />© {anio} {nombre}, {localidad}
        </p>
      </div>
    </footer>
  );
}
