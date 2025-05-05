import React, { useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  View,
  Dimensions 
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GlossyActionButtonProps {
  title?: string;
  onPress: () => void;
  width?: number;
  height?: number;
  colors?: string[];
  borderColor?: string;
  fontSize?: number;
}

const GlossyActionButton: React.FC<GlossyActionButtonProps> = ({ 
  title = 'START', 
  onPress, 
  width = Dimensions.get('window').width * 0.6,
  height = 60,
  colors = ['#52a7e0', '#1268c5'],
  borderColor = '#78b3e0',
  fontSize = 24
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handlePressIn = () => {
    setIsPressed(true);
  };
  
  const handlePressOut = () => {
    setIsPressed(false);
  };
  
  const handlePress = () => {
    onPress();
  };

  // Remove the multi-step gradient and use the first color passed
  const backgroundColor = isPressed ? colors[1] : colors[0];
  
  return (
    <View style={[
      styles.buttonOuterShadow, 
      { 
        width, 
        height: height + 9,
        transform: [{ translateY: isPressed ? 4 : 0 }],
        backgroundColor: isPressed ? colors[1] : '#0a4c8a' // Use darker color when pressed
      }
    ]}>
      <TouchableOpacity 
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[
          styles.buttonContainer, 
          { 
            width, 
            height,
            transform: [{ translateY: isPressed ? 3 : 0 }]
          }
        ]}
      >
        <View
          style={[
            styles.gradient, 
            { 
              borderColor,
              backgroundColor
            }
          ]}
        >
          {/* Light reflection at the top */}
          <View style={[
            styles.reflection,
            isPressed && styles.pressedReflection
          ]} />
          
          {/* White border glow */}
          <View style={[
            styles.glow,
            isPressed && styles.pressedGlow
          ]} />
          
          {/* Text with shadow */}
          <Text style={[
            styles.buttonText, 
            { fontSize },
            isPressed && styles.pressedText
          ]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOuterShadow: {
    borderRadius: 12,
    backgroundColor: '#0a4c8a',
    paddingBottom: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#78b3e0',
    borderWidth: 1,
  },
  reflection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '0%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pressedReflection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    height: '0%',
  },
  glow: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)'
  },
  pressedGlow: {
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  pressedText: {
    textShadowRadius: 1,
    textShadowOffset: { width: 0, height: 1 },
  }
});

export default GlossyActionButton;