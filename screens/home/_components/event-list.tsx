import { Event } from "@/types/event";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import EventCard from "./event-card";

interface EventListProps {
  events: Event[];
  onEventPress?: (event: Event) => void;
  onRefreshEvents?: () => Promise<unknown>;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasNextPage?: boolean;
}

function EventList({ events, onEventPress, onRefreshEvents,  onLoadMore,
  isLoadingMore,
  hasNextPage, }: EventListProps) {
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
    try {
      setRefreshing(true);

      if (onRefreshEvents) {
        await onRefreshEvents(); // 부모에서 API 호출 & 데이터 갱신
      }
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={events}
      renderItem={({ item }) => (
        <EventCard event={item} onPress={onEventPress} />
      )}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      // 무한 스크롤
      onEndReached={() => {
        if (hasNextPage && onLoadMore && !isLoadingMore) {
          onLoadMore();
        }
      }}
      onEndReachedThreshold={0.9}
      // 하단 로딩 인디케이터
      ListFooterComponent={
        isLoadingMore ? (
          <View style={{ paddingVertical: 16 }}>
            <ActivityIndicator size="small" />
          </View>
        ) : null
      }
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
