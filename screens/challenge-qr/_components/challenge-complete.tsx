import CustomButton from "@/components/ui/button";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChallengeCompleteProps {
  onReset: () => void;
}

export const ChallengeComplete: React.FC<ChallengeCompleteProps> = ({ onReset }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.stepTitle}>3단계: 챌린지 완료</Text>
      <Text style={styles.text}>🎉 챌린지가 성공적으로 완료되었습니다!</Text>
      <CustomButton text="처음부터 다시 시작" onPress={onReset} />
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
});
