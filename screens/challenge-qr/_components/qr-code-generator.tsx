import CustomButton from "@/components/ui/button";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

interface QRCodeGeneratorProps {
  qrCode: string;
  onNextStep: () => void;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  qrCode,
  onNextStep,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>관람객에게 QR을 제시해주세요</Text>
      <QRCode value={qrCode} size={200} />
      <Text style={styles.text}>
        스캔이 완료되면 입장티켓 스캔 화면으로 넘어갑니다.
      </Text>
      {/* <Text style={styles.qrValue}>QR 값: {qrCode}</Text> */}
      <View style={styles.buttonContainer}>
        <CustomButton text="다음" onPress={onNextStep} />
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
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
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
  buttonContainer: {
    width: "100%",
  },
});
