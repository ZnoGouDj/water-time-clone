import { StyleSheet, View } from 'react-native';
import DrinkingProgress from './components/DrinkingProgress';
import { useEffect, useState } from 'react';
import WaterDrop from './components/WaterDrop';
import ToggleMenu from './components/ToggleMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Coffee from './components/Coffee';
import Tea from './components/Tea';
import Weight from './components/Weight';

export default function App() {
  const [selectedOption, setSelectedOption] = useState('Water');
  const [filledAmount, setFilledAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(2500);

  useEffect(() => {
    const loadFilledAmount = async () => {
      try {
        const savedFilledAmount = await AsyncStorage.getItem('filledAmount');
        if (savedFilledAmount !== null) {
          setFilledAmount(parseInt(savedFilledAmount));
        }
      } catch (error) {
        console.error('Error loading filledAmount from AsyncStorage: ', error);
      }
    };

    loadFilledAmount();
  }, []);

  const increaseFilledAmount = (amount: number) => {
    const newFilledAmount = filledAmount + amount;
    setFilledAmount(newFilledAmount);
    AsyncStorage.setItem('filledAmount', newFilledAmount.toString());
  };

  const increaseTotalAmount = async () => {
    try {
      const wasIncreased = await AsyncStorage.getItem('wasIncreased');

      if (wasIncreased === 'true') {
        return;
      } else {
        AsyncStorage.setItem('wasIncreased', 'true');
        setTotalAmount((prev) => prev + 500);
      }
    } catch (error) {
      console.error('Error increasing totalAmount: ', error);
    }
  }

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const resetFilledAmount = () => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const msUntilMidnight = midnight.getTime() - now.getTime();
      setTimeout(() => {
        setFilledAmount(0);
        AsyncStorage.setItem('filledAmount', '0');
        AsyncStorage.setItem('wasIncreased', 'false');
      }, msUntilMidnight);
    };

    resetFilledAmount();
  }, []);

  return (
    <View style={styles.container}>
      <DrinkingProgress filledAmount={filledAmount} totalAmount={totalAmount}/>
      <ToggleMenu onOptionChange={handleOptionChange} />
      <View style={styles.centeredContent}>
        {selectedOption === 'Water' && (
          <WaterDrop onPress={() => increaseFilledAmount(200)} />
        )}
        {selectedOption === 'Coffee' && (
          <Coffee onPress={() => increaseFilledAmount(-100)} />
        )}
        {selectedOption === 'Tea' && (
          <Tea onPress={() => increaseFilledAmount(-100)} />
        )}
        <Weight onPress={() => increaseTotalAmount()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  }
});
