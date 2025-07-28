import { ThemedText } from "@/components/ThemedText";
import { eventsSample } from "@/constants/event";
import { Event } from "@/types/event";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import GenreList from "./_components/genre-list";
import TicketList from "./_components/ticket-list";

function HomePage() {
    const [tickets, setTickets] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(()=>{
    if(eventsSample){
      setTickets(eventsSample);
    }
  },[]);

  const filteredTickets = activeFilter ? tickets.filter((ticket) => ticket.genre === activeFilter) : tickets;
  return (
    <View style={styles.container}>
      {/* header */}
      <View></View>

      {/* title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">공연</ThemedText>
        <ThemedText>안녕하세요, 관리자님!</ThemedText>
      </View>

      {/* genre list*/}
      <View>
        <GenreList activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
      </View>

      {/* ticket list */}
      <View>
        <TicketList tickets={filteredTickets}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },
  content: {
    flex: 1,
  },
  bottomSafeArea: {
    backgroundColor: "transparent",
  },
  //   footer: {
  //     padding: 16,
  //     paddingBottom: Platform.OS === "android" ? 50 : 16,
  //   },
});

export default HomePage;
