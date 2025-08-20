import { useGetEventListQuery } from "@/api/event/queries/use-get-event-list-query";
import { globalStyles } from "@/globalStyles";
import { Event } from "@/types/event";
import { RootStackParamList } from "@/types/navigation";
import Feather from "@expo/vector-icons/Feather";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EventList from "./_components/event-list";
import GenreList from "./_components/genre-list";

type HomePageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

function HomePage({ navigation }: HomePageProps) {
  // const [event, setEvent] = useState<Event[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetEventListQuery();

  const events: Event[] = useMemo(() => {
    return data?.pages.flatMap((page) => page.events) ?? [];
  }, [data]);

  const filteredEvents = useMemo(() => {
    return activeFilter
      ? events.filter((event: Event) => event.genre === activeFilter)
      : events;
  }, [events, activeFilter]);

  const handleEventPress = (event: Event) => {
    // 티켓 상세 페이지로 이동
    navigation.navigate("Detail", { eventId: event.eventId });
  };

  const handleProfilePress = () => {
    navigation.navigate("MyPage");
  };

  return (
    <View style={styles.container}>
      {/* title */}
      <View style={styles.titleContainer}>
        <Text style={globalStyles.title}>공연</Text>
        <TouchableOpacity onPress={handleProfilePress}>
          <Feather name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* genre list*/}
      <View>
        <GenreList
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      </View>

      {/* event list */}
      <View style={styles.eventContainer}>
        {isLoading ? (
          <View><Text>loading...</Text></View>
        ) : (
          <EventList
            events={filteredEvents}
            onEventPress={handleEventPress}
            onRefreshEvents={refetch}
            onLoadMore={fetchNextPage}
            isLoadingMore={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  eventContainer: {
    flex: 1,
  },
});

export default HomePage;
