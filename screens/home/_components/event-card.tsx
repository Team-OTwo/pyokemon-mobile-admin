import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/globalStyles";
import { Event } from "@/types/event";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EventCardProps {
  event: Event;
  onPress?: (event: Event) => void;
}

function EventCard({ event, onPress }: EventCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(event)}
    >
      {/* title */}
      <View style={styles.titleContainer}>
        <Text style={globalStyles.title}>{event?.title}</Text>
      </View>

      <View style={styles.infoContainer}>
        {/* 일시, 장소 */}
        <View style={styles.info}>
          <Feather name="map-pin" size={16} color={Colors.gray700} />
          <Text style={styles.infoText}>{event?.venueName}</Text>
        </View>

        <View style={styles.info}>
          <Feather name="calendar" size={16} color={Colors.gray700} />
          <Text style={styles.infoText}>
            {format(event?.eventDate, "yyyy.MM.dd(iii) HH:mm", { locale: ko })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray300,
    shadowColor: "rgba(0,0,0,0.05)",
    shadowRadius: 10,
  },
  titleContainer: {
    marginBottom: 8,
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
  infoContainer:{
    flexDirection:'column',
    gap:8,
  },
  info: {
    flex: 1,
    gap: 10,
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
    paddingBottom:4,
  },
  subtext: {
    color: Colors.gray700,
    fontSize: 12,
  },
});

export default EventCard;
