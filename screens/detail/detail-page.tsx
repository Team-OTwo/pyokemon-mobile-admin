import Header from "@/components/header";
import CustomButton from "@/components/ui/button";
import { Colors } from "@/constants/Colors";
import { eventsSample } from "@/constants/event";
import { globalStyles } from "@/globalStyles";
import { RootStackParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type DetailPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Detail">;
  route: RouteProp<RootStackParamList, "Detail">;
};

function DetailPage({ route, navigation }: DetailPageProps) {
  const { eventId } = route.params;
  const [event, setEvent]: any = useState(eventsSample.find((event) => event.id === eventId));

  const handleLogPress = () => {
    navigation.navigate("ScanLog", { eventId });
  };

  const handleQrButtonPress = () => {
    navigation.navigate("ChallengeQr");
  };
  return (
    <View style={styles.screen}>
      <Header title="공연 상세" />

      {/* content */}
      <View style={styles.container}>
        <View style={styles.badges}>
          <Text
            style={{
              color:
                event.status === "입장중"
                  ? Colors.success
                  : event.status === "입장전"
                  ? Colors.gray700
                  : Colors.error,
              fontWeight: 600,
            }}
          >
            {event.status}
          </Text>
          {event.status === "입장중" && (
            <Feather name="check-circle" size={16} color={Colors.success} />
          )}
          {event.status === "만료" && (
            <Feather name="x-circle" size={16} color={Colors.error} />
          )}
        </View>

        {/* title */}
        <Text style={[styles.title, globalStyles.title]}>{event?.title}</Text>

        {/* 일시, 장소 */}
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>일시</Text>
            <Text style={styles.infoText}>{event.date}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>장소</Text>
            <Text style={styles.infoText}>{event.venue}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>발급처</Text>
            <Text style={styles.infoText}>{event.issuer}</Text>
          </View>
        </View>
      </View>
      <View style={styles.qrButton}>
        <CustomButton text="입장 QR 생성" onPress={handleQrButtonPress} />
        <CustomButton
          textColor={Colors.gray500}
          borderColor={Colors.gray300}
          backgroundColor={Colors.white}
          text="스캔 이력 확인"
          onPress={handleLogPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    paddingVertical: 12,
    borderBottomColor: Colors.gray100,
  },
  infoContainer: {
    gap: 6,
    marginBottom: 24,
    borderColor: Colors.gray300,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTitle: {
    color: Colors.gray700,
    fontSize: 16,
    width: 70,
  },
  infoText: {
    fontSize: 16,
  },
  subtext: {
    color: Colors.gray700,
    fontSize: 12,
  },
  qrButton: {
    position: "absolute",
    padding: 16,
    bottom: 0,
    gap: 12,
    width: "100%",
  },
});

export default DetailPage;
