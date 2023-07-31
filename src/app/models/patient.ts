export interface SignUpValidationSchema {
  email: string;
  password: string;
  name: string;
  address: string;
  date: string;
  lastName: string;
  region: string;
}

export interface PatientLogin {
  email: string;
  password: string;
}
