import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Session, SessionStatus, SessionModality } from "@/types";
import { CalendarPlus, Pencil } from "lucide-react";

interface SessionFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session?: Session | null;
  onSave: (session: Session) => void;
}

const emptySession: Omit<Session, "id"> = {
  patientName: "",
  therapistName: "",
  status: "scheduled",
  modality: "presencial",
  date: "",
  startTime: "",
  endTime: "",
  therapyType: "",
};

export const SessionFormModal = ({ open, onOpenChange, session, onSave }: SessionFormModalProps) => {
  const isEdit = !!session;
  const [form, setForm] = useState<Omit<Session, "id">>(emptySession);

  useEffect(() => {
    if (session) {
      const { id, ...rest } = session;
      setForm(rest);
    } else {
      setForm(emptySession);
    }
  }, [session, open]);

  const handleSave = () => {
    onSave({
      id: session?.id || crypto.randomUUID(),
      ...form,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {isEdit ? <Pencil size={18} className="text-accent" /> : <CalendarPlus size={18} className="text-accent" />}
            <DialogTitle>{isEdit ? "Editar Sesión" : "Nueva Sesión"}</DialogTitle>
          </div>
          <DialogDescription>
            {isEdit ? "Modifica los datos de la sesión." : "Completa los datos para programar una nueva sesión."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="patientName">Paciente</Label>
              <Input id="patientName" placeholder="Nombre del paciente" value={form.patientName} onChange={(e) => setForm({ ...form, patientName: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="therapistName">Terapeuta</Label>
              <Input id="therapistName" placeholder="Nombre del terapeuta" value={form.therapistName || ""} onChange={(e) => setForm({ ...form, therapistName: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="startTime">Inicio</Label>
              <Input id="startTime" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endTime">Fin</Label>
              <Input id="endTime" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Modalidad</Label>
              <Select value={form.modality} onValueChange={(v) => setForm({ ...form, modality: v as SessionModality })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="telemedicina">Telemedicina</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as SessionStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Programada</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="therapyType">Tipo de terapia (opcional)</Label>
            <Input id="therapyType" placeholder="Ej: TCC, Psicoanálisis..." value={form.therapyType || ""} onChange={(e) => setForm({ ...form, therapyType: e.target.value })} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!form.patientName || !form.date}>
            {isEdit ? "Guardar cambios" : "Crear sesión"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
