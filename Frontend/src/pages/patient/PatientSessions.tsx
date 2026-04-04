import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp, fadeIn } from "@/components/animations/PageTransition";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Video, FileText, Clock, Filter, Award, TrendingUp, CheckCircle, UserX } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MiniCalendar } from "@/components/shared/MiniCalendar";
import { patientUpcomingSessions } from "@/data/patientMockData";
import { useState } from "react";

const filterOptions = ["Todas", "Presencial", "Online"];

const PatientSessions = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");

  return (
    <DashboardLayout
      role="patient"
      userName="Sofía Martínez"
      userRole="Plan Premium"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp} className="mb-2">
            <h1 className="text-2xl font-bold text-foreground">Gestión de Sesiones</h1>
            <p className="text-muted-foreground mt-1">Administra tus citas y revisa tu historial terapéutico.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left - sessions list */}
            <div className="lg:col-span-2 space-y-4">
              <motion.div variants={fadeInUp} className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Mis Próximas Sesiones</h2>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
                  <Filter size={16} className="text-muted-foreground" />
                </button>
              </motion.div>

              {patientUpcomingSessions.map((session) => (
                <motion.div
                  key={session.id}
                  variants={fadeInUp}
                  className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-accent/10 text-accent font-medium">
                          {session.therapistName === "Sesión no asignada" ? <UserX size={18} /> : session.therapistName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-foreground">{session.therapistName}</h4>
                        <p className="text-xs text-muted-foreground">{session.specialty}</p>
                      </div>
                    </div>
                    <StatusBadge status={session.status === "scheduled" ? "scheduled" : session.status === "completed" ? "completed" : "cancelled"} />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-lg text-xs font-medium">
                      <CalendarIcon size={13} />
                      {session.date}, {session.time}
                    </div>
                    <div className="flex items-center gap-1.5 bg-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-foreground">
                      <Video size={13} />
                      Sesión {session.modality === "online" ? "Online" : "Presencial"}
                    </div>
                    {session.status === "scheduled" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-status-active" />
                    )}
                  </div>

                  <div className="flex gap-3">
                    {session.canJoin && (
                      <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        <Video size={15} />
                        Unirse a videollamada
                      </button>
                    )}
                    {session.status === "scheduled" && (
                      <button className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                        Ver indicaciones
                      </button>
                    )}
                    {session.status === "completed" && (
                      <>
                        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                          <FileText size={14} />
                          Ver Notas de Resumen
                        </button>
                        <button className="text-sm text-accent font-medium hover:underline px-3">
                          Agendar de nuevo
                        </button>
                      </>
                    )}
                    {session.status === "cancelled" && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={13} />
                        {session.date} • {session.time}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <motion.div variants={fadeIn}>
                <MiniCalendar />
              </motion.div>

              {/* Filter */}
              <motion.div variants={fadeIn} className="bg-card rounded-xl border border-border p-5 shadow-sm">
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-3">Filtrar Sesiones</p>
                <div className="flex gap-2">
                  {filterOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeFilter === f
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Session summary */}
              <motion.div variants={fadeIn} className="brand-card-dark relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/[0.04]" />
                <div className="absolute top-4 right-4 opacity-[0.08]">
                  <Award size={36} />
                </div>
                <h3 className="text-lg font-bold mb-4">Resumen de Mis Sesiones</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs text-white/60">Sesiones totales</p>
                    <p className="text-2xl font-bold text-white">12</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-white/50">
                      <TrendingUp size={12} />
                      2 más que el mes pasado
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-xs text-white/60">Sesiones asistidas</p>
                    <p className="text-2xl font-bold text-white">10</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-white/50">
                      <CheckCircle size={12} />
                      83% de asistencia
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                    <Award size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Racha de bienestar</p>
                    <p className="text-xs text-white/60">¡Has asistido a 4 sesiones consecutivas!</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default PatientSessions;
