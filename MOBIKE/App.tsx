/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  DatePickerIOSBase,
  DatePickerIOSComponent,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>

      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </SafeAreaView>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };


  const toggleDatePicker = () => {
    setShow(!show);
  }


  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    //   <ScrollView
    //     contentInsetAdjustmentBehavior="automatic"
    //     style={backgroundStyle}>
    //     <Header />
    //     <View
    //       style={{
    //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
    //       }}>
    //       <Section title="Step One">
    //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
    //         screen and then come back to see your edits.
    //       </Section>
    //       <Section title="See Your App">
    //         <ReloadInstructions />
    //       </Section>
    //       <Section title="Debug">
    //         <DebugInstructions />
    //       </Section>
    //       <Section title="Learn More">
    //         Read the docs to discover what to do next:
    //       </Section>
    //       <LearnMoreLinks />
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>
    <SafeAreaView style={{backgroundColor: "#02a1fd", height: "100%", justifyContent:"center", alignItems:"center"}}>
      <Text style={{color: "#fff", fontSize: 50, fontWeight:'bold'}}> Hello
      </Text>
      <View style={{backgroundColor: Colors.white , borderRadius: 20, margin: 20, padding: 10}}>
        <Button title="Press me" onPress={()=>{ console.log(`Running on ${Platform.OS}, version: ${Platform.Version}`); toggleDatePicker()}}/>
      </View>
      <Text style={{color: "#fff", fontSize: 15, fontWeight:'bold'}}> Selected: {date.toLocaleString()}
      </Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display={"spinner"}
          mode={"datetime"}
          onChange={onChange}
        />
      )}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
