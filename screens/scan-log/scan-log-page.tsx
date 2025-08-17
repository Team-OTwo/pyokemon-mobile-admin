import Header from "@/components/header";
import { Colors } from "@/constants/Colors";
import { tickets } from "@/constants/ticket";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ScanLogCard from "./_components/scan-log-card";

type ScanLogPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "ScanLog">;
  route: RouteProp<RootStackParamList, "ScanLog">;
};

function ScanLogPage({ route, navigation }: ScanLogPageProps) {
  return (
    <View style={styles.screen}>
      <Header title="스캔 이력 로그" />

      <FlatList
        data={tickets}
        renderItem={({ item }) => {
          return <ScanLogCard ticket={item} />;
        }}
        contentContainerStyle={styles.logContainer}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
  badges: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  infoTitle: {
    color: Colors.gray700,
    fontSize: 16,
    width: 70,
  },
  infoText: {
    fontSize: 16,
  },
  subtext: {
    color: Colors.gray700,
    fontSize: 12,
  },
  qrButton: {
    position: "absolute",
    padding: 16,
    bottom: 0,
    width: "100%",
  },
  logContainer: {
    padding: 16,
    gap: 16,
    paddingTop: 0,
    marginBottom: 60,
  },
});
export default ScanLogPage;
