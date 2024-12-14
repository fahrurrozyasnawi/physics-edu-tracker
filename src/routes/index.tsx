import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/Home';
import Header from '@components/header';
import Viscosity from '@screens/Lessons/Viscosity';
import ProjectileMotion from '@screens/Lessons/ProjectileMotion';
import Pendulum from '@screens/Lessons/Pendulum';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Viskositas" component={Viscosity} />
      <Stack.Screen name="Gerak Parabola" component={ProjectileMotion} />
      <Stack.Screen name="Gerak Harmonik" component={Pendulum} />
    </Stack.Navigator>
  );
}
