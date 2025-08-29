export interface VerificationRequest {
  bookingId: string;
  jwt: string;
}

export interface VerificationResponse{
  verify_invi_url:string;
  pres_ex_id:string;
}