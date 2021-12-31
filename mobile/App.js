import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';

import { AuthScreen, MapScreen } from './components';

const App = () => (
  <Router>
    <Stack key='root'>
      <Scene key='auth' component={AuthScreen} title='Login'/>
      <Scene key='home' component={MapScreen} title='Home' />
    </Stack>
  </Router>
)

// const App = () => {

//   return (
//     <View style={styles.container}>
//       <AuthScreen />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default App;