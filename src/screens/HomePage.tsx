import React, { memo } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import GlossyActionButton from '../ui_element/button_glossy_action';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LanguageToggle from '../ui_element/LanguageToggle';
import { setLanguage } from '../redux/slices/languageSlice'; // Fix import path
import { RootState } from '../redux/store';
import { translations } from '../translations';
import { Image } from 'react-native';
import LogoIcon from '../components/LogoIcon';

// Add this new component above HomePage
const PersistentLogo = memo(() => {
  return (
    <LogoIcon 
      size={80} 
      color="#1565C0" 
    />
  );
});

const HomePage = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleEmployerPress = () => {
    navigation.navigate('Login');
  };

  const handleEmployeePress = () => {
    // Navigate to employee section
    // navigation.navigate('EmployeeScreen');
    console.log('Trace Employee button pressed');
  };

  const handleLanguageChange = (language: 'en' | 'my') => {
    dispatch(setLanguage(language));
    console.log(`Language changed to: ${language}`);
  };
  
  // Add this helper function
  const t = (key: keyof typeof translations.en) => {
    return translations[currentLanguage][key];
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.content}>
        <View style={styles.languageContainer}>
          <LanguageToggle 
            onLanguageChange={handleLanguageChange}
            initialLanguage={currentLanguage}
          />
        </View>

        <View style={styles.logoContainer}>
          <PersistentLogo />
        </View>
        
        <View style={styles.buttonContainer}>
          <GlossyActionButton
            title={t('employer')}
            onPress={handleEmployerPress}
            colors={['#1565C0', '#1565C0', '#1565C0', '#1565C0']}
            width={230}
            height={130}
          />
          
          <View style={styles.buttonSpacer} />
          
          <GlossyActionButton
            title={t('traceEmployee')}
            onPress={handleEmployeePress}
            colors={['#1565C0', '#1565C0', '#1565C0', '#1565C0']}
            width={230}
            height={130}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  buttonSpacer: {
    height: 30,
  },
  languageContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default HomePage;