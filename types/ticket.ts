export type Ticket = {
  id: string;
  title: string;
  date: string;
  venue: string;
  issuer: string;
  status: "입장중" | "입장전";
  genre: string;
};
