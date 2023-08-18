import { Patient, SignUpValidationSchema } from "@/app/models/patient";
import { isAxiosError } from "axios";
import { api } from "./api";
import { getAPIServer } from "./fetch";

export const createPatient = async (body: SignUpValidationSchema) => {
  try {
    const res = await api.post<SignUpValidationSchema>("/patient/create", body);
    return res;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const listPatient = async (patientName: string): Promise<Patient[]> => {
  try {
    let url = `/patient/list`;
    if (patientName) {
      url = `/patient/list?name=${patientName}`;
    }

    const response = await api.get<Patient[]>(url);
    if (!response.data) {
      throw new Error("No data found");
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

export const listPatientById = async (id: string): Promise<Patient> => {
  const response = await api.get<Patient>(`/patient/list/${id}`);
  return response.data;
};

export const updatePatientById = async (body: Patient, id: string) => {
  const response = await api.patch<Patient>(`/patient/update/${id}`, body);
  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await api.delete<Patient>(`/patient/delete/${id}`);
  return response.data;
};
