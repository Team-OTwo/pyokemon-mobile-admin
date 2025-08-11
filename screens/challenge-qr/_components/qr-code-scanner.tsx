import CustomButton from "@/components/ui/button";
import { CameraView } from "expo-camera";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PermissionRequest } from "./permission-request";
import { ScanOverlay } from "./scan-overlay";

interface QRCodeScannerProps {
  permission: any;
  scanned: boolean;
  onRequestPermission: () => void;
  onGoBack: () => void;
  onBarcodeScanned: (data: { type: string; data: string }) => void;
  onResetScan: () => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  permission,
  scanned,
  onRequestPermission,
  onGoBack,
  onBarcodeScanned,
  onResetScan,
}) => {
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>카메라 권한을 요청하고 있습니다...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return <PermissionRequest onRequestPermission={onRequestPermission} onGoBack={onGoBack} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>2단계: QR 코드 스캔</Text>
      {!scanned ? (
        <View style={styles.scanContainer}>
          <CameraView
            style={styles.scanner}
            facing="back"
            onBarcodeScanned={onBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <ScanOverlay />
          </CameraView>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>QR 코드 스캔 완료!</Text>
          <CustomButton text="다시 스캔" onPress={onResetScan} />
        </View>
      )}
      <CustomButton text="이전 단계로" onPress={onGoBack} />
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
  scanContainer: {
    width: 300,
    height: 300,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  scanner: {
    flex: 1,
  },
  resultContainer: {
    alignItems: "center",
    gap: 20,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#4CAF50",
  },
});
