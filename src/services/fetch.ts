import { parseCookies } from "nookies";

export const getAPIServer = (url: string, method: string, data: any) => {
  const { "doctor.auth": token } = parseCookies();

  const headers: { [key: string]: string } = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`http://localhost:4000${url}`, {
    headers,
    method,
    body: JSON.stringify(data),
  });
};
