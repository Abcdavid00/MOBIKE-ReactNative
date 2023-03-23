import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

// Import types for navigation props
import type { StackScreenProps } from '@react-navigation/stack';
// Define param list for stack navigator
type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>(); // Pass param list as generic

export default function Sandbox(): JSX.Element {
  return (
    <View
      style={{
        backgroundColor: '#786600',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

// Add navigation prop with StackScreenProps type
function HomeScreen({navigation}: StackScreenProps<RootStackParamList, 'Home'>): JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: "#02a1fd", height: "100%", justifyContent:"center", alignItems:"center"}}>
      <Text style={{color: "#fff", fontSize: 50, fontWeight:'bold'}}> Hello
      </Text>
      {/* Use navigation prop to navigate to Details screen */}
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Details')}>
        <Text style={{color:"#fff"}}>Go to details</Text>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

function DetailsScreen(): JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: "#02a1fd", height: "100%", justifyContent:"center", alignItems:"center"}}>
      <Text style={{color: "#fff", fontSize: 50, fontWeight:'bold'}}> Details
      </Text>
    </SafeAreaView>
  );
}

function SettingsScreen(): JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: "#02a1fd", height: "100%", justifyContent:"center", alignItems:"center"}}>
      {/* Close Text tag */}
      <Text style={{color: "#fff", fontSize:
       50, fontWeight:'bold'}}> Settings</Text> 
    </SafeAreaView>
  );
}

