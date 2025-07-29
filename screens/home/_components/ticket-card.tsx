import { ThemedText } from "@/components/ThemedText";
import Badge from "@/components/ui/badge";
import { Colors } from "@/constants/Colors";
import { Event } from "@/types/event";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TicketCardProps {
  event: Event;
  onPress?: (event: Event) => void;
}

function TicketCard ({ event, onPress }: TicketCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(event)}
    >
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
      <ThemedText type="title">{event.title}</ThemedText>

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
      </View>

      <Text style={styles.subtext}>발급처: {event.issuer}</Text>
    </TouchableOpacity>
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
