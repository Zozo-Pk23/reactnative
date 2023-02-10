import React, { useState, useEffect } from 'react';
import LoginScreen from './src/screens/LoginScreen';
import MyDrawer from './src/Navigator/DrawerNavigator';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';;
const Stack = createStackNavigator();
const App = () => {
  const [token, setToken] = useState(null);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error(error);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>

      {token ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='MyDrawer' component={MyDrawer} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Login' component={LoginScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;