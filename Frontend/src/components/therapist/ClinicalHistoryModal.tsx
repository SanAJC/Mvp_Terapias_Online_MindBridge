import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, CalendarCheck, Clock } from "lucide-react";
import type { Patient, ClinicalNote } from "@/types";

interface ClinicalHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
  notes: ClinicalNote[];
}

export const ClinicalHistoryModal = ({ open, onOpenChange, patient, notes }: ClinicalHistoryModalProps) => {
  const initials = patient.name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const patientNotes = notes
    .filter((n) => n.patientId === patient.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={18} className="text-accent" />
            Historial Clínico
          </DialogTitle>
        </DialogHeader>

        {/* Patient info */}
        <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-4 border border-border">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-accent/10 text-accent font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">{patient.therapyType} · {patient.focus}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">Total de notas</p>
            <p className="text-2xl font-bold text-accent">{patientNotes.length}</p>
          </div>
        </div>

        <ScrollArea className="h-[400px] pr-3">
          {patientNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <FileText size={40} className="mb-3 opacity-30" />
              <p className="text-sm font-medium">Sin notas registradas</p>
              <p className="text-xs">Añade la primera nota evolutiva para este paciente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {patientNotes.map((note) => (
                <div key={note.id} className="bg-card rounded-xl border border-border p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent rounded-l-xl" />
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
                    </div>
                    {note.sessionLabel && (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CalendarCheck size={10} />
                        {note.sessionLabel}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">— {note.therapistName}</p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
