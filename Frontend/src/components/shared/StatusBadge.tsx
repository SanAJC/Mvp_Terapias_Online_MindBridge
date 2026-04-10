import { SessionStatus } from "@/types";

const statusLabels: Record<SessionStatus, string> = {
  SCHEDULED: "PROGRAMADA",
  COMPLETED: "COMPLETADA",
  CANCELED: "CANCELADA",
  ABSENT: "AUSENTE",
};

interface StatusBadgeProps {
  status: SessionStatus;
  className?: string;
}

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const statusClass = {
    SCHEDULED: "status-scheduled",
    COMPLETED: "status-completed",
    CANCELED: "status-cancelled",
    ABSENT: "status-pending",
  }[status];

  return (
    <span className={`${statusClass} ${className}`}>
      {statusLabels[status]}
    </span>
  );
};
