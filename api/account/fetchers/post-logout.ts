import { accountClient, setAuthorizationHeader } from "@/api/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const postLogout = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if(accessToken){
        setAuthorizationHeader(accessToken);
    }
    const response = await accountClient.post("/api/logout");
    console.log(response.data);

    await AsyncStorage.clear();
    
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      console.log("Server response:", error.response.data);
      return error.response.data;
    }
    console.log(error);
    throw error;
  }
};
