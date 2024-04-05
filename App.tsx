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
  const [liquidConsumed, setLiquidConsumed] = useState(0);
  const [liquidGoal, setLiquidGoal] = useState(2500);
  const [disableExerciseIcon, setDisableExerciseIcon] = useState(false);

  useEffect(() => {
    console.log('hello world')
  }, [])

  useEffect(() => {
    const getAsyncStorageData = async () => {
      try {
        const liquidConsumed = await AsyncStorage.getItem('liquidConsumed');
        const liquidGoal = await AsyncStorage.getItem('liquidGoal');
        const wasExerciseDone = await AsyncStorage.getItem('wasExerciseDone');
        
        if (liquidConsumed) {
          setLiquidConsumed(+liquidConsumed)
        }

        if (liquidGoal) {
          setLiquidGoal(+liquidGoal);
        }

        if (wasExerciseDone) {
          setDisableExerciseIcon(true);
        }
      } catch (error) {
        console.error('Error getting data from AsyncStorage: ', error);
      }
    }

    getAsyncStorageData();
  }, [])

  const increaseLiquidConsumed = (amount: number) => {
    const newLiquidConsumed = liquidConsumed + amount;
    setLiquidConsumed((newLiquidConsumed));
    AsyncStorage.setItem('liquidConsumed', newLiquidConsumed.toString());
  };

  const increaseLiquidGoal = async () => {
    const wasExerciseDone = await AsyncStorage.getItem('wasExerciseDone');

    if (wasExerciseDone) {
      return;
    } else {
      try {
        const newLiquidGoal = liquidGoal + 500;
        setLiquidGoal(newLiquidGoal);
        setDisableExerciseIcon(true);
        AsyncStorage.setItem('liquidGoal', newLiquidGoal.toString());
        AsyncStorage.setItem('wasExerciseDone', 'true');
      } catch (error) {
        console.error('Error increasing totalAmount: ', error);
      }
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
        setLiquidConsumed(0);
        AsyncStorage.removeItem('liquidConsumed');
        AsyncStorage.removeItem('liquidGoal');
        AsyncStorage.removeItem('wasExerciseDone');
      }, msUntilMidnight);
    };

    resetFilledAmount();
  }, []);

  return (
    <View style={styles.container}>
      <DrinkingProgress liquidConsumed={liquidConsumed} liquidGoal={liquidGoal}/>
      <ToggleMenu onOptionChange={handleOptionChange} />
      <View style={styles.centeredContent}>
        {selectedOption === 'Water' && (
          <WaterDrop onPress={() => increaseLiquidConsumed(200)} />
        )}
        {selectedOption === 'Coffee' && (
          <Coffee onPress={() => increaseLiquidConsumed(-100)} />
        )}
        {selectedOption === 'Tea' && (
          <Tea onPress={() => increaseLiquidConsumed(-100)} />
        )}
        <Weight onPress={() => increaseLiquidGoal()} isDisabled={disableExerciseIcon} />
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
