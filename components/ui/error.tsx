import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import errorBall from "../../assets/images/errorBall.png";
import CustomButton from "./button";

const Error = () => {
  const navigation = useNavigation();
  const hanldeClickHome = () => {
    navigation.navigate("Home" as never);
  };

  const handleClickPrevious = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={errorBall} resizeMode="contain" style={styles.ball} />
      <Text style={styles.text}>앗! 문제가 발생했어요</Text>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          text="이전 페이지"
          onPress={handleClickPrevious}
          textColor={Colors.black}
          backgroundColor={Colors.white}
          borderColor={Colors.black}
        />
        <CustomButton
          style={styles.button}
          text="메인으로"
          onPress={hanldeClickHome}
          backgroundColor={Colors.black}
          borderColor={Colors.black}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "center",
    gap: 36,
  },
  text: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: "center",
  },
  ball: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  button: {
    width: "48%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default Error;
