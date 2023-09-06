export interface DoctorCreate {
  id: string;
  name: string;
  email: string;
  role: string;
  specializationId: string;
}

export interface DoctorUpdate {
  id: string;
  name: string;
  email: string;
  role: string;
  specializationId: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  role: string;
  specializationId: string;
  specialization: Specialization;
}

export interface Specialization {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DoctorLogin {
  email: string;
  password: string;
}

export interface DoctorToken {
  token: string;
}
