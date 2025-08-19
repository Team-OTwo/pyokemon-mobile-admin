import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalProps {
  title: string;
  description: string;
  setOpen: (open: boolean) => void;
  onPress:()=>void;
}

const Modal = ({title, description, setOpen, onPress}:ModalProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.leftButton} onPress={()=>setOpen(false)}>
            <Text style={styles.leftButtonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightButton}
          onPress={onPress}>
            <Text style={styles.rightButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 24,
  },
  modal: {
    padding: 16,
    borderRadius: 12,
    backgroundColor:Colors.white,
    boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: 600,
    paddingVertical: 18,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftButtonText: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 16,
    color: Colors.black,
    fontWeight: 500,
  },
  rightButtonText: {
    textAlign: "center",
    fontSize: 16,
    paddingVertical: 16,
    color: Colors.white,
    fontWeight: 500,
  },
  leftButton: {
    width: "48%",
    borderRadius: 8,
    backgroundColor: Colors.gray100,
  },
  rightButton: {
    width: "48%",
    borderRadius: 8,
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
});

export default Modal;
