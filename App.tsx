import { StyleSheet, View } from 'react-native';
import DrinkingProgress from './components/DrinkingProgress';
import { useEffect, useState } from 'react';
import WaterDrop from './components/WaterDrop';
import ToggleMenu from './components/ToggleMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [selectedOption, setSelectedOption] = useState('Water');
  const [filledAmount, setFilledAmount] = useState(0);
  const totalAmount = 2500;

  useEffect(() => {
    const loadFilledAmount = async () => {
      try {
        const savedFilledAmount = await AsyncStorage.getItem('filledAmount');
        if (savedFilledAmount !== null) {
          setFilledAmount(parseInt(savedFilledAmount));
        }
      } catch (error) {
        console.error('Error loading filledAmount from AsyncStorage:', error);
      }
    };

    loadFilledAmount();
  }, []);

  const increaseFilledAmount = (amount: number) => {
    const newFilledAmount = filledAmount + amount;
    setFilledAmount(newFilledAmount);
    AsyncStorage.setItem('filledAmount', newFilledAmount.toString());
  };

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
      }, msUntilMidnight);
    };

    resetFilledAmount();
  }, []);

  return (
    <View style={styles.container}>
      <DrinkingProgress filledAmount={filledAmount} totalAmount={totalAmount}/>
      <ToggleMenu onOptionChange={handleOptionChange} />
      {selectedOption === 'Water' && (
        <WaterDrop onPress={() => increaseFilledAmount(200)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
