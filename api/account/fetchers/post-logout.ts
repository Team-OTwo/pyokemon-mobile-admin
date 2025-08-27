import { accountClient, setAuthorizationHeader } from "@/api/client";
import { resetToLogin } from "@/navigation/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const postLogout = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if(accessToken){
        setAuthorizationHeader(accessToken);
    }
    const res = await accountClient.post("/api/logout");
    if(res.data.success){
      await AsyncStorage.clear();
      resetToLogin();
    }else{
      Alert.alert("로그아웃 실패", res.data.message || "서버 문제로 로그아웃 실패");
    }

    return res.data;

  } catch (error: any) {
    if (error.response?.data) {
        Alert.alert("로그아웃 실패", error.response.data.message || "로그아웃 실패");
      return error.response.data;
    }
    throw error;
  }
};
