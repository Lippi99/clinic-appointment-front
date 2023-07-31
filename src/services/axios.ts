import axios from "axios";
import { parseCookies } from "nookies";
export const getAPIClient = (ctx?: any) => {
  const { "doctor.auth": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "http://localhost:4000",
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
  return api;
};
