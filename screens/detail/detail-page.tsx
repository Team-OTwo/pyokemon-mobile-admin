import Header from "@/components/header";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import { Colors } from "@/constants/Colors";
import { eventSample as event } from "@/constants/event";
import React from "react";
import { StyleSheet, Text, View } from "react-native";


function DetailPage() {
  return (
    <ThemedView style={styles.screen}>
      <Header title="공연 상세" />

      {/* content */}
      <ThemedView style={styles.container}>
        <View style={styles.badges}>
          <Badge
            text={event.genre}
            textColor={Colors.light.text}
            backgroundColor={Colors.light.primary20}
          />

          <Badge
            text={event.status}
            textColor={Colors.light.text}
            backgroundColor={
              event.status === "입장중"
                ? Colors.light.success20
                : Colors.light.gray300
            }
          />
        </View>

        {/* title */}
        <ThemedText type="title" style={styles.title}>
          {event.title}
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

        <CustomButton
          textColor={Colors.light.gray500}
          borderColor={Colors.light.gray300}
          backgroundColor={Colors.light.background}
          text="스캔 이력 확인"
        ></CustomButton>
      </ThemedView>
      <View style={styles.qrButton}>
        <CustomButton text="입장 QR 생성"></CustomButton>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex:1,
  },
  container: {
    padding: 16,
  },
  badges: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  title: {
    paddingBottom: 12,
    borderBottomColor: Colors.light.gray100,
    borderBottomWidth: 1,
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
    flex: 1,
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
  qrButton:{
    position:'absolute',  
    padding:16,
    bottom:0,
    width:'100%'
  }
});

export default DetailPage;
