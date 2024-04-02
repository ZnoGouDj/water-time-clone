import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  filledAmount: number;
  totalAmount: number;
}

const DrinkingProgress: React.FC<Props> = ({ filledAmount, totalAmount }) => {
  const progress = (filledAmount / totalAmount) * 100;

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { width: `${progress > 0 ? progress : 0}%` }]} />
      <Text style={styles.text}>{`${filledAmount} / ${totalAmount}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#ede8e8',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressContainer: {
    height: '100%',
    backgroundColor: '#2eccff',
  },
  text: {
    position: 'absolute',
    alignSelf: 'center',
    lineHeight: 50,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default DrinkingProgress;
