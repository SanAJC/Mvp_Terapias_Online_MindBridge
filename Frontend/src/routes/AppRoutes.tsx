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

import { permissionRole} from "./ProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />

            {/* Therapist */}
            <Route path="/terapeuta" element={
                permissionRole("therapist") ? (
                <ProtectedRoute>
                    <TherapistDashboard />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/terapeuta/sesiones" element={
                permissionRole("therapist") ? (
                <ProtectedRoute>
                    <TherapistSessions />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/terapeuta/pacientes" element={
                permissionRole("therapist") ? (
                <ProtectedRoute>
                    <TherapistPatients />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />

            {/* Coordinator */}
            <Route path="/coordinador" element={
                permissionRole("coordinator") ? (
                <ProtectedRoute>
                    <CoordinatorDashboard />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/coordinador/sesiones" element={
                permissionRole("coordinator") ? (
                <ProtectedRoute>
                    <CoordinatorSessions />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/coordinador/directorio" element={
                permissionRole("coordinator") ? (
                <ProtectedRoute>
                    <CoordinatorUsers />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/coordinador/analisis" element={
                permissionRole("coordinator") ? (
                <ProtectedRoute>
                    <CoordinatorReports />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />

            {/* Patient */}
            <Route path="/paciente" element={
                permissionRole("patient") ? (
                <ProtectedRoute>
                    <PatientDashboard />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/paciente/sesiones" element={
                permissionRole("patient") ? (
                <ProtectedRoute>
                    <PatientSessions />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />
            <Route path="/paciente/terapeutas" element={
                permissionRole("patient") ? (
                <ProtectedRoute>
                    <PatientTherapists />
                </ProtectedRoute>
                ) : (
                    <Navigate to="/" />
                )
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}