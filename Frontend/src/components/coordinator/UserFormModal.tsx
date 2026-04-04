import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { User, UserRole } from "@/types";
import { UserPlus, Pencil } from "lucide-react";

interface UserFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSave: (user: User) => void;
}

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "patient" as UserRole,
  status: "active" as "active" | "suspended" | "inactive",
};

export const UserFormModal = ({ open, onOpenChange, user, onSave }: UserFormModalProps) => {
  const isEdit = !!user;
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (user) {
      const { id, ...rest } = user;
      setForm({ ...emptyForm, ...rest, password: "" });
    } else {
      setForm(emptyForm);
    }
  }, [user, open]);

  const handleSave = () => {
    onSave({
      id: user?.id || crypto.randomUUID(),
      name: form.name,
      email: form.email,
      role: form.role,
      status: form.status,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {isEdit ? <Pencil size={18} className="text-accent" /> : <UserPlus size={18} className="text-accent" />}
            <DialogTitle>{isEdit ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
          </div>
          <DialogDescription>
            {isEdit ? "Modifica la información del usuario." : "Completa los datos para registrar un nuevo usuario."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="userName">Nombre completo</Label>
            <Input id="userName" placeholder="Nombre y apellido" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="userEmail">Correo electrónico</Label>
            <Input id="userEmail" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="userPassword">{isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}</Label>
            <Input id="userPassword" type="password" placeholder={isEdit ? "Dejar vacío para mantener" : "Mínimo 6 caracteres"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Rol</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v as UserRole })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="therapist">Terapeuta</SelectItem>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="coordinator">Coordinador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as "active" | "suspended" | "inactive" })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="suspended">Suspendido</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave} disabled={!form.name || !form.email || (!isEdit && form.password.length < 6)}>
            {isEdit ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
