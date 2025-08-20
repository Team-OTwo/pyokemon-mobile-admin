import { eventClient } from "@/api/client"

export const fetchEventDetail = async (eventId: number) => {

  try {
    const res = await eventClient.get(`/api/events/${eventId}/detail`)
    console.log(res.data)

    return res.data
  } catch (error) {
    console.log(error)
  }
}
