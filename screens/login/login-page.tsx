import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";

const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (password.length < 4) {
      newErrors.password = "비밀번호는 최소 6자 이상이어야 합니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      // const res = await restful("POST", "/auth/login", { email, password });
      // await AsyncStorage.setItem("token", res.data.access.token);
    //   navigation.replace("Home");
    } catch (error) {
      Alert.alert("오류", "로그인 중 문제가 발생했습니다.");
    }
  };
  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        로그인
      </ThemedText>

      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
        keyboardType="email-address"
        error={errors.email}
      />

      <CustomInput
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        error={errors.password}
      />

      <CustomButton text="로그인" onPress={handleLogin} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    paddingVertical: 16,
  },
  input: {
    width: "100%",
    backgroundColor: Colors.light.gray100,
    borderWidth: 1,
    borderColor: Colors.light.gray300,
    borderRadius: 12,
    padding: 8,
    height: 50,
    fontSize: 16,
    marginBottom: 16,
  },
});
export default LoginPage;
