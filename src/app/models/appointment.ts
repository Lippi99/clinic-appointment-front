export interface Appointment {
  id: string;
  dateSchedule: Date;
  timeSchedule: string;
  patientId: string;
  doctorId: string;
  createdAt: string;
  updatedAt: string;
  patient: {
    name: string;
    lastName: string;
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
  dateSchedule: string;
  timeSchedule: string;
}
