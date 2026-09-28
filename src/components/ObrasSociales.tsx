'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

interface Props {
  items: string[];
  buscadorDesde: number;
  waHref: string;
}

/** Los acentos, una vez descompuestos por normalize('NFD'). */
const TILDES = new RegExp('[\\u0300-\\u036f]', 'g');

/** Saca tildes y mayúsculas: escribiendo "medife" tiene que aparecer "Medifé". */
const normalizar = (s: string) => s.normalize('NFD').replace(TILDES, '').toLowerCase().trim();

/**
 * La lista completa sale siempre escrita en el HTML — el buscador solo esconde
 * y muestra. Si se armara con JavaScript, Google podría no indexar ninguna
 * cobertura, que es justo lo que la gente busca ("farmacia que atienda PAMI").
 */
export function ObrasSociales({ items, buscadorDesde, waHref }: Props) {
  const [busqueda, setBusqueda] = useState('');

  const claves = useMemo(() => items.map(normalizar), [items]);
  const q = normalizar(busqueda);
  const visible = claves.map((k) => !q || k.includes(q));
  const cantidad = visible.filter(Boolean).length;
  const hayBuscador = items.length >= buscadorDesde;

  return (
    <section className="section coverage" id="obras-sociales">
      <div className="wrap">
        <div className="section-head">
          <h2>Obras sociales y prepagas</h2>
          <p>Trabajamos con las principales coberturas del país. La lista se actualiza seguido.</p>
        </div>

        <div className="os-tools">
          {hayBuscador && (
            <div className="os-search">
              <Search aria-hidden="true" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscá tu obra social o prepaga"
                aria-label="Buscar obra social o prepaga"
                aria-controls="os-list"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          )}
          <span className="os-count" aria-live="polite">
            {q
              ? `${cantidad} de ${items.length}`
              : `${items.length} ${items.length === 1 ? 'cobertura' : 'coberturas'}`}
          </span>
        </div>

        <ul className="os-list" id="os-list">
          {items.map((nombre, i) => (
            <li key={nombre} hidden={!visible[i]}>
              {nombre}
            </li>
          ))}
        </ul>

        {cantidad === 0 && (
          <p className="os-empty">
            No encontramos esa cobertura en la lista. Escribinos y te confirmamos al toque.
          </p>
        )}

        <div className="coverage-note">
          <p>¿No ves la tuya? Consultanos y te decimos al instante.</p>
          <a className="btn btn-outline btn-sm" href={waHref} target="_blank" rel="noopener">
            Consultar mi obra social
          </a>
        </div>
      </div>
    </section>
  );
}
