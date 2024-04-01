import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
}

const WaterDrop: React.FC<Props> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../assets/water_drop.png')} style={{ width: 50, height: 50 }} />
    </TouchableOpacity>
  );
};

export default WaterDrop;
