import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Clock, Link as LinkIcon, FileText, RotateCcw } from "lucide-react";
import type { Session } from "@/types";
import { fadeInUp } from "@/components/animations/PageTransition";

interface SessionCardProps {
  session: Session;
  variant?: "therapist" | "coordinator";
}

export const SessionCard = ({ session, variant = "therapist" }: SessionCardProps) => {
  const initials = session.patientName.split(" ").map(n => n[0]).join("").slice(0, 2);
  const isHighlighted = session.status === "scheduled" && variant === "therapist";

  return (
    <motion.div
      variants={fadeInUp}
      className={`bg-card rounded-xl border p-4 flex items-center gap-4 shadow-sm transition-shadow hover:shadow-md ${
        isHighlighted ? "border-accent border-2" : "border-border"
      }`}
    >
      {variant === "coordinator" && (
        <div className={`w-14 h-14 rounded-lg flex flex-col items-center justify-center text-xs font-semibold ${
          session.status === "cancelled" ? "bg-status-cancelled/10 text-status-cancelled" :
          session.status === "completed" ? "bg-status-completed/10 text-status-completed" :
          "bg-accent/10 text-accent"
        }`}>
          <span className="text-sm font-bold">{session.startTime.split(" ")[0]}</span>
          <span className="text-[10px]">AM</span>
        </div>
      )}

      {variant === "therapist" && (
        <Avatar className="w-14 h-14">
          <AvatarFallback className="bg-muted text-muted-foreground font-medium">{initials}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-sm text-foreground">{session.patientName}</h4>
          <StatusBadge status={session.status} />
        </div>
        {variant === "coordinator" && session.therapistName && (
          <p className="text-xs text-muted-foreground mb-1">🏥 {session.therapistName}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="status-badge bg-secondary text-secondary-foreground uppercase text-[10px]">
            {session.modality === "presencial" ? "Presencial" : "Telemedicina"}
          </span>
          {variant === "therapist" && (
            <span className="flex items-center gap-1">
              <Clock size={12} className="text-accent" />
              {session.startTime} - {session.endTime}
            </span>
          )}
          {session.therapyType && (
            <span className="flex items-center gap-1">
              <FileText size={12} />
              {session.therapyType} {session.sessionNumber && `• Sesión ${session.sessionNumber}`}
            </span>
          )}
          {session.zoomLink && (
            <a href="#" className="flex items-center gap-1 text-accent hover:underline">
              <LinkIcon size={12} />
              {session.zoomLink}
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {session.status === "completed" && variant === "therapist" && (
          <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors font-medium">
            Ver Notas
          </button>
        )}
        {session.status === "scheduled" && isHighlighted && (
          <button className="px-5 py-2.5 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2">
            ▶ Iniciar sesión
          </button>
        )}
        {session.status === "scheduled" && !isHighlighted && variant === "therapist" && (
          <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors font-medium">
            Preparar notas
          </button>
        )}
        {session.status === "cancelled" && (
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
            <RotateCcw size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
