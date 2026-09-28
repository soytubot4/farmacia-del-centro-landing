interface Props {
  linea1: string;
  linea2: string;
  href?: string;
  etiqueta: string;
}

/** El isologo con las dos líneas de texto. Va en el encabezado y en el pie. */
export function Marca({ linea1, linea2, href = '#top', etiqueta }: Props) {
  return (
    <a className="brand" href={href} aria-label={etiqueta}>
      <svg aria-hidden="true">
        <use href="#logo" />
      </svg>
      <span className="brand-text">
        <strong>{linea1}</strong>
        <span>{linea2}</span>
      </span>
    </a>
  );
}

/** El icono de WhatsApp del sprite. */
export function IconoWa() {
  return (
    <svg fill="currentColor" aria-hidden="true">
      <use href="#wa" />
    </svg>
  );
}
