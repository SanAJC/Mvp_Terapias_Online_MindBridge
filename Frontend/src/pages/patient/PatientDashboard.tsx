import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp, fadeIn } from "@/components/animations/PageTransition";
import { motion } from "framer-motion";
import { Calendar, Video, FileText, Users, Sparkles, MoreVertical, Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sessionHistory } from "@/data/patientMockData";
import { StatusBadge } from "@/components/shared/StatusBadge";

const PatientDashboard = () => {
  return (
    <DashboardLayout
      role="PATIENT"
      userName="Sofía Martínez"
      userRole="Plan Premium"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Welcome */}
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-3xl font-bold text-foreground leading-tight">
              Bienvenida de nuevo, Sofía.
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Tu viaje de restauración continúa hoy. Tómate un momento para respirar antes de que comience tu próxima sesión.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Próximas sesiones */}
              <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={20} className="text-accent" />
                    <h2 className="text-lg font-semibold text-foreground">Mis próximas sesiones</h2>
                  </div>
                  <button className="text-sm text-accent font-medium hover:underline">Ver calendario</button>
                </div>

                {/* Featured next session */}
                <div className="brand-card-dark mb-4 relative overflow-hidden">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/[0.04]" />
                  <div className="absolute top-4 right-4 opacity-[0.07]">
                    <Video size={44} />
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 border-2 border-white/20">
                      <AvatarFallback className="bg-white/20 text-white text-lg font-semibold">EV</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider text-white/60 font-semibold">A continuación</p>
                      <h3 className="text-xl font-bold text-white">Dra. Eleanor Vance</h3>
                      <div className="flex items-center gap-1.5 mt-1 text-white/70 text-sm">
                        <FileText size={14} />
                        Terapia Cognitivo-Conductual
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">Hoy, 4:30 PM</p>
                      <p className="text-sm text-white/60">Empieza en 45 minutos</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/20">
                      <Video size={16} />
                      Unirse a videollamada
                    </button>
                  </div>
                </div>

                {/* Secondary session */}
                <div className="bg-secondary/50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Calendar size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">Evaluación de Seguimiento</p>
                      <p className="text-xs text-muted-foreground">Jueves, 12 Oct • 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Profesional</p>
                      <p className="text-sm font-medium text-foreground">Dra. Eleanor Vance</p>
                    </div>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
                      <MoreVertical size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Bottom row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Self-reflection note */}
                <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-accent/[0.04]" />
                  <Sparkles size={32} className="absolute bottom-3 right-3 text-accent/[0.06]" />
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={18} className="text-accent" />
                    <h3 className="font-semibold text-foreground">Nota de autorreflexión</h3>
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "Quiero hablar sobre mis patrones de sueño durante esta sesión. Me he sentido más descansada últimamente."
                  </p>
                  <button className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
                    Editar nota →
                  </button>
                </motion.div>

                {/* My therapists */}
                <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/[0.03]" />
                  <Heart size={28} className="absolute top-3 right-3 text-accent/[0.06]" />
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={18} className="text-accent" />
                    <h3 className="font-semibold text-foreground">Mis Terapeutas</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Dra. Eleanor Vance", type: "Terapia Cognitiva", initials: "EV" },
                      { name: "Dr. Julián Rivas", type: "Psiquiatría General", initials: "JR" },
                    ].map((t) => (
                      <div key={t.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-accent/10 text-accent text-sm font-medium">{t.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-foreground">{t.name}</p>
                            <p className="text-xs text-muted-foreground">{t.type}</p>
                          </div>
                        </div>
                        <button className="text-xs text-accent font-medium hover:underline">Ver perfil</button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent hover:underline">
                    Explorar especialistas →
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Right column - Session history */}
            <motion.div variants={fadeIn} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-foreground">Historial de sesiones</h2>
              </div>
              <div className="space-y-4">
                {sessionHistory.map((item) => (
                  <div key={item.id} className="border-l-2 pl-4 py-1" style={{
                    borderColor: item.status === "completed" ? "hsl(var(--status-completed))" : "hsl(var(--status-cancelled))"
                  }}>
                    <div className="flex items-center justify-between mb-1">
                      <StatusBadge status={item.status === "completed" ? "completed" : "cancelled"} />
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.therapistName}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                Ver todo el historial
              </button>
            </motion.div>
          </div>
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default PatientDashboard;
