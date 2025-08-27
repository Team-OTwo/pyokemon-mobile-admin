import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?:string;
}

const Badge = ({
  text,
  backgroundColor = Colors.primary20,
  textColor = Colors.primaryDark,
  borderColor = Colors.primary20,
}: BadgeProps) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColor, borderColor: borderColor },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal:12,
    borderRadius: 100,
    alignSelf: "flex-start",
    borderWidth:1,
  },
  text: {
    fontSize: 14,
    fontWeight:600
  },
});

export default Badge;
