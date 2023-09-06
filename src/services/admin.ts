import { Admin, AdminLogin, AdminToken } from "@/app/models/admin";
import { getAPIClient } from "./axios";

export const signInAdmin = async ({ email, password }: AdminLogin) => {
  const data = {
    email,
    password,
  };
  const apiClient = getAPIClient();

  const response = await apiClient.post<AdminToken>("/admin/login", data);

  const { token } = response.data;

  let userAccount = {
    email,
    password,
  };

  return {
    userAccount,
    token,
  };
};

export const meAdmin = async () => {
  const apiClient = getAPIClient();
  try {
    const response = await apiClient.get<Admin | undefined>("/admin/me");
    return response.data;
  } catch (error) {}
};
