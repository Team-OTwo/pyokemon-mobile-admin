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
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  permission,
  scanned,
  onRequestPermission,
  onGoBack,
  onBarcodeScanned,
}) => {
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>카메라 권한을 요청하고 있습니다...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <PermissionRequest
        onRequestPermission={onRequestPermission}
        onGoBack={onGoBack}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>입장객의 QR을 스캔해주세요</Text>

      {!scanned && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 32,
    paddingHorizontal: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical:56
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
  buttonContainer: {
    width: "100%",
  },
});
