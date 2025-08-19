import { postLogout } from "@/api/account/fetchers/post-logout";
import Header from "@/components/header";
import Modal from "@/components/ui/modal";
import { Colors } from "@/constants/Colors";
import { RootStackParamList } from "@/types/navigation";
import { CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Modal as RNModal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MyPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MyPage">;
};

function MyPage({ navigation }: MyPageProps) {
  const handleLogout = () => {
    postLogout();

    // 스택 초기화하고 Login으로 가기
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
  };

  const [open, setOpen] = useState(false);

  return (
    <View style={styles.screen}>
      <Header title="마이페이지" />
      <View>
        <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
          <Text style={styles.logoutText}>
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>

      <RNModal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modal}>
          <Modal
            title="로그아웃"
            description="로그아웃 하시겠습니까?"
            setOpen={setOpen}
            onPress={handleLogout}
          />
        </View>
      </RNModal>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    fontWeight: 500,
  },
  dangerous: {
    color: Colors.error,
  },
  modal: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
export default MyPage;
