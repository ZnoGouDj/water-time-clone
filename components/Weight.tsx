import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  onPress: () => void;
}

const Weight: React.FC<Props> = ({ onPress }) => {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const getWasIncreasedVariable = async () => {
      try {
        const wasIncreased = await AsyncStorage.getItem('wasIncreased');
        if (wasIncreased === 'true') {
          setDisable(true);
        }
      } catch (error) {
        console.error('Error loading filledAmount from AsyncStorage: ', error);
      }
    };

    getWasIncreasedVariable();
  }, [])

  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        style={[styles.image, disable && styles.disabledImage]} 
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
