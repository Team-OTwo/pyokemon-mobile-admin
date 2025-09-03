import { useQuery } from "@tanstack/react-query";
import { fetchVerificationResult } from "../fetchers/get-verification-result";

export const useGetVerificationResult = (
  presExId: string,
  booking_id:string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  }
) => {
  return useQuery({
    queryKey: ["verificationResult", presExId, booking_id],
    queryFn: () => fetchVerificationResult(presExId, booking_id),
    enabled: options?.enabled,
    refetchInterval: options?.refetchInterval,
  });
};
