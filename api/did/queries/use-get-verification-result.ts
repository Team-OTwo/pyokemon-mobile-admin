import { useQuery } from "@tanstack/react-query";
import { fetchVerificationResult } from "../fetchers/get-verification-result";

export const useGetVerificationResult = (
  presExId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  }
) => {
  return useQuery({
    queryKey: ["verificationResult", presExId],
    queryFn: () => fetchVerificationResult(presExId),
    enabled: options?.enabled,
    refetchInterval: options?.refetchInterval,
  });
};
