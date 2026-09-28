import { ExternalLink } from 'lucide-react';
import type { Tienda } from '@/lib/tipos';

export function Delivery({ tiendas }: { tiendas: Tienda[] }) {
  return (
    <section className="section delivery" id="delivery">
      <div className="wrap">
        <div className="section-head">
          <h2>Pedí sin moverte de tu casa</h2>
          <p>
            Encontranos en tus apps de delivery y recibí perfumería, cuidado personal y productos de
            venta libre.
          </p>
        </div>
        <div className="stores">
          {tiendas.map((t) => (
            <a className="store" href={t.url} key={t.nombre} target="_blank" rel="noopener">
              <span className="store-name">{t.nombre}</span>
              <span className="store-cta">
                Ver tienda
                <ExternalLink aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
