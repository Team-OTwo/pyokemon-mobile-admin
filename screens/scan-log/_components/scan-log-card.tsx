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
          <Text style={styles.infoText}>{ticket.name}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>좌석</Text>
          <Text style={styles.infoText}>{ticket.seat}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>입장 시간</Text>
          <Text style={styles.infoText}>{ticket.enterTime}</Text>
        </View>
      </View>

      <View>
        <Badge
          text={ticket.status}
          textColor={Colors.white}
          backgroundColor={ticket.status === "입장" ? Colors.success : Colors.error}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: Colors.gray300,
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
    color: Colors.gray700,
    fontSize: 16,
    width: 70,
  },
  infoText: {
    fontSize: 16,
  },
});
export default ScanLogCard;
