export function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Escribinos por WhatsApp"
    >
      <svg aria-hidden="true">
        <use href="#wa" />
      </svg>
      <span className="wa-tip">¿Consultas? Escribinos</span>
    </a>
  );
}
