import { Doctor, DoctorCreate, DoctorUpdate } from "@/app/models/doctor";
import { api } from "./api";

export const listDoctors = async (name?: string): Promise<Doctor[]> => {
  let url = "/doctor/list";

  if (name) {
    url = `/doctor/list?name=${name}`;
  }

  const response = await api.get<Doctor[]>(url);
  return response.data;
};

export const createDoctor = async (
  doctor: DoctorCreate
): Promise<DoctorCreate> => {
  const response = await api.post<Doctor>("/doctor/create", doctor);
  return response.data;
};

export const listDoctor = async (id: string): Promise<Doctor> => {
  const response = await api.get<Doctor>(`/doctor/list/${id}`);
  return response.data;
};

export const updateDoctor = async (
  doctor: DoctorUpdate,
  id: string
): Promise<DoctorUpdate> => {
  const respnse = await api.patch<DoctorUpdate>(`/doctor/update/${id}`, doctor);
  return respnse.data;
};

export const deleteDoctor = async (id: string): Promise<void> => {
  const response = await api.delete(`/doctor/delete/${id}`);
  return response.data;
};
