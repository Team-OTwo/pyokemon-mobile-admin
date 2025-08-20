import { eventClient } from "@/api/client";

export const fetchEventDetail = async (eventId: number) => {
  try {
    const res = await eventClient.get(`/api/events/tenant/${eventId}/detail`);
    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
