import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/ui/button";
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        로그인
      </ThemedText>

      <TextInput
        style={[
          styles.input,
          { borderColor: isEmailFocused ? Colors.light.primary : Colors.light.gray300 },
        ]}
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
        placeholderTextColor={Colors.light.gray500}
        keyboardType="email-address"
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />

      <TextInput
        style={[
          styles.input,
          { borderColor: isPasswordFocused ? Colors.light.primary : Colors.light.gray300 },
        ]}
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor={Colors.light.gray500}
        secureTextEntry
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
      />
      <CustomButton text="로그인"/>
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
    marginBottom:16,
  },
});
export default LoginPage;
