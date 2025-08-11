import Header from "@/components/header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import { Colors } from "@/constants/Colors";
import { eventsSample } from "@/constants/event";
import { RootStackParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

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
    <ThemedView style={styles.screen}>
      <Header title="공연 상세" />

      {/* content */}
      <ThemedView style={styles.container}>
        <View style={styles.badges}>
          <Badge
            text={event.status}
            textColor={
              event.status === "입장중"
                ? Colors.light.success
                : event.status === "입장전"
                ? Colors.light.gray700
                : Colors.light.error
            }
          />
          {event.status === "입장중" && <Feather name="check-circle" size={16} color={Colors.light.success} />}
          {event.status === "만료" && <Feather name="x-circle" size={16} color={Colors.light.error} />}
        </View>

        {/* title */}
        <ThemedText type="title" style={styles.title}>
          {event?.title}
        </ThemedText>

        {/* 일시, 장소 */}
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>일시</Text>
            <ThemedText>{event.date}</ThemedText>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>장소</Text>
            <ThemedText>{event.venue}</ThemedText>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>발급처</Text>
            <ThemedText>{event.issuer}</ThemedText>
          </View>
        </View>
      </ThemedView>
      <View style={styles.qrButton}>
        <CustomButton text="입장 QR 생성" onPress={handleQrButtonPress} />
        <CustomButton
          textColor={Colors.light.gray500}
          borderColor={Colors.light.gray300}
          backgroundColor={Colors.light.background}
          text="스캔 이력 확인"
          onPress={handleLogPress}
        />
      </View>
    </ThemedView>
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
    paddingBottom: 12,
    borderBottomColor: Colors.light.gray100,
  },
  infoContainer: {
    marginTop: 12,
    gap: 6,
    marginBottom: 24,
    borderColor: Colors.light.gray300,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTitle: {
    color: Colors.light.gray700,
    fontSize: 16,
    width: 70,
  },
  infoText: {
    fontSize: 16,
  },
  subtext: {
    color: Colors.light.gray700,
    fontSize: 12,
  },
  qrButton: {
    position: "absolute",
    padding: 16,
    bottom: 0,
    gap: 12,
    width: "100%",
    marginBottom: Platform.OS === "ios" ? 16 : 50,
  },
});

export default DetailPage;
