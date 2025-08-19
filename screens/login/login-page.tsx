import { postLogin } from "@/api/account/fetchers/post-login";
import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import { Colors } from "@/constants/Colors";
import { LoginRequest } from "@/types/account";
import { RootStackParamList } from "@/types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

type LoginPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

function LoginPage({ navigation }: LoginPageProps) {
  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ loginId?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: { loginId?: string; password?: string } = {};

    if (!loginId) {
      newErrors.loginId = "아이디를 입력해주세요";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (password.length < 4) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => postLogin(data),
    onSuccess: async (response) => {
      if (response?.success) {
        const { accessToken, refreshToken} = response.data;
        if (accessToken) await AsyncStorage.setItem("accessToken", accessToken);
        if (refreshToken) await AsyncStorage.setItem("refreshToken", refreshToken);

        navigation.replace("Home");
      } else {
        setErrorMessage(response?.message || "로그인 실패");
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      Alert.alert("로그인 오류", "로그인 중 문제가 발생했습니다.");
    },
  });

  const handleLogin = async () => {
    if (!validateForm()) return;

    loginMutation.mutate({ loginId, password });
  };
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Pyokemon</Text>
      </View>

      <CustomInput
        value={loginId}
        onChangeText={setLoginId}
        placeholder="아이디를 입력하세요"
        error={errors.loginId}
      />

      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        error={errors.password}
      />

      {errorMessage?<Text style={styles.error}>{errorMessage}</Text>:null}

      <CustomButton
        style={{ marginTop: 24 }}
        text="로그인"
        onPress={handleLogin}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop:150,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Bungee-Regular",
    fontWeight: "400",
    lineHeight: 40,
    letterSpacing: 1,
  },
  error:{
    color:Colors.error,
    fontSize:14,
  }
});
export default LoginPage;
