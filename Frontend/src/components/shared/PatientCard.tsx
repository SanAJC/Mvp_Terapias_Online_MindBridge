import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, MoreHorizontal, FileText, StickyNote } from "lucide-react";
import type { Patient } from "@/types";
import { fadeInUp } from "@/components/animations/PageTransition";

interface PatientCardProps {
  patient: Patient;
  onAddNote?: (patient: Patient) => void;
  onViewHistory?: (patient: Patient) => void;
  onSchedule?: (patient: Patient) => void;
}

export const PatientCard = ({ patient, onAddNote, onViewHistory, onSchedule }: PatientCardProps) => {
  const initials = patient.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const isPending = patient.nextSession?.startsWith("Hoy");

  return (
    <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-accent/[0.04]" />
      <div className="absolute -bottom-4 -left-4 w-14 h-14 rounded-full bg-primary/[0.03]" />
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-14 h-14">
            <AvatarFallback className="bg-muted text-muted-foreground font-medium text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-foreground">{patient.name}</h4>
            <span className="status-badge bg-accent/12 text-accent text-xs mt-1">{patient.therapyType}</span>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </button>
      </div>

      <div className={`rounded-lg p-3 mb-3 flex items-center gap-2 text-sm ${
        isPending ? "bg-status-pending/10 border border-status-pending/20" : "bg-secondary"
      }`}>
        {isPending ? (
          <>
            <span className="text-status-pending">⚠</span>
            <div>
              <p className="text-[10px] font-semibold uppercase text-status-pending tracking-wider">Sesión Pendiente</p>
              <p className="font-medium text-foreground">{patient.nextSession}</p>
            </div>
          </>
        ) : (
          <>
            <Calendar size={16} className="text-accent" />
            <div>
              <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wider">Próxima Sesión</p>
              <p className="font-medium text-foreground">{patient.nextSession}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between text-xs text-muted-foreground mb-4">
        <div>
          <p className="uppercase text-[10px] font-semibold tracking-wider">Última Sesión</p>
          <p className="text-foreground mt-0.5">{patient.lastSession}</p>
        </div>
        <div className="text-right">
          <p className="uppercase text-[10px] font-semibold tracking-wider">Enfoque</p>
          <p className="text-foreground mt-0.5">{patient.focus}</p>
        </div>
      </div>

      <button
        onClick={() => onViewHistory?.(patient)}
        className="w-full py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors mb-2 flex items-center justify-center gap-2"
      >
        <FileText size={14} />
        Ver historial clínico
      </button>
      <div className="flex gap-2">
        <button
          onClick={() => onAddNote?.(patient)}
          className="flex-1 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-1.5"
        >
          <StickyNote size={14} />
          Añadir nota
        </button>
        <button
          onClick={() => onSchedule?.(patient)}
          className="flex-1 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-1.5"
        >
          <Clock size={14} />
          Programar
        </button>
      </div>
    </motion.div>
  );
};
