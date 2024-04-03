import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
  isDisabled: boolean;
}

const Weight: React.FC<Props> = ({ onPress, isDisabled }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={[styles.image, isDisabled && styles.disabledImage]} 
        source={require('../assets/weight.png')} 
      />
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  disabledImage: {
    opacity: 0.5,
  },
});

export default Weight;
