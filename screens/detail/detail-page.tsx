import { useGetEventDetailQuery } from "@/api/event/queries/use-get-event-detail-query";
import HeaderTransparent from "@/components/header-transparent";
import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import { Colors } from "@/constants/Colors";
import { globalStyles } from "@/globalStyles";
import { RootStackParamList } from "@/types/navigation";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type DetailPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Detail">;
  route: RouteProp<RootStackParamList, "Detail">;
};

function DetailPage({ route, navigation }: DetailPageProps) {
  const { eventId } = route.params;

  const {
    data: event,
    isLoading,
    error,
  } = useGetEventDetailQuery(Number(eventId));

  const handleQrButtonPress = () => {
    navigation.navigate("Verification");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error || !event) {
    return <Error />;
  }

  return (
    <View style={styles.screen}>
      <HeaderTransparent />
      <View>
        <Image
          source={{ uri: event.thumbnailUrl }}
          style={styles.image}
        ></Image>
      </View>
      {/* content */}
      <View style={styles.container}>
        <Badge text={event.genre} backgroundColor={Colors.primary20} />
        {/* title */}
        <Text style={[styles.title, globalStyles.title]}>{event.title}</Text>

        {/* 일시, 장소 */}
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={styles.infoTitle}>일시</Text>
            <Text style={styles.infoText}>
              {format(new Date(event.eventDate), "yyyy.MM.dd(iii) HH:mm", {
                locale: ko,
              })}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>장소</Text>
            <Text style={styles.infoText}>{event.venueName}</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>연령</Text>
            <Text style={styles.infoText}>
              {event.ageLimit === 0 ? "전체 관람가" : event.ageLimit + "세"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.qrButton}>
        <CustomButton text="입장 QR 생성" onPress={handleQrButtonPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },
  container: {
    padding: 16,
  },
  badges: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginBottom: 24,
    marginTop: 8,
    borderBottomColor: Colors.gray100,
  },
  infoContainer: {
    gap: 12,
    marginBottom: 24,
    borderColor: Colors.gray300,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  info: {
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
    bottom: 24,
    gap: 12,
    width: "100%",
  },
  image: {
    width: "100%",
    height: 360,
  },
});

export default DetailPage;
