import { Doctor, DoctorLogin, DoctorToken } from "@/app/models/doctor";
import { getAPIClient } from "./axios";
import { api } from "./api";

export const signInDoctor = async ({ email, password }: DoctorLogin) => {
  const data = {
    email,
    password,
  };

  try {
    const apiClient = getAPIClient();

    const response = await apiClient.post<DoctorToken>("/doctor/login", data);

    const { token } = response.data;

    let userAccount = {
      email,
      password,
    };

    return {
      userAccount,
      token,
    };
  } catch (error) {}
};

export const meDoctor = async () => {
  const apiClient = getAPIClient();
  try {
    const response = await apiClient.get<Doctor | undefined>("/doctor/me");

    return response.data;
  } catch (error) {}
};

export const listDoctors = async (): Promise<Doctor[]> => {
  const response = await api.get<Doctor[]>("/doctor/list");
  return response.data;
};
