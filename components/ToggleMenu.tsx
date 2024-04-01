import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
  onOptionChange: (option: string) => void;
}

const ToggleMenu: React.FC<Props> = ({ onOptionChange }) => {
  const [selectedOption, setSelectedOption] = useState('Water');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'Tea' && styles.selectedOption]}
        onPress={() => handleOptionChange('Tea')}>
        <Text style={styles.optionText}>Tea</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'Water' && styles.selectedOption]}
        onPress={() => handleOptionChange('Water')}>
        <Text style={styles.optionText}>Water</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, selectedOption === 'Coffee' && styles.selectedOption]}
        onPress={() => handleOptionChange('Coffee')}>
        <Text style={styles.optionText}>Coffee</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '33%',
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ToggleMenu;
