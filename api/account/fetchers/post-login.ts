import { accountClient } from "@/api/client";
import { LoginRequest } from "@/types/account";

export const postLogin = async (data: LoginRequest) => {
  try {
    console.log(data);
    const response = await accountClient.post("/api/login", data);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log("Server response:", error.response.data);
      return error.response.data; // success=false, message 포함
    }
    console.log(error);
    throw error;
  }
};
