// 네비게이션 타입 정의
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  MyPage: undefined;
  Detail: { eventId: string };
  ScanLog: { eventId: string };
  ChallengeQr: undefined;
  TicketQR: { ticketId: string };
};