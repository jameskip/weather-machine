import React from 'react';
import { Text, View, StyleSheet, DatePickerIOS, TextInput, Button, TouchableHighlight } from 'react-native';
import timestamp from 'unix-timestamp';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <View>
        <Text>
          {'\n\n'}
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={this.props.onCityChange}
          placeholder="Austin"
        />
        <DatePickerIOS date={this.props.date}
          onDateChange={this.props.onDateChange}
          mode='date'
          confirmBtnText="Confirm"
        />
        <TouchableHighlight
          style={{backgroundColor: 'rgb(0, 52, 74)'}}
          onPress={this.props.onSubmit}>
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
    borderWidth: 2
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    textAlign: 'center'
  },
});
