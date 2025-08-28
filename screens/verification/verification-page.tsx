import Header from "@/components/header";
import { RootStackParamList } from "@/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCameraPermissions } from "expo-camera";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { ChallengeComplete } from "../challenge-qr/_components/challenge-complete";
import { QRCodeGenerator } from "../challenge-qr/_components/qr-code-generator";
import { QRCodeScanner } from "../challenge-qr/_components/qr-code-scanner";

interface VerificationPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Verification">;
}

type Step = "scan" | "generate" | "complete";

const VerificationPage = ({ navigation }: VerificationPageProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("scan");
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState("exp://19.168.0.32:8083");

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

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;
    console.log(data);

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

    //   setTimeout(() => {
        setCurrentStep('generate')
    //   }, 2000);
    } else {
      Toast.show({
        type: "error",
        text1: "QR 코드 불일치",
        text2: `스캔된 값: ${data}`,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });

      setTimeout(() => {
        setScanned(false);
        //   setCurrrentStep('generate')
      }, 500);
    }

  
  };

  const resetToScan = () => {
    setCurrentStep("scan");
    setScanned(false);
  };

  const renderScanStep = () => (
    <QRCodeScanner
      permission={permission}
      scanned={scanned}
      onRequestPermission={requestPermissionAgain}
      onGoBack={() => setCurrentStep("scan")}
      onBarcodeScanned={handleBarCodeScanned}
    />
  );

  const renderGenerateStep = () => (
    <QRCodeGenerator
      qrCode={qrCode}
      onGoBack={() => {
        setCurrentStep("scan");
        setScanned(false);
      }}
    />
  );

  const renderCompleteStep = () => <ChallengeComplete onReset={resetToScan} />;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "scan":
        return renderScanStep();
      case "generate":
        return renderGenerateStep();
      case "complete":
        return renderCompleteStep();
      default:
        return renderScanStep();
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="입장" />
      {renderCurrentStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position:'relative'
  },
});

export default VerificationPage;
