import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Badge from "@/components/ui/badge";
import { Colors } from "@/constants/Colors";
import { Event } from "@/types/event";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TicketCardProps {
  ticket: Event;
}

function TicketCard ({ ticket }: TicketCardProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.badges}>
        <Badge
          text={ticket.genre}
          textColor={Colors.light.text}
          backgroundColor={Colors.light.primary20}
        />

        <Badge
          text={ticket.status}
          textColor={Colors.light.text}
          backgroundColor={
            ticket.status === "입장중"
              ? Colors.light.success20
              : Colors.light.gray300
          }
        />
      </View>

      {/* title */}
      <ThemedText type="title">{ticket.title}</ThemedText>

      {/* 일시, 장소 */}
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>일시</Text>
          <ThemedText>{ticket.date}</ThemedText>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoTitle}>장소</Text>
          <ThemedText>{ticket.venue}</ThemedText>
        </View>
      </View>

      <Text style={styles.subtext}>발급처: {ticket.issuer}</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.light.gray300,
    shadowColor:'rgba(0,0,0,0.05)',
    shadowRadius:10,
  },
  badges:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:6
  },
  infoContainer:{
    marginTop:12,
    gap:6,
    marginBottom:24
  },
  info:{
    flex:1,
    flexDirection:'row',
    alignItems:'center'
  },
  infoTitle:{
    color:Colors.light.gray700,
    fontSize:16,
    width:70
  },
  infoText:{
    fontSize:16,
  },
  subtext:{
    color:Colors.light.gray700,
    fontSize:12
  }
});

export default TicketCard;
