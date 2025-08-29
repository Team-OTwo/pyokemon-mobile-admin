import CustomButton from "@/components/ui/button";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface PermissionRequestProps {
  onRequestPermission: () => void;
  onGoBack: () => void;
}

export const PermissionRequest: React.FC<PermissionRequestProps> = ({ onRequestPermission, onGoBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>카메라 접근 권한이 없습니다.</Text>
      <Text style={styles.permissionText}>QR 코드를 스캔하려면 카메라 접근 권한이 필요합니다.</Text>
      <View style={styles.buttonContainer}>
        <CustomButton text="권한 다시 요청" onPress={onRequestPermission} />
        <CustomButton text="돌아가기" onPress={onGoBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  permissionText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
  },
});
