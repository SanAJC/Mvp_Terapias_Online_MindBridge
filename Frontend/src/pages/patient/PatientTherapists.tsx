import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/animations/PageTransition";
import { motion } from "framer-motion";
import { Calendar, Clock, Star, ArrowRight, Stethoscope } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { assignedTherapists, exploreTherapists } from "@/data/patientMockData";

const PatientTherapists = () => {
  return (
    <DashboardLayout
      role="patient"
      userName="Sofía Martínez"
      userRole="Plan Premium"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <motion.div variants={fadeInUp} className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Mis Terapeutas</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Continúa tu camino de bienestar con el apoyo de tus profesionales asignados. Aquí puedes gestionar tus sesiones y revisar tu progreso.
            </p>
          </motion.div>

          {/* Assigned therapists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {assignedTherapists.map((therapist) => {
              const initials = therapist.name.split(" ").filter(n => n.length > 2).map(n => n[0]).join("").slice(0, 2);
              return (
                <motion.div
                  key={therapist.id}
                  variants={fadeInUp}
                  className="bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-accent/[0.04]" />
                  <Stethoscope size={36} className="absolute bottom-4 right-4 text-accent/[0.06]" />
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-accent/10 text-accent text-xl font-semibold">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-foreground">{therapist.name}</h3>
                        {therapist.status === "active" && (
                          <span className="status-active text-[10px]">ACTIVO</span>
                        )}
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{therapist.specialty}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{therapist.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    {therapist.nextSession ? (
                      <>
                        <Calendar size={15} className="text-accent" />
                        <span>Próxima sesión: {therapist.nextSession}</span>
                      </>
                    ) : (
                      <>
                        <Clock size={15} className="text-accent" />
                        <span>Disponible para agendar</span>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Agendar Cita
                    </button>
                    <button className="flex-1 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                      Ver Perfil
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Explore specialists */}
          <motion.div variants={fadeInUp}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl font-bold text-foreground">Explorar Especialistas</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Basado en tus objetivos de salud y preferencias.</p>
              </div>
              <button className="flex items-center gap-1 text-sm text-accent font-medium hover:underline">
                Ver todos <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {exploreTherapists.map((t) => {
              const initials = t.name.split(" ").filter(n => n.length > 2).map(n => n[0]).join("").slice(0, 2);
              return (
                <motion.div
                  key={t.id}
                  variants={fadeInUp}
                  className="bg-card rounded-xl border border-border p-5 text-center shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-accent/[0.04]" />
                  <div className="relative inline-block mb-3">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-accent/10 text-accent font-semibold text-lg">{initials}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-status-active border-2 border-card" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{t.name}</h4>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mt-0.5">{t.specialty}</p>
                  <div className="flex items-center justify-center gap-1 mt-2 text-xs">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{t.rating}</span>
                    <span className="text-muted-foreground">({t.reviews} reseñas)</span>
                  </div>
                  <button className="w-full mt-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                    Ver Perfil
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default PatientTherapists;
