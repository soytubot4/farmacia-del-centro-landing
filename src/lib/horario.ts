import type { Dia, Horario } from './tipos';

/**
 * Cálculo del horario. Todo se hace sobre la hora de la FARMACIA (su zona),
 * nunca sobre la del visitante: alguien que entra desde España tiene que ver
 * si está abierta en Rosario, no en Madrid.
 *
 * Soporta que el cierre caiga después de medianoche (abre 08:00, cierra 01:00).
 */

/** Índice = el que devuelve getDay(): 0 es domingo. */
const DIAS: Dia[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const NOMBRE_DIA: Record<Dia, string> = {
  Mo: 'lunes',
  Tu: 'martes',
  We: 'miércoles',
  Th: 'jueves',
  Fr: 'viernes',
  Sa: 'sábado',
  Su: 'domingo',
};

/** Para el JSON-LD, que pide los nombres largos en inglés. */
export const DIA_SCHEMA: Record<Dia, string> = {
  Mo: 'Monday',
  Tu: 'Tuesday',
  We: 'Wednesday',
  Th: 'Thursday',
  Fr: 'Friday',
  Sa: 'Saturday',
  Su: 'Sunday',
};

export function aMinutos(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

/** 480 → "8:00". Sin cero adelante, como se escribe en criollo. */
export function hora(minutos: number): string {
  const h = Math.floor(minutos / 60) % 24;
  const m = minutos % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
}

/** 480 → "a las 8:00"; 60 → "a la 1:00". */
export function aLas(minutos: number): string {
  const h = Math.floor(minutos / 60) % 24;
  return `${h === 1 ? 'a la' : 'a las'} ${hora(minutos)}`;
}

export function duracion(minutos: number): string {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** Cuánto dura el turno, en minutos. Un cierre a la misma hora que abre = 24 h. */
export function duracionTurno(h: Horario): number {
  const d = (aMinutos(h.cierra) - aMinutos(h.abre) + 1440) % 1440;
  return d === 0 ? 1440 : d;
}

/** "8:00 a 1:00" — el número grande de la tarjeta. */
export function rangoTexto(h: Horario): string {
  return `${hora(aMinutos(h.abre))} a ${hora(aMinutos(h.cierra))}`;
}

interface Ahora {
  /** 0 = domingo. */
  dia: number;
  /** Minutos desde la medianoche. */
  minutos: number;
}

export function ahoraEn(zona: string, fecha: Date = new Date()): Ahora {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: zona,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(fecha);

  const buscar = (tipo: Intl.DateTimeFormatPartTypes) =>
    partes.find((p) => p.type === tipo)?.value ?? '';

  const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(buscar('weekday'));
  const h = Number(buscar('hour')) % 24;
  const m = Number(buscar('minute'));

  return { dia: dia < 0 ? 0 : dia, minutos: h * 60 + m };
}

export interface EstadoHorario {
  abierto: boolean;
  /** "09:05" — con cero adelante, que es como se lee un reloj. */
  reloj: string;
  /** 0 a 100. Solo tiene sentido si está abierto. */
  progreso: number;
  /** "Cerramos a la 1:00, en 3 h 20 min" / "Abrimos mañana a las 8:00". */
  proximo: string;
}

export function estadoHorario(h: Horario, fecha: Date = new Date()): EstadoHorario {
  const { dia, minutos } = ahoraEn(h.zona, fecha);
  const abre = aMinutos(h.abre);
  const cierra = aMinutos(h.cierra);
  const span = duracionTurno(h);
  const abreEseDia = (d: number) => h.dias.includes(DIAS[d]!);

  const reloj = `${String(Math.floor(minutos / 60)).padStart(2, '0')}:${String(minutos % 60).padStart(2, '0')}`;

  // ¿Estamos dentro del turno que arrancó hoy, o del que arrancó ayer y cruzó
  // la medianoche?
  let transcurrido = -1;
  if (abreEseDia(dia) && minutos >= abre && minutos - abre < span) {
    transcurrido = minutos - abre;
  } else if (minutos < abre) {
    const ayer = (dia + 6) % 7;
    const desdeAyer = minutos + 1440 - abre;
    if (abreEseDia(ayer) && desdeAyer < span) transcurrido = desdeAyer;
  }

  if (transcurrido >= 0) {
    return {
      abierto: true,
      reloj,
      progreso: (transcurrido / span) * 100,
      proximo: `Cerramos ${aLas(cierra)}, en ${duracion(span - transcurrido)}`,
    };
  }

  // Cerrada: buscamos la próxima apertura dentro de la semana.
  for (let i = 0; i < 8; i++) {
    const d = (dia + i) % 7;
    if (!abreEseDia(d)) continue;
    const falta = i * 1440 + abre - minutos;
    if (falta <= 0) continue;

    const cuando =
      i === 0 ? 'hoy' : i === 1 ? 'mañana' : `el ${NOMBRE_DIA[DIAS[d]!]}`;
    const enCuanto = falta < 12 * 60 ? `, en ${duracion(falta)}` : '';

    return { abierto: false, reloj, progreso: 0, proximo: `Abrimos ${cuando} ${aLas(abre)}${enCuanto}` };
  }

  return { abierto: false, reloj, progreso: 0, proximo: 'Consultanos el horario por WhatsApp' };
}

export interface MarcaBarra {
  texto: string;
  /** Posición en la barra, de 0 a 100. */
  pct: number;
  /** Las puntas (apertura y cierre) van resaltadas. */
  clave: boolean;
}

/** Las marcas de la barra: la apertura, cada 4 h, y el cierre. */
export function marcasBarra(h: Horario): MarcaBarra[] {
  const abre = aMinutos(h.abre);
  const span = duracionTurno(h);
  const marcas: MarcaBarra[] = [{ texto: hora(abre), pct: 0, clave: true }];

  for (let t = 240; t < span - 90; t += 240) {
    marcas.push({ texto: hora((abre + t) % 1440), pct: (t / span) * 100, clave: false });
  }

  marcas.push({ texto: hora((abre + span) % 1440), pct: 100, clave: true });
  return marcas;
}
