import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PermissionsAndroid, Platform} from 'react-native';

import Home from './src/Screens/Home/Home';
import Cadastro from './src/Screens/Cadastro/Cadastro';
import Camera from './src/Screens/Camera/Camera';
import Lista from './src/Screens/Lista/Lista';
import Casa from './src/Screens/Casa/Casa';

const Stack = createNativeStackNavigator();

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export default function App() {
  if (Platform.OS === 'android' && !hasAndroidPermission()) {
    return;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
          initialParams={{filePath: 'Nenhuma imagem carregada'}}
        />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Lista" component={Lista} />
        <Stack.Screen name="Detalhes" component={Casa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
