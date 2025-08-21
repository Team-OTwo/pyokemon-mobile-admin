import { Event } from "@/types/event"
import { useQuery } from "@tanstack/react-query"
import { fetchEventDetail } from "../fetchers/get-event-detail"

export const useGetEventDetailQuery = (eventId: number) => {
  return useQuery<Event>({
    queryKey: ["eventDetail", eventId],
    queryFn: () => fetchEventDetail(eventId),
  })
}
