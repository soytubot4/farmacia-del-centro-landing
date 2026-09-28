'use client';

import { useEffect, useState } from 'react';
import { IconoWa, Marca } from './Marca';

export interface ItemMenu {
  href: string;
  texto: string;
}

interface Props {
  linea1: string;
  linea2: string;
  nombre: string;
  waHref: string;
  menu: ItemMenu[];
}

/**
 * Es cliente por una sola razón: el borde de abajo aparece al scrollear.
 * El resto del encabezado sale igual con o sin JavaScript.
 */
export function Header({ linea1, linea2, nombre, waHref, menu }: Props) {
  const [scrolleado, setScrolleado] = useState(false);

  useEffect(() => {
    const alScrollear = () => setScrolleado(window.scrollY > 8);
    alScrollear();
    window.addEventListener('scroll', alScrollear, { passive: true });
    return () => window.removeEventListener('scroll', alScrollear);
  }, []);

  return (
    <header className={`site-header${scrolleado ? ' scrolled' : ''}`} id="top">
      <div className="wrap nav">
        <Marca linea1={linea1} linea2={linea2} etiqueta={`${nombre}, inicio`} />
        <ul className="menu">
          {menu.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.texto}</a>
            </li>
          ))}
        </ul>
        <a className="btn btn-primary btn-sm" href={waHref} target="_blank" rel="noopener">
          <IconoWa />
          <span>WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
