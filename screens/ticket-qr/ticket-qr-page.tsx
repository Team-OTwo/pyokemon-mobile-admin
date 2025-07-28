import Header from "@/components/header";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { myTicket } from "@/constants/ticket";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";


function TicketQrPage() {
  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "입장 성공",
      text2: myTicket.name + " " + myTicket.seat,
      position: "bottom",
    });
  };

  const showErrorToast = () => {
    Toast.show({
      type: "error",
      text1: "입장 실패",
      text2: "다시 시도하세요",
      position:'bottom',
    });
  };
  return (
    <ThemedView style={styles.screen}>
      <Header title="입장 QR 스캔" />

      <View>
        <View>
          <Text>QR</Text>
        </View>
        <Text style={styles.text}>관람객의 입장 티켓을 스캔해주세요.</Text>
      </View>

      <TouchableOpacity onPress={showSuccessToast}>
        <Text>입장 성공</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showErrorToast}>
        <Text>입장 실패</Text>
      </TouchableOpacity>
      <Toast config={toastConfig}/>
    </ThemedView>
  );
}


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: Colors.light.success }}
      contentContainerStyle={{ backgroundColor: Colors.light.gray100 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: Colors.light.error }}
      contentContainerStyle={{ backgroundColor: Colors.light.gray100 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 600,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default TicketQrPage;
