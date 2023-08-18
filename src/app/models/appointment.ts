export interface Appointment {
  id: string;
  dateSchedule: string;
  timeSchedule: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
  patient: {
    name: string;
    role: string;
    email: string;
    address: string;
  };
  doctor: {
    name: string;
    role: string;
    specialization: {
      name: string;
    };
  };
}

export interface UpdateAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  dateSchedule: Date;
  timeSchedule: string;
}

export interface CreateAppointment {
  patientId: string;
  doctorId: string;
  dateSchedule: Date;
  timeSchedule: string;
}
