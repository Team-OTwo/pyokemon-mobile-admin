import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
interface TimerProps {
  onFinish?: () => void;
}
const Timer: React.FC<TimerProps> = ({ onFinish }) => {
  const [seconds, setSeconds] = useState(180);

  useEffect(() => {
    if (seconds <= 0) {
        onFinish?.();
        return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onFinish]);

  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>남은 시간 :</Text>
      <Text style={styles.timer}>
        {minute}:{second.toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    gap: 8,
  },
  text: {
    color: Colors.gray500,
    textAlign:'center',
  },
  timer:{
    color:Colors.error,
    width:40,
    textAlign:'center',
    fontWeight:600
  }
});

export default Timer;
