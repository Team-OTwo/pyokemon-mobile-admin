import CustomButton from "@/components/ui/button";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRCodeGeneratorProps {
  qrCode: string;
  onNextStep: () => void;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ qrCode, onNextStep }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>1단계: QR 코드 생성</Text>
      <QRCode value={qrCode} size={300} />
      <Text style={styles.text}>생성된 QR 코드입니다.</Text>
      <Text style={styles.qrValue}>QR 값: {qrCode}</Text>
      <CustomButton text="다음 단계: QR 스캔" onPress={onNextStep} />
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
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
  qrValue: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
