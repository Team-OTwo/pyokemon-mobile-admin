import { Colors } from "@/constants/Colors";
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ChallengeCompleteProps {
  onReset: () => void;
}

export const ChallengeComplete: React.FC<ChallengeCompleteProps> = ({
  onReset,
}) => {
    const progress = useRef(new Animated.Value(0)).current;
  // setInterval(() => {
  //   onReset();
  // }, 6000);
  useEffect(() => {
    // 0 → 1로 2초 동안 애니메이션
    Animated.timing(progress, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      // 완료 후 스캔 화면으로 돌아가기
      onReset();
    });
  }, []);

  // progress를 width로 변환 (0% → 100%)
  const widthInterpolate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Feather name="check" size={56} color={Colors.primary} />
      </View>
      <Text style={styles.stepTitle}>티켓 확인 완료</Text>
      <Text style={styles.text}>지금 바로 입장해주세요!</Text>
      <View style={styles.progressBackground}>
        <Animated.View
          style={[styles.progressBar, { width: widthInterpolate }]}
        />
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
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 56,
  },
  icon: {
    borderRadius:'100%',
    borderColor:Colors.primary,
    borderWidth:5,
    padding:12
  },
  progressBackground: {
    width: "80%",
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: Colors.primary,
  },
});
