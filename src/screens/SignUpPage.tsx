import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { translations } from '../translations';
import LanguageToggle from '../ui_element/LanguageToggle';
import BackButton from '../ui_element/BackButton';
import { setLanguage } from '../redux/slices/languageSlice';

const SignUpPage = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const t = (key: keyof typeof translations.en) => {
    return translations[currentLanguage][key];
  };

  const handleLanguageChange = (language: 'en' | 'my') => {
    dispatch(setLanguage(language));
  };

  const getErrorMessage = (field: string) => {
    if (currentLanguage === 'my') {
      switch (field) {
        case 'name':
          return 'နာမည်ထည့်ရန်လိုအပ်သည်';
        case 'mobile':
          return 'ဖုန်းနံပါတ်ထည့်ရန်လိုအပ်သည်';
        case 'address':
          return 'လိပ်စာထည့်ရန်လိုအပ်သည်';
        case 'title':
          return 'လိုအပ်သောအချက်အလက်များ';
        default:
          return '';
      }
    }
    switch (field) {
      case 'name':
        return 'Name is required';
      case 'mobile':
        return 'Mobile number is required';
      case 'address':
        return 'Address is required';
      case 'title':
        return 'Required Fields';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!name.trim()) {
      errors.push(getErrorMessage('name'));
    }
    if (!mobile.trim()) {
      errors.push(getErrorMessage('mobile'));
    }
    if (!address.trim()) {
      errors.push(getErrorMessage('address'));
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      setModalVisible(true);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Submit with:', { name, mobile, address });
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      {/* Header container with fixed position */}
      <View style={styles.headerContainer}>
        <View style={styles.backButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        
        <View style={styles.languageContainer}>
          <LanguageToggle 
            onLanguageChange={handleLanguageChange}
            initialLanguage={currentLanguage}
          />
        </View>
      </View>
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/sign_up_icon.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            
            <Text style={[styles.welcomeText, { color: isDarkMode ? Colors.white : Colors.black }]}>
              {'Sign-Up'}
            </Text>
            
            <TextInput
              style={[styles.input, { color: isDarkMode ? Colors.white : Colors.black }]}
              placeholder={t('name')}
              placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
              value={name}
              onChangeText={setName}
            />
            
            <TextInput
              style={[styles.input, { color: isDarkMode ? Colors.white : Colors.black }]}
              placeholder={t('mobileNumber')}
              placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
              value={mobile}
              onChangeText={setMobile}
              keyboardType="number-pad"
            />
            
            <TextInput
              style={[styles.input, styles.textArea, { color: isDarkMode ? Colors.white : Colors.black }]}
              placeholder={t('address')}
              placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>{'Submit'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{getErrorMessage('title')}</Text>
            {errorMessages.map((error, index) => (
              <Text key={index} style={styles.modalText}>• {error}</Text>
            ))}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>
                {currentLanguage === 'my' ? 'အိုကေ' : 'OK'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 76,
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    height: 56,
    justifyContent: 'center',
  },
  languageContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    height: 56,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 12,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1565C0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1565C0',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    alignSelf: 'flex-start',
  },
  modalButton: {
    backgroundColor: '#1565C0',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpPage;