import { ThemedText } from "@/components/ThemedText";
import Badge from "@/components/ui/badge";
import { Colors } from "@/constants/Colors";
import { Ticket } from "@/types/ticket";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScanLogCardProps {
  ticket: Ticket;
}

const ScanLogCard = ({ ticket }: ScanLogCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>이름</Text>
          <ThemedText>{ticket.name}</ThemedText>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>좌석</Text>
          <ThemedText>{ticket.seat}</ThemedText>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>입장 시간</Text>
          <ThemedText>{ticket.enterTime}</ThemedText>
        </View>
      </View>

      <View>
        <Badge
          text={ticket.status}
          textColor={Colors.light.text}
          backgroundColor={
            ticket.status === "입장"
              ? Colors.light.success20
              : Colors.light.error20
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.light.gray300,
    borderWidth: 1,
    borderRadius: 12,

    padding: 16,
  },
  infoContainer: {
    gap: 6,
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
});
export default ScanLogCard;
