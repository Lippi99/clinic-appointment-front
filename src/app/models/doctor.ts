export interface Doctor {
  id: string;
  name: string;
  email: string;
  role: string;
  specializationId: string;
}

export interface DoctorLogin {
  email: string;
  password: string;
}

export interface DoctorToken {
  token: string;
}
