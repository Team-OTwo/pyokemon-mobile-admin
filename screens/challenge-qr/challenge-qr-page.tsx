import Header from "@/components/header";
import { ThemedView } from "@/components/ThemedView";
import { RootStackParamList } from "@/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ChallengeQrPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

function ChallengeQrPage({navigation}:ChallengeQrPageProps) {
  return (
    <ThemedView style={styles.screen}>
      <Header title="챌린지 QR 스캔" />

      <View>
        <Text>QR</Text>
        <Text style={styles.text}>티켓 발급을 위해 QR을 스캔해주세요.</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default ChallengeQrPage;
