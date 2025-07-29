import LoginPage from "@/screens/login/login-page";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChallengeQrPage from "./screens/challenge-qr/challenge-qr-page";
import DetailPage from "./screens/detail/detail-page";
import HomePage from "./screens/home/home-page";
import MyPage from "./screens/my-page/my-page";
import ScanLogPage from "./screens/scan-log/scan-log-page";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="Detail" component={DetailPage} />
        <Stack.Screen name="ScanLog" component={ScanLogPage} />
        <Stack.Screen name="ChallengeQr" component={ChallengeQrPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}