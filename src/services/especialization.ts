import {
  CreateEspecialization,
  Especialization,
} from "@/app/models/especialization";
import { api } from "./api";
import { isAxiosError } from "axios";

export const createEspecialization = async ({
  name,
}: CreateEspecialization): Promise<Especialization> => {
  const response = await api.post<Especialization>("/specialization/create", {
    name,
  });
  return response.data;
};

export const listEspecializations = async (): Promise<Especialization[]> => {
  try {
    const response = await api.get<Especialization[]>("/specialization/list");
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

export const listEspecializationsById = async (
  id: string
): Promise<Especialization> => {
  const response = await api.get<Especialization>(`/specialization/list/${id}`);
  return response.data;
};

export const deleteEspecialization = async (id: string): Promise<void> => {
  const response = await api.delete(`/specialization/delete/${id}`);
  return response.data;
};
