import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchEventlist } from "../fetchers/get-event-list";

export const useGetEventListQuery = () => {
  return useInfiniteQuery({
    queryKey: ["eventList"],
    queryFn: async ({ pageParam }) => {
      // pageParam은 { cursorId, cursorDate } 형태
      return fetchEventlist(pageParam?.cursorId, pageParam?.cursorDate);
    },
    getNextPageParam: (lastPage) =>
      lastPage.lastCursorId
        ? {
            cursorId: lastPage.lastCursorId,
            cursorDate: lastPage.lastCursorDate,
          }
        : undefined,
    initialPageParam: { cursorId: undefined, cursorDate: undefined },
  });
};
