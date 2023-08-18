import {
  Appointment,
  CreateAppointment,
  UpdateAppointment,
} from "@/app/models/appointment";
import { api } from "./api";

export const createAppointment = async (data: CreateAppointment) => {
  const response = await api.post("/appointment/create", data);
  return response.data;
};

export const listAppointments = async (searchAppointment: string) => {
  let url = "/appointment/list";

  if (searchAppointment) {
    url = `/appointment/list?name=${searchAppointment}`;
  }

  const response = await api.get<Appointment[]>(url);
  return response.data;
};

export const deleteAppointment = async (id: string) => {
  const response = await api.delete(`/appointment/delete/${id}`);
  return response.data;
};

export const updateAppointment = async (
  data: UpdateAppointment,
  id: string
) => {
  const response = await api.patch(`/appointment/update/${id}`, data);
  return response.data;
};

export const listAppointmentById = async (id: string) => {
  const response = await api.get<Appointment>(`/appointment/list/${id}`);
  return response.data;
};
