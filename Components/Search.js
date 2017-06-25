import React from 'react';
import { Text, View, StyleSheet, DatePickerIOS } from 'react-native';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }

  onDateChange (date) {
    this.setState({ date: date })
  }

  render () {
    return (
      <View>
        <DatePickerIOS date={this.state.date}
          onDateChange={(date) => this.onDateChange(date)}
          mode='date'
          confirmBtnText="Confirm"
        />

        <Text>
          {this.state.date.toString()}
        </Text>

      </View>
    )
  }

};
