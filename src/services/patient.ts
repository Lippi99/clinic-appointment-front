import { PatientLogin, SignUpValidationSchema } from "@/app/models/patient";
import { isAxiosError } from "axios";
import { api } from "./api";
import { getAPIClient } from "./axios";

export const createPatient = async (body: SignUpValidationSchema) => {
  try {
    await api.post<SignUpValidationSchema>("/patient/create", body);
  } catch (error) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw error;
    }
  }
};

// export const signInRequest = async ({ email, password }: PatientLogin) => {
//   const data = {
//     email,
//     password,
//   };

//   try {
//     const apiClient = getAPIClient();

//     const response = await apiClient.post<PatientLogin>("/doctor/login", data);

//     const { admin, id, password, email, token } = response.data;

//     let userAccount = {
//       email,
//       password,
//       admin,
//       id,
//     };

//     return {
//       userAccount,
//       token,
//     };
//   } catch (error) {}
// };
