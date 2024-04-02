import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
}

const Coffee: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../assets/coffee.png')} style={{ width: 150, height: 150 }} />
    </TouchableOpacity>
  );
};

export default Coffee;
