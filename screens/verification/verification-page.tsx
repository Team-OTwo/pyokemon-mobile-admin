import { postVerification } from "@/api/did/fetchers/post-verification";
import { useGetVerificationResult } from "@/api/did/queries/use-get-verification-result";
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

interface VerificationPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Verification">;
}

type Step = "scan" | "generate" | "complete";

const VerificationPage = ({ navigation }: VerificationPageProps) => {
  const [currentStep, setCurrentStep] = useState<Step>("scan");
  const [scanned, setScanned] = useState(false);
  const [qrCode, setQrCode] = useState("exp://192.168.0.32:8083");
  const [presExId, setPresExId] = useState("");

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

  const { data, isSuccess } = useGetVerificationResult(presExId, {
    enabled: presExId !== "" && currentStep === "generate",
    refetchInterval: 2000,
  });

  const handleBarCodeScanned = async ({
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return;

    setScanned(true);
    console.log("스캔된 데이터:", data);

    try {
      // const parsed = JSON.parse(data);
      // const { jwt, bookingId } = parsed;

      // console.log("스캔된 JWT:", jwt);
      // console.log("스캔된 Booking ID:", bookingId);
      const jwt =
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTY0MzM4NTcsImV4cCI6MTc1NjQzNTY1N30.P4uMs7TY-EDDM5RU4_6paeaU_fXq-qdJbE6kt7FJjVw";
      const bookingId = "2";
      const res = await postVerification({ jwt, bookingId });
      console.log("res" + res);

      // // qr 데이터에 verify_invi_url 담기
      // setQrCode(res.verify_invi_url);
      // setPresExId(res.pres_ex_id);
      setPresExId("2");
      setCurrentStep("generate");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "QR 코드 불일치",
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
      });

      setTimeout(() => {
        setScanned(false);
      }, 500);
    }

  };

  useEffect(() => {
    if (isSuccess) {
      setCurrentStep("complete");
    }
  }, [isSuccess]);

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
      presExId={presExId}
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
    position: "relative",
  },
});

export default VerificationPage;
