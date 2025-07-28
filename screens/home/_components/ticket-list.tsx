import { Event } from '@/types/event';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TicketCard from './ticket-card';


interface TicketListProps{
    tickets:Event[];
}

function TicketList ({tickets}:TicketListProps) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={tickets}
      renderItem={({ item }) => <TicketCard ticket={item} />}
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