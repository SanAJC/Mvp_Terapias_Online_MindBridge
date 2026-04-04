import { SessionStatus } from "@/types";

const statusLabels: Record<SessionStatus, string> = {
  scheduled: "PROGRAMADA",
  completed: "COMPLETADA",
  cancelled: "CANCELADA",
  pending: "PENDIENTE",
  "in-progress": "EN CURSO",
};

interface StatusBadgeProps {
  status: SessionStatus;
  className?: string;
}

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const statusClass = {
    scheduled: "status-scheduled",
    completed: "status-completed",
    cancelled: "status-cancelled",
    pending: "status-pending",
    "in-progress": "status-active",
  }[status];

  return (
    <span className={`${statusClass} ${className}`}>
      {statusLabels[status]}
    </span>
  );
};
