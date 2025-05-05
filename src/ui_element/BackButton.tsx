import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';

interface BackButtonProps {
  onPress: () => void;
  color?: string;
}

const BackButton = ({ onPress, color = '#1565C0' }: BackButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.circle, { backgroundColor: color }]}>
        <Image
          source={require('../assets/left_arrow_icon.png')}
          style={styles.arrow}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    height: 56,
    justifyContent: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  arrow: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
});

export default BackButton;