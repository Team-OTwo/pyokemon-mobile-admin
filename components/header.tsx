import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={handleGoBack}>
        <Ionicons name="chevron-back-outline" size={16} color="black" />
      </TouchableOpacity>
      <ThemedText type="title">{title}</ThemedText>
      <View style={styles.icon}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 9,
    height: 50,
  },
  icon: {
    width: 16,
    height: 16,
  },
});

export default Header;
