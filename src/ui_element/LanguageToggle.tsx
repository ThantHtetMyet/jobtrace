import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';

interface LanguageToggleProps {
  onLanguageChange: (language: 'en' | 'my') => void;
  initialLanguage?: 'en' | 'my';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  onLanguageChange,
  initialLanguage = 'en'
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'my'>(initialLanguage);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'my' : 'en';
    setCurrentLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={toggleLanguage}
      activeOpacity={0.8}
    >
      <View style={styles.toggleContainer}>
        <Text style={[
          styles.text,
          currentLanguage === 'en' ? styles.activeText : styles.inactiveText
        ]}>
          English
        </Text>
        <Text style={styles.separator}>|</Text>
        <Text style={[
          styles.text,
          currentLanguage === 'my' ? styles.activeText : styles.inactiveText
        ]}>
          မြန်မာ
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#1565C0',
    minWidth: 120,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  activeText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#B3E5FC',
  },
  separator: {
    color: '#B3E5FC',
    fontSize: 14,
  },
});

export default LanguageToggle;