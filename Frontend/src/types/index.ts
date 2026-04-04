export type UserRole = "coordinator" | "therapist" | "patient";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  status: "active" | "suspended" | "inactive";
}

export type SessionStatus = "scheduled" | "completed" | "cancelled" | "pending" | "in-progress";
export type SessionModality = "presencial" | "telemedicina";

export interface Session {
  id: string;
  patientName: string;
  patientAvatar?: string;
  therapistName?: string;
  status: SessionStatus;
  modality: SessionModality;
  date: string;
  startTime: string;
  endTime: string;
  sessionNumber?: number;
  therapyType?: string;
  focus?: string;
  zoomLink?: string;
}

export interface Patient {
  id: string;
  name: string;
  avatar?: string;
  therapyType: string;
  nextSession?: string;
  lastSession?: string;
  focus?: string;
  status: "active" | "suspended" | "inactive";
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
