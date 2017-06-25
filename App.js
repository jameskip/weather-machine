import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    return fetch('https://api.darksky.net/forecast/254ee42b02caecd90d8cb312d885b884/42.3601,-71.0589,409467600?exclude=currently,hourly,flags')
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
      this.setState({
        maxTemp: resJson.daily.data[0].temperatureMax,
        minTemp: resJson.daily.data[0].temperatureMin,
        summary: resJson.daily.data[0].summary,
        isLoading: false
      })
    })
    .catch(error => console.error(error))
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Summary: {this.state.summary}{"\n"}</Text>
        <Text>High: {this.state.maxTemp}</Text>
        <Text>Low: {this.state.minTemp}</Text>
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
