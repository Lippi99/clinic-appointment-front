export interface SignUpValidationSchema {
  email: string;
  name: string;
  address: string;
  birth: Date;
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
  birth: Date;
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

export interface PatientData {
  patients: Patient[];
}
