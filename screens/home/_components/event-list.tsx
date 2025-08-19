import { Event } from "@/types/event";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import EventCard from "./event-card";

interface EventListProps {
  events: Event[];
  onEventPress?: (event: Event) => void;
}

function EventList({ events, onEventPress }: EventListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={events}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={onEventPress} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  listContent: {
    padding: 16,
  },
});

export default EventList;
