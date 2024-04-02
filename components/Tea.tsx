import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
}

const Tea: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../assets/tea.png')} style={{ width: 150, height: 150 }} />
    </TouchableOpacity>
  );
};

export default Tea;
