import Header from '@/components/header';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Badge from '@/components/ui/badge';
import { Colors } from '@/constants/Colors';
import { eventSample as event } from "@/constants/event";
import { tickets } from '@/constants/ticket';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ScanLogCard from './_components/scan-log-card';

const ScanLogPage = () => {
  return (
    <ThemedView style={styles.screen}>
      <Header title="스캔 이력 로그" />

      {/* event info */}
      <ThemedView style={styles.container}>
        <View style={styles.badges}>
          <Badge
            text={event.genre}
            textColor={Colors.light.text}
            backgroundColor={Colors.light.primary20}
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
      </ThemedView>

        <FlatList
          data={tickets}
          renderItem={({ item }) => {
            return <ScanLogCard ticket={item} />;
          }}
          contentContainerStyle={styles.logContainer}
        ></FlatList>
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

  },
  infoContainer: {
    gap: 6,
    paddingBottom:16,
    borderBottomColor: Colors.light.gray100,
    borderBottomWidth: 1,
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
  },
  logContainer:{
    padding:16,
    gap:16,
    paddingTop:0,
    marginBottom:60,
  }
});
export default ScanLogPage