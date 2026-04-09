import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/animations/PageTransition";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, FileText, Users, ArrowRight, Stethoscope } from "lucide-react";
import { todaySessions } from "@/data/mockData";
import { Link } from "react-router-dom";

const TherapistDashboard = () => {
  return (
    <DashboardLayout
      role="THERAPIST"
      userName="Dr. Alejandro M."
      userRole="Terapeuta Senior"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Welcome */}
          <motion.div variants={fadeInUp} className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">Bienvenido de nuevo, Dr. Aris</p>
            <h1 className="text-3xl font-bold text-foreground mb-2">Su Resumen Clínico</h1>
            <p className="text-muted-foreground max-w-lg">
              Concéntrese en sus pacientes mientras MindBrige se encarga de la logística. Tiene 6 sesiones restantes hoy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2">
              {/* Today's sessions */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Sesiones de hoy</h2>
                  <Link to="/terapeuta/sesiones" className="text-sm text-accent font-medium hover:underline flex items-center gap-1">
                    Ver horario completo <ArrowRight size={14} />
                  </Link>
                </div>

                <div className="space-y-3">
                  {todaySessions.map((session) => {
                    const initials = session.patientName.split(" ").map(n => n[0]).join("").slice(0, 2);
                    return (
                      <motion.div
                        key={session.id}
                        variants={fadeInUp}
                        className={`bg-card rounded-xl border p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow ${
                          session.status === "scheduled" ? "border-accent border-2" : "border-border"
                        }`}
                      >
                        <Avatar className="w-14 h-14">
                          <AvatarFallback className="bg-muted text-muted-foreground font-medium">{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-sm">{session.patientName}</h4>
                            {session.status === "scheduled" && (
                              <span className="status-scheduled text-[10px]">SIGUIENTE</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><Clock size={12} /> {session.startTime} - {session.endTime}</span>
                            <span className={`status-badge text-[10px] uppercase ${session.modality === "presencial" ? "bg-status-active/10 text-status-active" : "bg-accent/10 text-accent"}`}>
                              {session.modality}
                            </span>
                          </div>
                        </div>
                        <button className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${
                          session.status === "in-progress"
                            ? "bg-primary text-primary-foreground hover:opacity-90"
                            : session.status === "scheduled"
                            ? "border border-border hover:bg-secondary"
                            : "border border-border text-muted-foreground hover:bg-secondary"
                        }`}>
                          {session.status === "in-progress" ? "Iniciar sesión" :
                           session.status === "scheduled" ? "Preparar notas" : "En espera"}
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-4">
              {/* Stats summary */}
              <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-5 shadow-sm flex gap-6">
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Notas Evolutivas</p>
                </div>
                <div className="w-px bg-border" />
                <div className="text-center flex-1">
                  <p className="text-2xl font-bold text-foreground">42</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Total de Pacientes</p>
                </div>
              </motion.div>

              {/* Notes card */}
              <motion.div variants={fadeInUp} className="brand-card-dark relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/[0.04]" />
                <div className="absolute top-4 right-4 opacity-[0.08]">
                  <FileText size={40} />
                </div>
                <FileText size={24} className="mb-3 opacity-80" />
                <p className="text-3xl font-bold mb-1">12</p>
                <p className="text-xs uppercase tracking-widest opacity-70 font-semibold mb-4">Notas Evolutivas</p>
                <button className="w-full py-2.5 border border-primary-foreground/30 rounded-lg text-sm font-medium hover:bg-primary-foreground/10 transition-colors">
                  Completar ahora
                </button>
              </motion.div>

              {/* Patients card */}
              <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-5 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-accent/[0.04]" />
                <Stethoscope size={36} className="absolute bottom-3 right-3 text-accent/[0.06]" />
                <Users size={24} className="text-muted-foreground mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">42</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Total de Pacientes</p>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {["AT", "EV", "MH"].map((init) => (
                      <Avatar key={init} className="w-8 h-8 border-2 border-card">
                        <AvatarFallback className="bg-muted text-[10px] font-medium">{init}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">+39</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default TherapistDashboard;
