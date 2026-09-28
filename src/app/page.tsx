import { Contacto } from '@/components/Contacto';
import { Delivery } from '@/components/Delivery';
import { Footer } from '@/components/Footer';
import { Header, type ItemMenu } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ObrasSociales } from '@/components/ObrasSociales';
import { Servicios } from '@/components/Servicios';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { getFarmacia } from '@/data';
import { waLink } from '@/lib/links';

export default function Page() {
  const f = getFarmacia();

  const wa = waLink(f.contacto);
  const waObraSocial = waLink(
    f.contacto,
    `Hola, ${f.nombre}. ¿Trabajan con mi obra social? Tengo: `,
  );

  const hayTiendas = f.tiendas.length > 0;
  const hayObrasSociales = f.obrasSociales.items.length > 0;

  // El menú se arma con las secciones que de verdad existen: si la farmacia no
  // tiene delivery cargado, no aparece un link a una sección vacía.
  const menu: ItemMenu[] = [
    { href: '#servicios', texto: 'Servicios' },
    ...(hayTiendas ? [{ href: '#delivery', texto: 'Delivery' }] : []),
    ...(hayObrasSociales ? [{ href: '#obras-sociales', texto: 'Obras sociales' }] : []),
    { href: '#contacto', texto: 'Horario y contacto' },
  ];

  return (
    <>
      <Header
        linea1={f.marca.linea1}
        linea2={f.marca.linea2}
        nombre={f.nombre}
        waHref={wa}
        menu={menu}
      />

      <main>
        <Hero
          hero={f.hero}
          horario={f.horario}
          tiendas={f.tiendas}
          hayObrasSociales={hayObrasSociales}
          waHref={wa}
        />

        <Servicios servicios={f.servicios} />

        {hayTiendas && <Delivery tiendas={f.tiendas} />}

        {hayObrasSociales && (
          <ObrasSociales
            items={f.obrasSociales.items}
            buscadorDesde={f.obrasSociales.buscadorDesde}
            waHref={waObraSocial}
          />
        )}

        <Contacto
          contacto={f.contacto}
          horario={f.horario}
          nombre={f.nombre}
          waHref={wa}
        />
      </main>

      <Footer
        marca={f.marca}
        nombre={f.nombre}
        legal={f.legal}
        localidad={f.contacto.direccion.localidad}
      />

      <WhatsAppFloat href={wa} />
    </>
  );
}
