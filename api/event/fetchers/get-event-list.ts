import { eventClient, setAuthorizationHeader } from "@/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchEventlist = async (
  cursorId?: number,
  cursorDate?: number,
  genre?:string|null,
) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");

    if (accessToken) {
      setAuthorizationHeader(accessToken);
    }

    const res = await eventClient.get(`/api/events/tenant/app`, {
      params: { cursorId, cursorDate, genre },
    });

    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("이벤트 리스트 fetch 실패:", error);
    throw error;
  }
};
