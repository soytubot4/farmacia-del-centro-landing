import type { Contacto, Direccion } from './tipos';

/**
 * Los links se arman en el servidor (o sea, al buildear) y salen escritos en el
 * HTML. En la versión anterior los escribía JavaScript en el navegador: si el
 * JS no cargaba, el botón de WhatsApp no iba a ningún lado.
 */

export function waLink(contacto: Contacto, mensaje?: string): string {
  const texto = encodeURIComponent(mensaje ?? contacto.mensaje);
  return `https://wa.me/${contacto.whatsapp}?text=${texto}`;
}

export function direccionTexto(d: Direccion): string {
  return `${d.calle}, ${d.localidad}, ${d.provincia}`;
}

export function mapaLink(d: Direccion): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionTexto(d))}`;
}

export function mapaEmbed(d: Direccion): string {
  const q = encodeURIComponent(`${direccionTexto(d)}, Argentina`);
  return `https://maps.google.com/maps?q=${q}&t=m&z=16&ie=UTF8&iwloc=&output=embed`;
}

/** "PedidosYa, Rappi y Uber Eats" */
export function enumerar(items: string[]): string {
  return new Intl.ListFormat('es-AR', { style: 'long', type: 'conjunction' }).format(items);
}
