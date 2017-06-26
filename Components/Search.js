import React from 'react';
import { Text, View, StyleSheet, DatePickerIOS, TextInput, Button, TouchableHighlight } from 'react-native';
import timestamp from 'unix-timestamp';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      city: 'Dallas'
    }
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
          })
        })
      })
      .catch((error) => console.error(error))
  }

  render () {
    return (
      <View>
        <Text>
          {this.state.city}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(city) => this.onCityChange(city)}
          placeholder="   City"
        />
        <DatePickerIOS date={this.state.date}
          onDateChange={(date) => this.onDateChange(date)}
          mode='date'
          confirmBtnText="Confirm"
        />
        <Text>
          {this.state.date.toString()}
        </Text>
        {console.log("this is from search: ", this.state)}

        <TouchableHighlight
          style={{backgroundColor: 'rgb(0, 52, 74)'}}
          onPress={() => this.onSubmit()}>
          <View>
            <Text style={styles.button}>Submit</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  button: {
    fontSize: 30,
    paddingTop: 6,

    textAlign: 'center',
    textAlignVertical: 'auto',
    color: 'white',
    borderColor: 'rgb(119, 216, 230)',
    borderWidth: 4
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2
  },
});
