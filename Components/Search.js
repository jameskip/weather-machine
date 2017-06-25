import React from 'react';
import { Text, View, StyleSheet, DatePickerIOS, TextInput, Button, TouchableHighlight } from 'react-native';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      text: 'City...'
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("I am alive!!!!!!", nextProps)
  }

  onDateChange (date) {
    this.setState({ date: date })
  }

  onCityChange (city) {
    this.setState({ city: city })
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
          onPress={() => console.log('Pressed..')}>
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
