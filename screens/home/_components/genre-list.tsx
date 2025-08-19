import { Colors } from "@/constants/Colors";
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GenreListProps {
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
}

const GenreList = ({ activeFilter, setActiveFilter }: GenreListProps) => {
  const filterOptions = [
    { label: "전체", value: null },
    { label: "콘서트", value: "콘서트" },
    { label: "뮤지컬", value: "뮤지컬" },
    { label: "연극", value: "연극" },
    { label: "클래식", value: "클래식" },
    { label: "스포츠", value: "스포츠" },
    { label: "행사", value: "행사" },
  ];

  return (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={filterOptions}
        keyExtractor={(item) => item.label}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === item.value && {
                backgroundColor: Colors.primary,
              },
            ]}
            onPress={() => setActiveFilter(item.value)}
          >
            <Text style={[styles.filterText, activeFilter === item.value && { color: "white" }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.filterList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 8,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 100,
    marginRight: 8,
    backgroundColor: "#F3F2F1",
  },
  filterText: {
    fontSize: 14,
    fontWeight:600,
    color: Colors.gray700,
  },
});

export default GenreList;
