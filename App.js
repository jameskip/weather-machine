import React from 'react';
import { AppRegistry, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import timestamp from 'unix-timestamp';

import Search from './Components/Search';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      date: new Date(),
      city: 'Austin',
      time: Math.round((new Date()).getTime() / 1000),
    };
  }

  componentDidMount() {
    fetch(`https://api.darksky.net/forecast/254ee42b02caecd90d8cb312d885b884/30.2672,97.7431,${this.state.time}?exclude=currently,hourly,flags`)
      .then((response) => response.json())
      .then((resJson) => {
        this.setState({
          maxTemp: resJson.daily.data[0].temperatureMax,
          minTemp: resJson.daily.data[0].temperatureMin,
          summary: resJson.daily.data[0].summary,
          isLoading: false,
        })
      })
      .catch(error => console.error(error))
  }

  onDateChange(date) {
    let time = timestamp.fromDate(date)
    this.setState({ date: date, time: time })
  }

  onCityChange(city) {
    this.setState({ city: city })
  }

  onSubmit() {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.city}&key=AIzaSyBy3FqMbRxCrDHl3DBwM4LrHLaMaPduBMc`)
      .then((response) => response.json())
      .then((responseJson) => {
        const lat = responseJson.results[0].geometry.location.lat;
        const lng = responseJson.results[0].geometry.location.lng;
        this.setState({ lat: lat, lng: lng})
      })
      .then(() => {
        return fetch(`https://api.darksky.net/forecast/254ee42b02caecd90d8cb312d885b884/${this.state.lat},${this.state.lng},${this.state.time}?exclude=currently,hourly,flags`)
        .then(response => response.json())
        .then((resJson) => {
          this.setState({
            maxTemp: resJson.daily.data[0].temperatureMax,
            minTemp: resJson.daily.data[0].temperatureMin,
            summary: resJson.daily.data[0].summary,
            isLoading: false,
          });
        })
      })
      .catch((error) => console.error(error));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row'}}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.city}> {this.state.city}{"\n\n"}</Text>
        <Text style={styles.summary}>{this.state.summary}{"\n\n"}</Text>
        <Text style={styles.highNlow}>High: {this.state.maxTemp}</Text>
        <Text style={styles.highNlow}>Low: {this.state.minTemp}</Text>
        <View style={styles.picker}>
          <Search
            onSubmit={this.onSubmit.bind(this)}
            onCityChange={this.onCityChange.bind(this)}
            onDateChange={this.onDateChange.bind(this)}
            date={this.state.date}
          />
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
    width: '90%',
    paddingTop: '0%',
  },
  highNlow: {
    fontSize: 20,
  },
  summary: {
    fontSize: 18,
    padding: 10,
  },
  city: {
    fontSize: 24,
  },
});
