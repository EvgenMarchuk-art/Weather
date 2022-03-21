import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeatherScreen from '../screen/weather';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weather" component={WeatherScreen} />
    </Stack.Navigator>
  );
}
