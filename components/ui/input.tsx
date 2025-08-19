import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

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
    <View>
      <Text>{label}</Text>

      <TextInput
        style={[
          styles.input,
          {
            borderColor: isFocused ? Colors.primary : Colors.gray300,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray500}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    paddingVertical: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: 12,
    padding: 8,
    height: 50,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    color: Colors.error,
  },
});
export default CustomInput;
