# web-farmacias — plantilla de sitios para farmacias

> **Parte del ecosistema soytu** (workspace `soytubot4`): las reglas completas
> viven en el `CLAUDE.md` de la carpeta que contiene todos los repos. Lo
> mínimo si este repo está clonado suelto:
> - Commits sin `Co-Authored-By` ni menciones a IA. Español argentino con
>   voseo en UI, commits y comentarios. Cero emojis: iconos de `lucide-react`.
> - Este repo NO toca la base de datos: es una web estática.

El README cuenta cómo correrlo y cómo sumar una farmacia — está al día,
leelo. Lo que no se negocia:

- **La estructura del sitio es FIJA**: un cliente nuevo es un archivo de datos
  en `src/data/farmacias/` + una línea en el registro, nunca componentes
  nuevos ni layouts por cliente. Si un cliente "necesita" otra sección, es una
  decisión de producto para la plantilla entera.
- El tipo `Farmacia` (`src/lib/tipos.ts`) es el contrato: datos incompletos no
  compilan. Mantener esa propiedad.
- **Next suelto con yarn (v1)**, Next 16, `output: "export"` (HTML estático en
  `out/`, sin Node en producción). **SIN Tailwind a propósito**: CSS a mano —
  no lo agregues.
- Dev en el puerto 3200 (pisa al web de soytuturno si está levantado).
- No buildear con el dev server arriba (comparten `.next`).
