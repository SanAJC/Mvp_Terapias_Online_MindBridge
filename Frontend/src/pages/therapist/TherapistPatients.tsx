import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/animations/PageTransition";
import { PatientCard } from "@/components/shared/PatientCard";
import { NoteFormModal } from "@/components/therapist/NoteFormModal";
import { ClinicalHistoryModal } from "@/components/therapist/ClinicalHistoryModal";
import { SessionFormModal } from "@/components/coordinator/SessionFormModal";
import { patients, therapistSessions } from "@/data/mockData";
import { Grid3X3, List, UserPlus, ArrowRight } from "lucide-react";
import type { Patient, ClinicalNote, Session } from "@/types";
import { toast } from "sonner";

const THERAPIST_NAME = "Dr. Alejandro V.";

const TherapistPatients = () => {
  const [notes, setNotes] = useState<ClinicalNote[]>([]);
  const [sessions, setSessions] = useState<Session[]>(therapistSessions);

  // Note modal
  const [noteOpen, setNoteOpen] = useState(false);
  const [notePatient, setNotePatient] = useState<Patient | null>(null);

  // History modal
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyPatient, setHistoryPatient] = useState<Patient | null>(null);

  // Session modal
  const [sessionOpen, setSessionOpen] = useState(false);

  const handleAddNote = (patient: Patient) => {
    setNotePatient(patient);
    setNoteOpen(true);
  };

  const handleViewHistory = (patient: Patient) => {
    setHistoryPatient(patient);
    setHistoryOpen(true);
  };

  const handleSchedule = (patient: Patient) => {
    setSessionOpen(true);
  };

  const handleSaveNote = (note: ClinicalNote) => {
    setNotes((prev) => [...prev, note]);
    toast.success("Nota evolutiva guardada");
  };

  const handleSaveSession = (session: Session) => {
    setSessions((prev) => [...prev, session]);
    toast.success("Sesión programada");
  };

  return (
    <DashboardLayout
      role="THERAPIST"
      userName={THERAPIST_NAME}
      userRole="Psicólogo Clínico"
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
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onAddNote={handleAddNote}
                onViewHistory={handleViewHistory}
                onSchedule={handleSchedule}
              />
            ))}

            {/* New patient card */}
            <motion.div
              variants={fadeInUp}
              className="rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center p-8 text-center hover:border-accent/40 transition-colors cursor-pointer"
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
          patient={notePatient}
          therapistName={THERAPIST_NAME}
          sessions={sessions}
          onSave={handleSaveNote}
        />
      )}

      {historyPatient && (
        <ClinicalHistoryModal
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          patient={historyPatient}
          notes={notes}
        />
      )}

      <SessionFormModal
        open={sessionOpen}
        onOpenChange={setSessionOpen}
        session={null}
        onSave={handleSaveSession}
      />
    </DashboardLayout>
  );
};

export default TherapistPatients;
