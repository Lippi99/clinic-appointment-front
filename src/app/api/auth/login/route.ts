import { DoctorToken } from "@/app/models/doctor";
import { getAPIClient } from "@/services/axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const data = {
    email,
    password,
  };

  const apiClient = getAPIClient();

  try {
    console.log("foi");
    // const response = await apiClient.post<DoctorToken>("/doctor/login", data);
    // const { token } = response.data;

    // console.log(token);

    // return new Response(JSON.stringify({ message: "Authenticated" }), {
    //   headers: {
    //     "Set-Cookie": token,
    //   },
    // });
  } catch (error) {
    return NextResponse.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }
}
