import Header from "@/components/header";
import { RootStackParamList } from "@/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { ChallengeComplete } from "./_components/challenge-complete";
import { QRCodeGenerator } from "./_components/qr-code-generator";
import { QRCodeScanner } from "./_components/qr-code-scanner";

interface ChallengeQrPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "ChallengeQr">;
}

type Step = "generate" | "scan" | "complete";

function ChallengeQrPage({ navigation }: ChallengeQrPageProps) {
  const [currentStep, setCurrentStep] = useState<Step>("generate");
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState("challenge_123_test");

  const [permission, requestPermission] = useCameraPermissions();

  // 카메라 권한 요청
  useEffect(() => {
    if (permission && !permission.granted) {
      Toast.show({
        type: "error",
        text1: "카메라 권한 필요",
        text2: "QR 스캔을 위해 카메라 접근 권한을 허용해주세요.",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  }, [permission]);

  const requestPermissionAgain = async () => {
    try {
      await requestPermission();

      if (permission?.granted) {
        Toast.show({
          type: "success",
          text1: "권한 허용됨",
          text2: "이제 QR 코드를 스캔할 수 있습니다.",
          position: "bottom",
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.error("권한 재요청 실패:", error);
    }
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (scanned) return;

    setScanned(true);
    console.log("스캔된 데이터:", data);

    if (data === qrCode) {
      Toast.show({
        type: "success",
        text1: "챌린지 완료!",
        text2: "QR 코드가 일치합니다.",
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });

      setTimeout(() => {
        setCurrentStep("complete");
      }, 2000);
    } else {
      Toast.show({
        type: "error",
        text1: "QR 코드 불일치",
        text2: `스캔된 값: ${data}`,
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });

      setTimeout(() => {
        setScanned(false);
      }, 3000);
    }
  };

  const resetToGenerate = () => {
    setCurrentStep("generate");
    setScanned(false);
  };

  const renderGenerateStep = () => <QRCodeGenerator qrCode={qrCode} onNextStep={() => setCurrentStep("scan")} />;

  const renderScanStep = () => (
    <QRCodeScanner
      permission={permission}
      scanned={scanned}
      onRequestPermission={requestPermissionAgain}
      onGoBack={() => setCurrentStep("generate")}
      onBarcodeScanned={handleBarCodeScanned}
      onResetScan={() => setScanned(false)}
    />
  );

  const renderCompleteStep = () => <ChallengeComplete onReset={resetToGenerate} />;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "generate":
        return renderGenerateStep();
      case "scan":
        return renderScanStep();
      case "complete":
        return renderCompleteStep();
      default:
        return renderGenerateStep();
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="입장" />
      {renderCurrentStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ChallengeQrPage;
