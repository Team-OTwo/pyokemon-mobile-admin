import React from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  text: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  onPress?: () => void;
  disabled?:boolean
}

const CustomButton = ({
  style,
  text,
  textColor = "#FFFFFF",
  borderColor = "#75B8FF",
  backgroundColor = "#75B8FF",
  onPress,
  disabled
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        style,
        styles.button,
        {
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          opacity: disabled ? 0.3 : 1,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
  },
  text: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
