# web-farmacias

Plantilla de sitio web para farmacias. **La estructura es fija** (hero con el
horario en vivo, servicios, delivery, obras sociales, contacto y mapa): lo único
que cambia de un cliente a otro es un archivo de datos.

Next + TypeScript con `output: "export"`, o sea que el resultado es HTML
estático en `out/`. En producción no hay ningún proceso de Node corriendo.

## Correrlo

```bash
yarn install
FARMACIA=farmacia-del-centro yarn dev     # http://localhost:3200
FARMACIA=farmacia-del-centro yarn build   # deja el sitio en out/
```

Si no pasás `FARMACIA`, agarra la primera del registro.

## Sumar una farmacia

1. Copiá `src/data/farmacias/farmacia-del-centro.tsx` con el slug del cliente.
2. Cambiá los datos. El tipo `Farmacia` (`src/lib/tipos.ts`) te marca en rojo
   cualquier cosa que falte, así que no se puede publicar un sitio a medias.
3. Sumala al registro de `src/data/index.ts`.
4. Creá el static site en DigitalOcean (abajo) con su `FARMACIA` y su dominio.

Lo que hay que tener a mano del cliente:

| Dato | Dónde va |
|---|---|
| Logo en SVG | `logo` — tiene que devolver un `<symbol id="logo">` |
| Colores de la marca | `colores` (se vuelcan a variables CSS, no hay colores fijos) |
| Dominio final | `sitio.url` — de ahí salen el canonical, el sitemap y los links de compartir |
| Horario | `horario` — soporta cierre después de medianoche y días cerrados |
| WhatsApp, teléfono y dirección | `contacto` |
| Obras sociales | `obrasSociales.items` |
| Dirección técnica y matrícula | `legal` |

Secciones que se apagan solas: si `tiendas` u `obrasSociales.items` quedan
vacíos, esa sección no se muestra y tampoco aparece en el menú.

## Detalles que conviene saber

- **El buscador de obras sociales** aparece recién cuando hay
  `obrasSociales.buscadorDesde` coberturas o más (15 por defecto). Con ocho no
  sirve de nada. Poné `0` si querés verlo siempre. La lista completa va escrita
  en el HTML: el buscador solo esconde y muestra, así Google indexa todas las
  coberturas.
- **El horario en vivo** se calcula en el navegador, sobre la zona horaria de la
  farmacia. El HTML estático dice "Abierto todos los días" y recién al cargar
  pasa a "Abierto ahora" o "Cerrado ahora" — tiene que ser así, porque un HTML
  buildeado el martes no puede saber qué hora es cuando lo abren el viernes.
- **Las fuentes** se sirven desde el propio dominio (`next/font`), no desde
  Google Fonts.
- **La imagen para compartir por WhatsApp**: poné un PNG de 1200×630 en
  `public/og.png` y descomentá `sitio.ogImage`. Sin eso, el link compartido sale
  sin tarjeta.

## Deploy en DigitalOcean App Platform

Un static site por cliente, todos apuntando a este mismo repo:

| Campo | Valor |
|---|---|
| Resource type | **Static Site** |
| Build command | `yarn build` |
| Output directory | `out` |
| Variable de entorno | `FARMACIA` = el slug, **scope Build Time** |
| Dominio | el del cliente (CNAME al de la app) |

Arreglás algo acá y lo reciben todos los clientes en el próximo deploy.
