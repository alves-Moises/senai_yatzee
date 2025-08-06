import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './src/pages/HomeScreen';
import { PlayScreen } from './src/pages/PlayScreen';
import { RecordsScreen } from './src/pages/RecordsScreen';


const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator ScreenOptions={{ headerShown: false, animation: "none"}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Play" component={PlayScreen}/>
        <Stack.Screen name="Records" component={RecordsScreen} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
