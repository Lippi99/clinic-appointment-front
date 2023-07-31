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
import { api } from "@/services/api";
import { meDoctor, signInDoctor } from "@/services/doctor";
import { Doctor } from "../models/doctor";
import { ToastContainer, toast } from "react-toastify";

interface AuthSignIn {
  email: string;
  password: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: AuthSignIn) => Promise<void>;
  errorMessageLogin: ReactElement;
  isLoading: boolean;
  doctor: Doctor | null;
  ToastDoctorAuth: typeof ToastContainer;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsloading] = useState(false);

  const isAuthenticated = !!doctor;
  const Router = useRouter();

  const { "doctor.auth": token } = parseCookies();

  useEffect(() => {
    const retrieveUser = async () => {
      if (token) {
        const retrieveUserInformation = await meDoctor();
        if (retrieveUserInformation) {
          setDoctor(retrieveUserInformation);
          Router.push("/home");
        }
      }
    };
    retrieveUser();
  }, [token]);

  const signIn = async ({ email, password }: AuthSignIn) => {
    setIsloading(true);
    try {
      const { token } = (await signInDoctor({ email, password })) || {};
      const expireToken = 60 * 60 * 1; // 1 hour
      if (token == undefined) {
        throw Error();
      }
      setCookie(undefined, "doctor.auth", `${token}`, {
        maxAge: expireToken,
      });
      setDoctor(doctor);
      // api.defaults.headers["Authorization"] = `Bearer ${token}`;
      if (token) Router.push("/home");
      setIsloading(false);
    } catch (error) {
      toast.error("Usuário ou senha inválida");
      setIsloading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        errorMessageLogin: <p>Usuário ou senha incorretos</p>,
        isLoading,
        doctor,
        ToastDoctorAuth: ToastContainer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useDoctorAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
