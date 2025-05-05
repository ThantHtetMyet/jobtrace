import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface SparkleProps {
  size: number;
  delay: number;
}

const Sparkle: React.FC<SparkleProps> = ({ size, delay }) => {
  const opacity = new Animated.Value(0);
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);
  const rotate = new Animated.Value(0);
  
  // Enhanced sparkle properties
  const sparkleSize = Math.random() * 8 + 6; // Bigger size between 6-14
  const colors = ['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#9370DB', '#FFF'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const shapes = ['circle', 'square', 'star', 'diamond'];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

  // Add back the shape styles function
  const getShapeStyle = () => {
    switch(randomShape) {
      case 'star':
        return {
          width: sparkleSize,
          height: sparkleSize,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: sparkleSize/2,
          borderRightWidth: sparkleSize/2,
          borderBottomWidth: sparkleSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: randomColor,
        };
      case 'diamond':
        return {
          width: sparkleSize,
          height: sparkleSize,
          backgroundColor: randomColor,
          transform: [{ rotate: '45deg' }],
        };
      default:
        return {
          width: sparkleSize,
          height: sparkleSize,
          backgroundColor: randomColor,
          borderRadius: randomShape === 'circle' ? sparkleSize : 1,
        };
    }
  };
  
  useEffect(() => {
    const animate = () => {
      opacity.setValue(0);
      // Wider spread of sparkles
      translateX.setValue(Math.random() * size - size/2);
      translateY.setValue(Math.random() * size * 1.5 - size/2);
      rotate.setValue(0);
      
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 800, // Longer visibility
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: translateY._value - 25, // Longer travel distance
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(rotate, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View
      style={[
        styles.sparkle,
        getShapeStyle(),
        {
          opacity,
          transform: [
            { translateX },
            { translateY },
            { rotate: spin },
          ],
        },
      ]}
    />
  );
};

// Update sparkle style
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    position: 'absolute',
    borderRadius: 6,
    borderWidth: 2,  // Add black outline
    borderColor: '#000',
  },
  sparkle: {
    position: 'absolute',
    shadowColor: '#FFF',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
});

// Add interface
interface LogoIconProps {
  size?: number;
  color?: string;
}

// Add LogoIcon component
const LogoIcon: React.FC<LogoIconProps> = ({ size = 100, color = '#1565C0' }) => {
  const translateY1 = new Animated.Value(0);
  const translateY2 = new Animated.Value(0);
  const translateY3 = new Animated.Value(0);
  const rotate3 = new Animated.Value(0);
  const scale3 = new Animated.Value(1);

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(translateY1, {
              toValue: -5,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(translateY2, {
              toValue: -3,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(translateY3, {
              toValue: -2,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(rotate3, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scale3, {
              toValue: 1.02,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(translateY1, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(translateY2, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(translateY3, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(rotate3, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(scale3, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animate();
  }, []);

  const spin3 = rotate3.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });

  // In the LogoIcon component return statement
  return (
    <View style={[styles.container, { width: size * 1.5, height: size * 1.5 }]}>
      {[...Array(15)].map((_, i) => (
        <Sparkle key={i} size={size} delay={i * 400} />
      ))}
      
      <Animated.View style={[styles.layer, { 
        width: size * 0.8,
        height: size * 1.0,
        backgroundColor: '#B2E8F9',
        transform: [
          { translateX: -size * 0.2 }, 
          { translateY: -size * 0.2 },
          { translateY: translateY1 }
        ],
        opacity: 0.7,  // More transparent
      }]} />
      <Animated.View style={[styles.layer, { 
        width: size * 0.8,
        height: size * 1.0,
        backgroundColor: '#8DD9F2',
        transform: [
          { translateX: 0 }, 
          { translateY: 0 },
          { translateY: translateY2 }
        ],
        opacity: 0.8,  // Semi-transparent
      }]} />
      <Animated.View style={[styles.layer, { 
        width: size * 0.8,
        height: size * 1.0,
        backgroundColor: '#60C6E7',
        transform: [
          { translateX: size * 0.2 }, 
          { translateY: size * 0.2 },
          { translateY: translateY3 },
          { rotate: spin3 },
          { scale: scale3 }
        ],
        opacity: 0.9,  // Less transparent for front plate
      }]} />
    </View>
  );
};

export default LogoIcon;