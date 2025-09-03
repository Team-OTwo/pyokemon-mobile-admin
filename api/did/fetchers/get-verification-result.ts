import { didClient } from "@/api/client";

export const fetchVerificationResult = async (presExId:string, booking_id:string) => {
  try {
    console.log(booking_id);
    console.log("polling "+presExId);
    const res = await didClient.get(`/api/verifications/${presExId}`, {
      params: { booking_id: booking_id },
    });
    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
    // return null;
    throw error;
  }
};
