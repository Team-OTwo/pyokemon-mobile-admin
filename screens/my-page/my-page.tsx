import Header from '@/components/header';
import { Colors } from '@/constants/Colors';
import { RootStackParamList } from "@/types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MyPageProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "MyPage">;
};

function MyPage({navigation}:MyPageProps){
  return (
    <View style={styles.screen}>
      <Header title="마이페이지" />
      <View>
        <TouchableOpacity>
          <Text style={styles.text}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.text, styles.dangerous]}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  text: {
    paddingVertical:16,
    paddingHorizontal:24,
    fontSize: 16,
  },
  dangerous:{
    color:Colors.error
  }
});
export default MyPage