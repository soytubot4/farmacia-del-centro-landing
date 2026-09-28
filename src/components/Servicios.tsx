import {
  Baby,
  Bike,
  ClipboardPlus,
  HeartPulse,
  MessageCircle,
  PersonStanding,
  Pill,
  Sparkles,
  SprayCan,
  Stethoscope,
  Syringe,
  TestTube,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { IconoServicio, Servicio } from '@/lib/tipos';

/** Los iconos que puede usar un servicio. Agregar uno es sumarlo acá y al tipo. */
const ICONOS: Record<IconoServicio, LucideIcon> = {
  inyectables: Syringe,
  presion: HeartPulse,
  receta: ClipboardPlus,
  medicamentos: Pill,
  dermocosmetica: SprayCan,
  consultas: MessageCircle,
  bebes: Baby,
  ortopedia: PersonStanding,
  vacunas: Syringe,
  perfumeria: Sparkles,
  delivery: Bike,
  analisis: TestTube,
  cobertura: ShieldCheck,
  asesoramiento: Stethoscope,
};

export function Servicios({ servicios }: { servicios: Servicio[] }) {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="section-head">
          <h2>Servicios</h2>
          <p>Lo que podés resolver en el mostrador, en cualquier momento de nuestro horario.</p>
        </div>
        <ul className="services">
          {servicios.map((s) => {
            const Icono = ICONOS[s.icono];
            return (
              <li className="service" key={s.titulo}>
                <span className="ico" aria-hidden="true">
                  <Icono />
                </span>
                <div>
                  <h3>{s.titulo}</h3>
                  <p>{s.texto}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
