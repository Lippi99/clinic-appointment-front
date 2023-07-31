"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import { useDoctorAuth } from "../../context/DoctorAuth";

type Props = {
  // props for the wrapped component
};

const withAuth = <P extends Props>(
  Component: ComponentType<P>
): ComponentType<P> => {
  const Auth = (props: P) => {
    const router = useRouter();
    const { isAuthenticated } = useDoctorAuth();

    // check if the user is authenticated and redirect them if necessary
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
