import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PageTransition, staggerContainer, fadeInUp } from "@/components/animations/PageTransition";
import { BarChart3, Download, Search, History, Users, Shield, SlidersHorizontal, FileBarChart } from "lucide-react";

const CoordinatorReports = () => {
  return (
    <DashboardLayout
      role="coordinator"
      userName="Dr. Julián Rivas"
      userRole="Coordinador de Terapia"
    >
      <PageTransition>
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div variants={fadeInUp} className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">Informes y Análisis Administrativo</h1>
                <p className="text-muted-foreground max-w-lg">
                  Transforma la actividad clínica en decisiones estratégicas. Nuestra herramienta de análisis permite visualizar el rendimiento de tu centro con precisión editorial.
                </p>
              </motion.div>

              {/* Report config */}
              <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-muted-foreground" />
                    <h2 className="font-semibold text-foreground">Configuración de Reporte</h2>
                  </div>
                  <button className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
                    Filtros Inteligentes
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Rango de Fecha</label>
                    <button className="w-full px-3 py-2.5 border border-border rounded-lg text-sm text-left flex items-center justify-between hover:bg-secondary/50 transition-colors">
                      Últimos 30 días <span className="text-muted-foreground">📅</span>
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Terapeuta</label>
                    <button className="w-full px-3 py-2.5 border border-border rounded-lg text-sm text-left hover:bg-secondary/50 transition-colors">
                      Todos los especialistas
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Paciente</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input placeholder="Buscar por nombre..." className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">Filtra tus datos para obtener una visión detallada del flujo terapéutico.</p>
                  <button className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-secondary transition-colors font-medium">Limpiar</button>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div variants={fadeInUp} className="space-y-5">
                {[
                  { icon: <History size={22} className="text-accent" />, title: "Histórico por Paciente", desc: "Analiza la evolución de asistencia y progreso de cada paciente de forma individualizada para informes de derivación." },
                  { icon: <Users size={22} className="text-status-cancelled" />, title: "Productividad del Terapeuta", desc: "Calcula automáticamente las horas de consulta efectivas y el ratio de cancelaciones por cada miembro de tu equipo." },
                  { icon: <Shield size={22} className="text-accent" />, title: "Privacidad y Seguridad", desc: "Todas las exportaciones cumplen con los estándares de protección de datos clínicos, anonimizando información sensible según el perfil del usuario." },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right */}
            <div className="space-y-4">
              <motion.div variants={fadeInUp} className="bg-card rounded-xl border border-border p-5 shadow-sm flex items-center gap-4">
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart3 size={22} className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Estado del Sistema</p>
                  <p className="font-bold text-foreground">Datos Actualizados</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="brand-card-dark relative overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/[0.04]" />
                <div className="absolute top-4 right-4 opacity-[0.08]">
                  <FileBarChart size={36} />
                </div>
                <Download size={24} className="mb-3 opacity-80" />
                <h3 className="text-lg font-bold mb-2">Exportación Directa</h3>
                <p className="text-sm opacity-70 mb-4">
                  Genera archivos CSV compatibles con Excel para tu contabilidad o análisis externo.
                </p>
                <button className="w-full py-2.5 border border-primary-foreground/30 rounded-lg text-sm font-medium hover:bg-primary-foreground/10 transition-colors flex items-center justify-center gap-2">
                  <Download size={14} /> Exportar a Excel (CSV)
                </button>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-accent/5 rounded-xl border border-accent/20 p-5 shadow-sm">
                <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Consejo de gestión</p>
                <p className="text-sm text-foreground italic">
                  "Utiliza el filtro de rango trimestral para detectar patrones estacionales en las solicitudes de nuevas terapias."
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </PageTransition>
    </DashboardLayout>
  );
};

export default CoordinatorReports;
