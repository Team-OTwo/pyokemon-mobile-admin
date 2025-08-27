import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const HeaderTransparent = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <LinearGradient
      colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0)"]} // 위는 진한 검정 → 아래는 투명
      style={styles.container}
    >
      <TouchableOpacity style={styles.icon} onPress={handleGoBack}>
        <Ionicons name="chevron-back-outline" size={24} color={Colors.white} />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    height:100
  },
  icon: {
    width: 32,
    height: 32,
    justifyContent:'center'
  },
});

export default HeaderTransparent;
