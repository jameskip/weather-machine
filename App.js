import React from 'react';
import { AppRegistry, ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import Search from './Components/Search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,

    }
  }

  componentDidMount() {
    console.log(this.state)
    return fetch('https://api.darksky.net/forecast/254ee42b02caecd90d8cb312d885b884/42.3601,-71.0589,409467600?exclude=currently,hourly,flags')
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson)
      this.setState({
        maxTemp: resJson.daily.data[0].temperatureMax,
        minTemp: resJson.daily.data[0].temperatureMin,
        summary: resJson.daily.data[0].summary,
        cityName: "City",
        isLoading: false,
      })
    })
    .catch(error => console.error(error))
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.summary}> {this.state.cityName}{"\n\n"}</Text>
        <Text style={styles.summary}>Summary: {this.state.summary}{"\n\n"}</Text>
        <Text style={styles.highNlow}>High: {this.state.maxTemp}</Text>
        <Text style={styles.highNlow}>Low: {this.state.minTemp}</Text>
        <View style={styles.picker}>
          <Search />
        </View>
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
    paddingBottom: '0%',
  },
  picker: {
    paddingTop: '0%',
  },
  highNlow: {
    fontSize: 20,
  },
  summary: {
    fontSize: 18,
    padding: 10,
  },
});
