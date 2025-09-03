import { didClient } from "@/api/client";
import { VerificationRequest, VerificationResponse } from "@/types/verification";

export const postVerification = async (
  data: VerificationRequest
): Promise<VerificationResponse> => {
  try {
    console.log(data);
    const response = await didClient.post("/api/verifications", data);
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log("Server response:", error.response.data);
      throw new Error(error.response.data.message || "Server error");
    }
    console.log(error);
    throw error;
  }
};
