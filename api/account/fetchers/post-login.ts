import { accountClient } from "@/api/client";
import { LoginRequest } from "@/types/account";

export const postLogin = async (data: LoginRequest) => {
  try {
    console.log(data);
    const response = await accountClient.post("/api/login", data);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
