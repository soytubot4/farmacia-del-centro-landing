import { Clock, ExternalLink, MapPin, Phone } from 'lucide-react';
import { direccionTexto, mapaEmbed, mapaLink } from '@/lib/links';
import { rangoTexto } from '@/lib/horario';
import { IconoWa } from './Marca';
import type { Contacto as DatosContacto, Horario } from '@/lib/tipos';

interface Props {
  contacto: DatosContacto;
  horario: Horario;
  nombre: string;
  waHref: string;
}

export function Contacto({ contacto, horario, nombre, waHref }: Props) {
  const { direccion } = contacto;

  return (
    <section className="section contact" id="contacto">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <h2>Horario y contacto</h2>
            <ul className="info">
              <li>
                <span className="ico-sm" aria-hidden="true">
                  <Clock />
                </span>
                <div>
                  <p className="info-label">Horario</p>
                  <p className="info-value">
                    {horario.texto}, de {rangoTexto(horario)}
                  </p>
                  <p className="info-sub">{horario.detalle}</p>
                </div>
              </li>
              <li>
                <span className="ico-sm" aria-hidden="true">
                  <MapPin />
                </span>
                <div>
                  <p className="info-label">Dirección</p>
                  <p className="info-value">{direccion.calle}</p>
                  <p className="info-sub">
                    {direccion.localidad}, {direccion.provincia}
                  </p>
                  <a
                    className="info-link"
                    href={mapaLink(direccion)}
                    target="_blank"
                    rel="noopener"
                  >
                    Cómo llegar
                  </a>
                </div>
              </li>
              <li>
                <span className="ico-sm" aria-hidden="true">
                  <Phone />
                </span>
                <div>
                  <p className="info-label">Teléfono y WhatsApp</p>
                  <a className="info-value" href={`tel:${contacto.telefonoLink}`}>
                    {contacto.telefono}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="map">
            <div className="map-fallback" aria-hidden="true">
              <MapPin />
              <span>
                {direccion.calle}, {direccion.localidad}
              </span>
            </div>
            <iframe
              src={mapaEmbed(direccion)}
              title={`Mapa: ${nombre}, ${direccionTexto(direccion)}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a className="map-open" href={mapaLink(direccion)} target="_blank" rel="noopener">
              Abrir en Google Maps
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="cta-panel">
          <div>
            <h2>¿Tenés una consulta?</h2>
            <p>
              Escribinos por WhatsApp para preguntar precios, stock o si trabajamos con tu obra
              social. Te respondemos en el horario de atención.
            </p>
          </div>
          <a className="btn btn-light" href={waHref} target="_blank" rel="noopener">
            <IconoWa />
            Abrir WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
