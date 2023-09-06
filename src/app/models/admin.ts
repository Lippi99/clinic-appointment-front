export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  specializationId: string;
}

export interface AdminLogin {
  email: string;
  password: string;
}

export interface AdminToken {
  token: string;
}
