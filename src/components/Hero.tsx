import { HorarioCard } from './HorarioCard';
import { IconoWa } from './Marca';
import { enumerar } from '@/lib/links';
import type { Farmacia } from '@/lib/tipos';

interface Props {
  hero: Farmacia['hero'];
  horario: Farmacia['horario'];
  tiendas: Farmacia['tiendas'];
  hayObrasSociales: boolean;
  waHref: string;
}

export function Hero({ hero, horario, tiendas, hayObrasSociales, waHref }: Props) {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <h1>{hero.titulo}</h1>
          <p className="lead">{hero.bajada}</p>
          <div className="actions">
            <a className="btn btn-primary" href={waHref} target="_blank" rel="noopener">
              <IconoWa />
              Escribinos por WhatsApp
            </a>
            {hayObrasSociales && (
              <a className="btn btn-outline" href="#obras-sociales">
                Ver obras sociales
              </a>
            )}
          </div>
          {tiendas.length > 0 && (
            <p className="hero-note">
              También te lo llevamos a tu casa por{' '}
              <a href="#delivery">{enumerar(tiendas.map((t) => t.nombre))}</a>.
            </p>
          )}
        </div>

        <HorarioCard horario={horario} />
      </div>
    </section>
  );
}
