import { parseCookies } from "nookies";

export const getAPIServer = (url: string, method: string, data: any) => {
  const { "admin.auth": token } = parseCookies();

  const headers: { [key: string]: string } = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers,
    method,
    body: JSON.stringify(data),
  });
};
