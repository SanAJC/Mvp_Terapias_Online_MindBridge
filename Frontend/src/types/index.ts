export type UserRole = "COORDINATOR" | "THERAPIST" | "PATIENT";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
}


export interface TherapistProfile {
  id: string;
  userId: string;
  user: User;
  specialization: string;
  patients: PatientTherapist[];
  sessions: Session[];
  clinicalNotes: ClinicalNote[];
  createdAt: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  user: User;
  dateOfBirth: string;
  phone: string;
  therapists: PatientTherapist[];
  sessions: Session[];
  notes: ClinicalNote[];
  createdAt: string;
}

export interface PatientTherapist {
  id: string;
  therapistId: string;
  patientId: string;
  therapist: TherapistProfile;
  patient: PatientProfile;
  createdAt: string;
}

export type SessionStatus = "scheduled" | "completed" | "cancelled" | "pending" | "in-progress";
export type SessionModality = "presencial" | "telemedicina";

export interface Session {
  id: string;
  therapistId: string;
  patientId: string;
  therapist: TherapistProfile;
  patient: PatientProfile;
  startTime: string;
  endTime: string;
  meetingLink: string;
  status: SessionStatus;
  notes: ClinicalNote[];
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  tag: string;
  tagColor: "green" | "red" | "blue" | "orange";
}

export interface ClinicalNote {
  id: string;
  patientId: string;
  patientName: string;
  therapistName: string;
  sessionId?: string;
  sessionLabel?: string;
  content: string;
  createdAt: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export type NotificationType = "reminder" | "cancellation" | "confirmation";
export type NotificationStatus = "sent" | "read" | "failed";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  status: NotificationStatus;
  sentAt: string;
}