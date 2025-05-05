import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomePage from './src/screens/HomePage';
import LoginPage from './src/screens/LoginPage';
import SignUpPage from './src/screens/SignUpPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen 
              name="SignUp" 
              component={SignUpPage}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
