export interface SignUpValidationSchema {
  email: string;
  name: string;
  address: string;
  birth: string;
  date: string;
  lastName: string;
  region: string;
}

export interface PatientLogin {
  email: string;
  password: string;
}

export interface Patient {
  address: string;
  birth: string;
  createdAt?: string;
  email: string;
  id?: string;
  lastName: string;
  name: string;
  password?: string;
  region: string;
  role?: string;
  updatedAt?: string;
}
