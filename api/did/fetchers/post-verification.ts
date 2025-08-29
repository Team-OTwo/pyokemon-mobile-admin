import { didClient } from "@/api/client";
import { VerificationRequest, VerificationResponse } from "@/types/verification";

export const postVerification = async (
  data: VerificationRequest
): Promise<VerificationResponse> => {
  try {
    console.log(data);
    const response = await didClient.post("/api/verifications", data);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log("Server response:", error.response.data);
      return error.response.data;
    }
    console.log(error);
    throw error;
  }
};
