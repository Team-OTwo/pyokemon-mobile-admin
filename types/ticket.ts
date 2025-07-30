export type Ticket = {
  id: string;
  title: string;
  date: string;
  venue: string;
  status: "입장" | "실패";
  genre: string;
  enterTime:string;
  name:string;
  seat:string;
};
