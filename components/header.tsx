import { globalStyles } from "@/globalStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={globalStyles.title}>{title}</Text>
      <View style={styles.icon}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  icon: {
    width: 32,
  },
});

export default Header;
