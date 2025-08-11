import LoginPage from "@/screens/login/login-page";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import Toast, { BaseToast } from "react-native-toast-message";
import { Colors } from "./constants/Colors";
import ChallengeQrPage from "./screens/challenge-qr/challenge-qr-page";
import DetailPage from "./screens/detail/detail-page";
import HomePage from "./screens/home/home-page";
import MyPage from "./screens/my-page/my-page";
import ScanLogPage from "./screens/scan-log/scan-log-page";
import SplashPage from "./screens/splash/splash-page";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Bungee-Regular": require("@/assets/fonts/Bungee-Regular.ttf"),
  });

  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  if (isSplashVisible) {
    return <SplashPage onFinish={() => setIsSplashVisible(false)} />;
  }

  if (!fontsLoaded) {
    return null;
  }

  const toastConfig = {
    success: (props: any) => <BaseToast {...props} style={{ borderLeftColor: Colors.light.success }} />,
    error: (props: any) => <BaseToast {...props} style={{ borderLeftColor: Colors.light.error }} />,
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="Detail" component={DetailPage} />
          <Stack.Screen name="ScanLog" component={ScanLogPage} />
          <Stack.Screen name="ChallengeQr" component={ChallengeQrPage} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}
