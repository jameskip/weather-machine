import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  componentDidMount() {
    return fetch('https://api.darksky.net/forecast/254ee42b02caecd90d8cb312d885b884/42.3601,-71.0589,409467600')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    })
    .catch(error => console.error(error))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
