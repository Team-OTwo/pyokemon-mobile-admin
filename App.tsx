import { navigationRef } from "@/navigation/navigationRef";
import LoginPage from "@/screens/login/login-page";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast, { BaseToast } from "react-native-toast-message";
import { Colors } from "./constants/Colors";
import ChallengeQrPage from "./screens/challenge-qr/challenge-qr-page";
import DetailPage from "./screens/detail/detail-page";
import HomePage from "./screens/home/home-page";
import MyPage from "./screens/my-page/my-page";
import ScanLogPage from "./screens/scan-log/scan-log-page";
import SplashPage from "./screens/splash/splash-page";
import VerificationPage from "./screens/verification/verification-page";
import { RootStackParamList } from "./types/navigation";


const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Bungee-Regular": require("@/assets/fonts/Bungee-Regular.ttf"),
  });

  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  const [initialRoute, setInitialRoute] = useState<
    keyof RootStackParamList | null
  >(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          setInitialRoute("Home");
        } else {
          setInitialRoute("Login");
        }
      } catch (err) {
        setInitialRoute("Login");
      }
    };

    checkToken();
  }, []);

  if (isSplashVisible) {
    return <SplashPage onFinish={() => setIsSplashVisible(false)} />;
  }

  if (!fontsLoaded || initialRoute === null) {
    return null;
  }

  const toastConfig = {
    success: (props: any) => (
      <BaseToast {...props} style={{ borderLeftColor: Colors.success }} />
    ),
    error: (props: any) => (
      <BaseToast {...props} style={{ borderLeftColor: Colors.error }} />
    ),
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <QueryClientProvider client={queryClient}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName={initialRoute}
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.white },
              }}
            >
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="MyPage" component={MyPage} />
              <Stack.Screen name="Detail" component={DetailPage} />
              <Stack.Screen name="ScanLog" component={ScanLogPage} />
              <Stack.Screen name="ChallengeQr" component={ChallengeQrPage} />
              <Stack.Screen name="Verification" component={VerificationPage} />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast config={toastConfig} />
        </QueryClientProvider>
      </SafeAreaView>
    </>
  );
}
