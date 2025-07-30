import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

const Badge = ({
  text,
  backgroundColor = "#FFCF36",
  textColor = "#222222",
}: BadgeProps) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  text: {
    fontSize: 14,
  },
});

export default Badge;
