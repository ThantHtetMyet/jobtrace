import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setLanguage } from '../redux/slices/languageSlice';
import { translations } from '../translations';
import LanguageToggle from '../ui_element/LanguageToggle';
import { Image } from 'react-native';
import BackButton from '../ui_element/BackButton';

const LoginPage = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  
  // Remove any useEffect for language syncing if present
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Add useEffect to update language when screen comes into focus
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // This will ensure the component re-renders with the current language when focused
      dispatch(setLanguage(currentLanguage));
    });

    return unsubscribe;
  }, [navigation, currentLanguage]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[currentLanguage][key];
  };

  const handleLogin = () => {
    console.log('Login attempted with:', username, password);
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  // Add this handler function
  const handleLanguageChange = (language: 'en' | 'my') => {
    dispatch(setLanguage(language));
  };

  const handleForgotPassword = () => {
    // For now, just log the action
    console.log('Forgot password pressed');
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.backButton}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      
      <View style={styles.languageContainer}>
        <LanguageToggle 
          onLanguageChange={handleLanguageChange}
          initialLanguage={currentLanguage}
          selectedLanguage={currentLanguage}
        />
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/login_icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            
            <Text style={[styles.welcomeText, { color: isDarkMode ? Colors.white : Colors.black }]}>
              {'Sign-In'}
            </Text>
            
            <TextInput
              style={[styles.input, { color: isDarkMode ? Colors.white : Colors.black }]}
              placeholder={t('username')}
              placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
              value={username}
              onChangeText={setUsername}
              keyboardType="number-pad" // Set to number pad keyboard
            />
            
            <TextInput
              style={[styles.input, { color: isDarkMode ? Colors.white : Colors.black }]}
              placeholder={t('password')}
              placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              keyboardType="number-pad" // Set to number pad keyboard
            />
            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>{t('login')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>
                {currentLanguage === 'my' ? 'စကားဝှက်မေ့နေပါသလား?' : 'Forgot Password?'}
              </Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>{t('noAccount')}</Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.signUpLink}>{t('signUp')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Changed back to center
    alignItems: 'center',
    padding: 20,
    paddingTop: 60, // Reduced top padding
  },
  logoContainer: {
    marginBottom: 40, // Increase bottom margin
    alignItems: 'center',
  },
  logo: {
    width: 80, // Slightly reduce logo size
    height: 80,
    marginBottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    height: 56,
    justifyContent: 'center',
  },
  languageContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    height: 56,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    color: '#666',
  },
  signUpLink: {
    color: '#1565C0',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
    paddingBottom: 40, // Add padding at the bottom
  },
  forgotPasswordContainer: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#1565C0',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;