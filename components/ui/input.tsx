import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedText } from "../ThemedText";

interface CustomInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
}

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  error,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <Text>{label}</Text>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: isFocused
              ? Colors.light.primary
              : Colors.light.gray300,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.gray500}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
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
  },
  error: {
    fontSize: 12,
    color: Colors.light.error,
  },
});
export default CustomInput;
