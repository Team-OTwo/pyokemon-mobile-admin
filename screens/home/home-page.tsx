import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { eventsSample } from "@/constants/event";
import { Event } from "@/types/event";
import { RootStackParamList } from "@/types/navigation";
import Feather from "@expo/vector-icons/Feather";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import GenreList from "./_components/genre-list";
import TicketList from "./_components/ticket-list";

type HomePageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

function HomePage({ navigation }: HomePageProps) {
  const [tickets, setTickets] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    if (eventsSample) {
      setTickets(eventsSample);
    }
  }, []);

  const handleEventPress = (event: Event) => {
    // 티켓 상세 페이지로 이동
    navigation.navigate("Detail", { eventId: event.id });
  };

  const filteredTickets = activeFilter ? tickets.filter((ticket) => ticket.genre === activeFilter) : tickets;

  const handleProfilePress = () => {
    navigation.navigate("MyPage");
  };

  return (
    <ThemedView style={styles.container}>
      {/* title */}
      <View style={styles.titleContainer}>
        <ThemedText type="title">공연</ThemedText>
        <TouchableOpacity onPress={handleProfilePress}>
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* genre list*/}
      <View>
        <GenreList activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </View>

      {/* ticket list */}
      <TicketList events={filteredTickets} onTicketPress={handleEventPress} />
      {/* </SafeAreaView> */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
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
  bottomSafeArea: {
    backgroundColor: "transparent",
    paddingBottom: 16,
  },
  footer: {
    padding: 16,
    paddingBottom: Platform.OS === "android" ? 50 : 16,
  },
});

export default HomePage;
