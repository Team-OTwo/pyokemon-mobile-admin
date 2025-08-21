import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";


const Loading = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();
    return () => spinAnimation.stop();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/loadingBall.png")}
        style={[styles.animatedImage, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Loading;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedImage: {
    width: 80,
    height: 80,
  },
});
