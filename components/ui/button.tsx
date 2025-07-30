import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?:string;
  onPress?:()=>void;
}

const CustomButton = ({ text, textColor="#222", borderColor="#FFCF36", backgroundColor="#FFCF36", onPress }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, { borderColor: borderColor, backgroundColor:backgroundColor }]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  text:{
    textAlign:'center',
    fontWeight:'600',
    fontSize:16
  }
});
