import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import DesignScreen from './src/screens/DesignScreen';
import RunwayScreen from './src/screens/RunwayScreen';
import WardrobeScreen from './src/screens/WardrobeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#FFB6D9',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Lady Fashion House' }}
          />
          <Stack.Screen
            name="Design"
            component={DesignScreen}
            options={{ title: 'Design Your Outfit' }}
          />
          <Stack.Screen
            name="Runway"
            component={RunwayScreen}
            options={{ title: 'Runway Show' }}
          />
          <Stack.Screen
            name="Wardrobe"
            component={WardrobeScreen}
            options={{ title: 'My Wardrobe' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
