import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { navigationRef, isMountedRef } from './src/utils/Navigation'

import Home from './src/screens/Home'
import Pokedex from './src/screens/Pokedex'
import PokemonDetail from './src/screens/PokemonDetail'

const Stack = createStackNavigator();

export default function AppNavigator() {

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="Pokedex" component={Pokedex} />

        <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}
