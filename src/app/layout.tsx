import type { Metadata, Viewport } from 'next';
import { Figtree, Montserrat } from 'next/font/google';
import { Sprite } from '@/components/Sprite';
import { getFarmacia } from '@/data';
import { jsonLd } from '@/lib/seo';
import { variablesCss } from '@/lib/tema';
import './globals.css';

/**
 * Las fuentes se sirven desde el mismo dominio (next/font las descarga al
 * buildear). Antes venían de Google Fonts, que bloquea el primer render y es
 * un pedido a otro servidor en el peor momento de la carga.
 */
const texto = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--fuente-texto',
  display: 'swap',
});

const titulos = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--fuente-titulos',
  display: 'swap',
});

const farmacia = getFarmacia();

export const metadata: Metadata = {
  metadataBase: new URL(farmacia.sitio.url),
  title: farmacia.seo.titulo,
  description: farmacia.seo.descripcion,
  alternates: { canonical: '/' },
  icons: { icon: farmacia.marca.favicon },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: farmacia.sitio.url,
    siteName: farmacia.nombre,
    title: farmacia.seo.titulo,
    description: farmacia.seo.descripcion,
    ...(farmacia.sitio.ogImage
      ? { images: [{ url: farmacia.sitio.ogImage, width: 1200, height: 630, alt: farmacia.nombre }] }
      : {}),
  },
  twitter: {
    card: farmacia.sitio.ogImage ? 'summary_large_image' : 'summary',
    title: farmacia.seo.titulo,
    description: farmacia.seo.descripcion,
  },
};

export const viewport: Viewport = {
  themeColor: farmacia.colores.principal,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${texto.variable} ${titulos.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: variablesCss(farmacia) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(farmacia)) }}
        />
      </head>
      <body>
        <Sprite logo={farmacia.logo} />
        {children}
      </body>
    </html>
  );
}
