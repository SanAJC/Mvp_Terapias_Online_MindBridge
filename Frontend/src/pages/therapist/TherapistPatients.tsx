import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/animations/PageTransition";
import { PatientCard } from "@/components/shared/PatientCard";
import { NoteFormModal } from "@/components/therapist/NoteFormModal";
import { ClinicalHistoryModal } from "@/components/therapist/ClinicalHistoryModal";
import { SessionFormModal } from "@/components/coordinator/SessionFormModal";
import { AddPatientModal } from "@/components/therapist/AddPatientModal";
import { Grid3X3, List, UserPlus, ArrowRight } from "lucide-react";
import type { PatientTherapist, ClinicalNote, Session, SessionFormData } from "@/types";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useTherapistsApi } from "@/connections/api/therapists";
import { useSessionsApi } from "@/connections/api/sessions";

const TherapistPatients = () => {
  const { user } = useAuth();
  const { getTherapistPatients, getTherapistSessions, addPatient } = useTherapistsApi();
  const { createSession } = useSessionsApi();
  const [patients, setPatients] = useState<PatientTherapist[]>([]);
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const [addPatientOpen, setAddPatientOpen] = useState(false);

  // Note modal
  const [noteOpen, setNoteOpen] = useState(false);
  const [notePatient, setNotePatient] = useState<PatientTherapist | null>(null);

  // History modal
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyPatient, setHistoryPatient] = useState<PatientTherapist | null>(null);

  // Session modal
  const [sessionOpen, setSessionOpen] = useState(false);
  const [sessionPatient, setSessionPatient] = useState<PatientTherapist | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ptData, stData] = await Promise.all([
        getTherapistPatients(user.id),
        getTherapistSessions(user.id)
      ]);
      setPatients(ptData);
      setSessions(stData);
    } catch (err) {
      toast.error("Error al cargar pacientes y sesiones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user?.id]);

  const handleAddPatientSubmit = async (patientId: string) => {
    try {
      await addPatient({ therapistId: user.id, patientId });
      toast.success("Paciente añadido exitosamente");
      await loadData();
    } catch (err) {
      toast.error("Error al añadir el paciente.");
    }
  };

  const getNextSessionForPatient = (patientProfileId: string) => {
    const upcomingSessions = sessions
      .filter(s => s.status === "SCHEDULED" && s.patientId === patientProfileId)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    return upcomingSessions[0] || null;
  };

  const handleAddNote = (patient: PatientTherapist) => {
    setNotePatient(patient);
    setNoteOpen(true);
  };

  const handleViewHistory = (patient: PatientTherapist) => {
    setHistoryPatient(patient);
    setHistoryOpen(true);
  };

  const handleSchedule = (patient: PatientTherapist) => {
    setSessionPatient(patient);
    setSessionOpen(true);
  };

  const handleSaveNote = (note: ClinicalNote) => {
    setNotes((prev) => [...prev, note]);
    toast.success("Nota evolutiva guardada");
  };

  const handleSaveSession = async (formData: SessionFormData) => {
    try {
      await createSession(formData);
      toast.success("Sesión programada exitosamente");
      await loadData();
      setSessionOpen(false);
      setSessionPatient(null);
    } catch (err) {
      toast.error("Error al programar la sesión");
    }
  };

  return (
    <DashboardLayout
      role="THERAPIST"
      userName={user?.username || "Terapeuta"}
      userRole="Psicólogo"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp} className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mis Pacientes</h1>
              <p className="text-muted-foreground text-sm">Gestiona tu red de cuidado y el progreso clínico.</p>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-card rounded-md shadow-sm">
                <Grid3X3 size={14} /> Cuadrícula
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-muted-foreground rounded-md hover:bg-card/50 transition-colors">
                <List size={14} /> Lista
              </button>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Filtrar por:</span>
            {["Estado: Activos", "Tratamiento: Todos", "Fecha: Recientes"].map((filter) => (
              <button key={filter} className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
                {filter} ▾
              </button>
            ))}
            <span className="ml-auto text-sm text-accent font-medium">{patients.length} pacientes encontrados</span>
          </motion.div>

          {/* Patient grid */}
          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading ? (
              <p className="col-span-full py-8 text-center text-muted-foreground">Cargando pacientes...</p>
            ) : (
              patients.map((item) => (
                <PatientCard
                  key={item.id}
                  item={item}
                  nextSession={getNextSessionForPatient(item.patient.id)}
                  onAddNote={handleAddNote}
                  onViewHistory={handleViewHistory}
                  onSchedule={handleSchedule}
                />
              ))
            )}

            {/* New patient card */}
            <motion.div
              variants={fadeInUp}
              onClick={() => setAddPatientOpen(true)}
              className="rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center hover:border-accent/40 hover:bg-secondary/20 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                <UserPlus size={20} className="text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-foreground mb-1">Nuevo Paciente</h4>
              <p className="text-sm text-muted-foreground mb-3">Registra un nuevo ingreso terapéutico en el sistema.</p>
              <span className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
                Comenzar registro <ArrowRight size={14} />
              </span>
            </motion.div>
          </motion.div>

          {/* Pagination */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between mt-8 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">Mostrando <span className="font-semibold text-foreground">1 - {patients.length}</span> de <span className="font-semibold text-foreground">{patients.length}</span> pacientes</p>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg border border-border text-muted-foreground hover:bg-secondary transition-colors flex items-center justify-center">‹</button>
              <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded-lg border border-border text-muted-foreground hover:bg-secondary transition-colors flex items-center justify-center">›</button>
            </div>
          </motion.div>
        </motion.div>
      </PageTransition>

      {/* Modals */}
      {notePatient && (
        <NoteFormModal
          open={noteOpen}
          onOpenChange={setNoteOpen}
          patient={notePatient as any} // we will need to update NoteFormModal later to fix type differences
          therapistName={user?.username || "Terapeuta"}
          sessions={sessions}
          onSave={handleSaveNote}
        />
      )}

      {historyPatient && (
        <ClinicalHistoryModal
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          patient={historyPatient as any}
          notes={notes}
        />
      )}

      <AddPatientModal
        open={addPatientOpen}
        onOpenChange={setAddPatientOpen}
        onAdd={handleAddPatientSubmit}
      />

      <SessionFormModal
        open={sessionOpen}
        onOpenChange={(open) => {
          setSessionOpen(open);
          if (!open) setSessionPatient(null);
        }}
        session={null}
        prefilledTherapistId={user?.id}
        prefilledPatientId={sessionPatient?.patient.userId}
        onSave={handleSaveSession}
      />
    </DashboardLayout>
  );
};

export default TherapistPatients;
