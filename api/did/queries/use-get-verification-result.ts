import { useQuery } from "@tanstack/react-query"
import { fetchVerificationResult } from "../fetchers/get-verification-result"

export const useGetVerificationResult = (presExId: string) => {
  return useQuery({
    queryKey: ["verificationResult", presExId],
    queryFn: () => fetchVerificationResult(presExId),
  })
}
