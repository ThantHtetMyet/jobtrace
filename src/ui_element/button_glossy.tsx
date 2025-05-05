import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  View,
  Dimensions 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GlossyButtonProps {
  title?: string;
  onPress: () => void;
  width?: number;
  height?: number;
  colors?: string[];
  borderColor?: string;
}

const GlossyButton: React.FC<GlossyButtonProps> = ({ 
  title = 'START', 
  onPress, 
  width = Dimensions.get('window').width * 0.6,
  height = 60,
  colors = ['#52a7e0', '#1268c5'],
  borderColor = '#78b3e0'
}) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress} 
      style={[styles.buttonContainer, { width, height }]}
    >
      <LinearGradient
        colors={colors}
        style={[styles.gradient, { borderColor }]}
      >
        {/* Light reflection at the top */}
        <View style={styles.reflection} />
        
        {/* White border glow */}
        <View style={styles.glow} />
        
        {/* Text with shadow */}
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 14,
    overflow: 'hidden', // ensures the gradient stays within rounded corners
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    borderColor: '#78b3e0',
    borderWidth: 1,
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  glow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
});

export default GlossyButton;