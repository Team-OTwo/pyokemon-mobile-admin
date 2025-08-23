import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

const Badge = ({ text, backgroundColor, textColor = "#222222" }: BadgeProps) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
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
  },
  text: {
    fontSize: 14,
    fontWeight:600
  },
});

export default Badge;
