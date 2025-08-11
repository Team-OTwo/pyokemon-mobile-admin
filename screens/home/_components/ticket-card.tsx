import { ThemedText } from "@/components/ThemedText";
import Badge from "@/components/ui/badge";
import { Colors } from "@/constants/Colors";
import { Event } from "@/types/event";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface TicketCardProps {
  event: Event;
  onPress?: (event: Event) => void;
}

function TicketCard({ event, onPress }: TicketCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(event)}>
      {/* <View style={styles.badges}>



      {/* title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">{event.title}</ThemedText>
        <View style={styles.statusContainer}>
          {/* <ThemedText type="default">{event.status}</ThemedText> */}
          <Badge text={event.status} textColor={event.status === "입장중" ? Colors.light.success : Colors.light.text} />
          {event.status === "입장중" && <Feather name="check-circle" size={16} color={Colors.light.success} />}
          {event.status === "만료" && <Feather name="x-circle" size={16} color={Colors.light.error} />}
        </View>
      </View>

      {/* 일시, 장소 */}
      <View style={styles.info}>
        <Feather name="map-pin" size={16} color={Colors.light.gray700} />
        <ThemedText>{event.venue}</ThemedText>
      </View>
      <View style={styles.info}>
        <Feather name="calendar" size={16} color={Colors.light.gray700} />
        <ThemedText type="default">{event.date}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.gray300,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowRadius: 10,
  },
  titleContainer: {
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badges: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 10,
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
});

export default TicketCard;
