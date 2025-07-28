import { Ticket } from "@/types/ticket";

export const ticketSample: Ticket = {
  id: "1",
  title: "BTS 월드투어 2023",
  date: "2023.12.15(수) 19:30",
  venue: "서울 올림픽 주경기장",
  issuer: "Ticketmaster Korea",
  status: "입장전",
  genre: "콘서트",
};

export const ticketsSample: Ticket[] = [
  {
    id: "1",
    title: "BTS 월드투어 2023",
    date: "2023.12.15(수) 19:30",
    venue: "서울 올림픽 주경기장",
    issuer: "Ticketmaster Korea",
    status: "입장전",
    genre: "콘서트",
  },
  {
    id: "2",
    title: "어벤져스: 시크릿 워즈",
    date: "2023.12.15(수) 19:30",
    venue: "메가박스 코엑스",
    issuer: "CGV",
    status: "입장전",
    genre: "뮤지컬",
  },
  {
    id: "3",
    title: "손흥민 자선 축구경기",
    date: "2023.12.15(수) 19:30",
    venue: "서울월드컵경기장",
    issuer: "대한축구협회",
    status: "입장중",
    genre: "스포츠",
  },
  {
    id: "4",
    title: "반 고흐 전시회",
    date: "2023.12.15(수) 19:30",
    venue: "국립현대미술관",
    issuer: "국립현대미술관",
    status: "입장중",
    genre: "행사",
  },
  {
    id: "5",
    title: "뮤지컬 라이온 킹",
    date: "2023.12.15(수) 19:30",
    venue: "샤롯데 씨어터",
    issuer: "인터파크 티켓",
    status: "입장전",
    genre: "콘서트",
  },
];

export const myTicket = {
    id: "5",
    title: "뮤지컬 라이온 킹",
    date: "2023.12.15(수) 19:30",
    venue: "샤롯데 씨어터",
    issuer: "인터파크 티켓",
    genre: "콘서트",
    seat:"33구역 A-4",
    name:"홍길동"
}