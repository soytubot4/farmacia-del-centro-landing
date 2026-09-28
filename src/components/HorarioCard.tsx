'use client';

import { useEffect, useState } from 'react';
import { estadoHorario, marcasBarra, rangoTexto, type EstadoHorario } from '@/lib/horario';
import type { Horario } from '@/lib/tipos';

/**
 * La tarjeta del horario, con el estado en vivo.
 *
 * El primer render (el que queda escrito en el HTML) es el genérico: "Abierto
 * todos los días". Recién cuando monta en el navegador calcula si está abierta
 * ahora. Tiene que ser así porque el sitio es estático: si el HTML dijera
 * "Abierto ahora", diría lo mismo a las cuatro de la mañana.
 */
export function HorarioCard({ horario }: { horario: Horario }) {
  const [estado, setEstado] = useState<EstadoHorario | null>(null);

  useEffect(() => {
    const actualizar = () => setEstado(estadoHorario(horario));
    actualizar();
    const id = setInterval(actualizar, 30_000);
    return () => clearInterval(id);
  }, [horario]);

  const cerrada = estado != null && !estado.abierto;
  const pct = estado?.abierto ? `${estado.progreso.toFixed(2)}%` : '0%';
  const marcas = marcasBarra(horario);

  return (
    <div className="hours-wrap">
      <div className={`hours-card${cerrada ? ' is-closed' : ''}`}>
        <div className="hours-top">
          <span className="status">
            <span className="dot" aria-hidden="true" />
            <span>
              {estado
                ? estado.abierto
                  ? 'Abierto ahora'
                  : 'Cerrado ahora'
                : `Abierto ${horario.texto.toLowerCase()}`}
            </span>
          </span>
          <span className="now">{estado ? `Son las ${estado.reloj}` : ''}</span>
        </div>

        <p className="hours-big">{rangoTexto(horario)}</p>
        <p className="hours-sub">
          {horario.texto}. {horario.detalle}.
        </p>

        <div className="bar" aria-hidden="true">
          <div className="bar-track">
            <div className="bar-fill" style={{ width: pct }} />
            <span className="bar-marker" style={{ left: pct }} />
          </div>
          <div className="bar-labels">
            {marcas.map((m) => (
              <span
                key={`${m.texto}-${m.pct}`}
                className={m.clave ? 'key' : undefined}
                style={{ left: `${m.pct}%` }}
              >
                {m.texto}
              </span>
            ))}
          </div>
        </div>

        <p className="hours-next" aria-live="polite">
          {estado ? estado.proximo : horario.detalle}
        </p>
      </div>
    </div>
  );
}
