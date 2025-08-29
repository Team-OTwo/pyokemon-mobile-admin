import { didClient } from "@/api/client";

export const fetchVerificationResult = async (presExId:string) => {
  try {
    console.log("polling "+presExId);
    const res = await didClient.get(`/api/verifications/${presExId}`);
    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
