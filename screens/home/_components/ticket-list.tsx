import { Event } from '@/types/event';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TicketCard from './ticket-card';


interface TicketListProps{
    events:Event[];
    onTicketPress?: (event: Event) => void;
}

function TicketList ({events, onTicketPress}:TicketListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={events}
      renderItem={({ item }) => <TicketCard event={item} onPress={onTicketPress}/>}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        gap:16,
    }
})

export default TicketList