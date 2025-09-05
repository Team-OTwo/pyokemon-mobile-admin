import CustomButton from "@/components/ui/button";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Timer from "./timer";

type Step = "scan" | "generate" | "complete";

interface QRCodeGeneratorProps {
  qrCode: string;
  onGoBack: () => void;
  presExId: string;
  setCurrentStep: (step:Step)=>void;
}


export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  qrCode,
  onGoBack,
  setCurrentStep
}) => {
  console.log("qrcode: " + qrCode);

  // 임시 성공 처리
  setInterval(()=>{
    setCurrentStep('complete');
  },5000);

  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>관람객에게 QR을 제시해주세요</Text>
      
      <Text style={styles.text}>
        QR을 스캔하면 입장이 완료됩니다.
      </Text>
    <Timer onFinish={onGoBack}/>
      <QRCode value={qrCode} size={300} ecl="L"/>
      
      <Text style={styles.subtext}>
        QR은 3분간 유효합니다.
      </Text>
      <View style={styles.buttonContainer}>
        <CustomButton text="이전" onPress={onGoBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    position:'relative',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 48,
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
    position: "absolute",
    bottom: 80,
  },
  subtext:{
    color:Colors.gray500
  }
});
