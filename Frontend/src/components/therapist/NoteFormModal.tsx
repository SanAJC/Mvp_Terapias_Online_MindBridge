import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, FileText, CalendarCheck } from "lucide-react";
import type { Patient, Session, ClinicalNote } from "@/types";

interface NoteFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient: Patient;
  therapistName: string;
  sessions: Session[];
  onSave: (note: ClinicalNote) => void;
}

export const NoteFormModal = ({ open, onOpenChange, patient, therapistName, sessions, onSave }: NoteFormModalProps) => {
  const [content, setContent] = useState("");
  const [selectedSession, setSelectedSession] = useState<string>("");

  const initials = patient.name.split(" ").map(n => n[0]).join("").slice(0, 2);

  const patientSessions = sessions.filter(
    (s) => s.patientName.toLowerCase().includes(patient.name.split(" ")[0].toLowerCase())
  );

  const handleSave = () => {
    if (!content.trim()) return;
    const session = patientSessions.find(s => s.id === selectedSession);
    onSave({
      id: crypto.randomUUID(),
      patientId: patient.id,
      patientName: patient.name,
      therapistName,
      sessionId: selectedSession || undefined,
      sessionLabel: session ? `Sesión ${session.date} (${session.startTime})` : undefined,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    });
    setContent("");
    setSelectedSession("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={18} className="text-accent" />
            Nueva Nota Evolutiva
          </DialogTitle>
        </DialogHeader>

        {/* Identification header */}
        <div className="bg-secondary/50 rounded-lg p-4 space-y-3 border border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-accent/10 text-accent font-semibold text-sm">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Paciente</p>
              <p className="font-semibold text-foreground">{patient.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Terapeuta</p>
              <p className="font-semibold text-foreground">{therapistName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-status-completed/10 flex items-center justify-center">
              <CalendarCheck size={16} className="text-status-completed" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Sesión Asociada</p>
              <Select value={selectedSession} onValueChange={setSelectedSession}>
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue placeholder="Seleccionar sesión (opcional)" />
                </SelectTrigger>
                <SelectContent>
                  {patientSessions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.date} — {s.startTime} ({s.status})
                    </SelectItem>
                  ))}
                  {patientSessions.length === 0 && (
                    <SelectItem value="none" disabled>Sin sesiones</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Contenido de la nota</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe las observaciones clínicas, avances, intervenciones realizadas..."
            className="min-h-[160px] resize-none"
          />
        </div>

        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-secondary transition-colors">
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Guardar Nota
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
