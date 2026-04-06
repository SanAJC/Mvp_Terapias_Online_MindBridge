import { Route, Routes, Navigate } from "react-router-dom";

import NotFound from "../pages/NotFound.tsx";
import LandingPage from "../pages/LandingPage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import TherapistDashboard from "../pages/therapist/TherapistDashboard";
import TherapistSessions from "../pages/therapist/TherapistSessions";
import TherapistPatients from "../pages/therapist/TherapistPatients";

import CoordinatorDashboard from "../pages/coordinator/CoordinatorDashboard";
import CoordinatorSessions from "../pages/coordinator/CoordinatorSessions";
import CoordinatorUsers from "../pages/coordinator/CoordinatorUsers";
import CoordinatorReports from "../pages/coordinator/CoordinatorReports";

import PatientDashboard from "../pages/patient/PatientDashboard";
import PatientSessions from "../pages/patient/PatientSessions";
import PatientTherapists from "../pages/patient/PatientTherapists";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Therapist */}
            <Route path="/terapeuta" element={<TherapistDashboard />} />
            <Route path="/terapeuta/sesiones" element={<TherapistSessions />} />
            <Route path="/terapeuta/pacientes" element={<TherapistPatients />} />

            {/* Coordinator */}
            <Route path="/coordinador" element={<CoordinatorDashboard />} />
            <Route path="/coordinador/sesiones" element={<CoordinatorSessions />} />
            <Route path="/coordinador/directorio" element={<CoordinatorUsers />} />
            <Route path="/coordinador/analisis" element={<CoordinatorReports />} />

            {/* Patient */}
            <Route path="/paciente" element={<PatientDashboard />} />
            <Route path="/paciente/sesiones" element={<PatientSessions />} />
            <Route path="/paciente/terapeutas" element={<PatientTherapists />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}