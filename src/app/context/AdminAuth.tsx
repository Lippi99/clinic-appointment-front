"use client";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { meAdmin, signInAdmin } from "@/services/admin";
import { ToastContainer, toast } from "react-toastify";
import { Admin } from "../models/admin";

interface AuthSignIn {
  email: string;
  password: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: AuthSignIn) => Promise<void>;
  errorMessageLogin: ReactElement;

  admin: Admin | null;
  ToastAdminAuth: typeof ToastContainer;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  const isAuthenticated = !!admin;
  const Router = useRouter();

  const { "admin.auth": token } = parseCookies();

  useEffect(() => {
    const retrieverAdmin = async () => {
      if (token) {
        const retrieveUserInformation = await meAdmin();
        if (retrieveUserInformation) {
          setAdmin(retrieveUserInformation);
        }
      }
    };
    retrieverAdmin();
  }, [token, Router]);

  const signIn = async ({ email, password }: AuthSignIn) => {
    try {
      const { token } = (await signInAdmin({ email, password })) || {};
      const expireToken = 60 * 60 * 24; // 24hr;
      if (token == undefined) {
        throw Error();
      }
      setCookie(undefined, "admin.auth", `${token}`, {
        maxAge: expireToken,
      });
      setAdmin(admin);
      if (token) Router.push("/patients");
    } catch (error) {
      toast.error("Usuário ou senha inválida");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        errorMessageLogin: <p>Usuário ou senha incorretos</p>,

        admin,
        ToastAdminAuth: ToastContainer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
