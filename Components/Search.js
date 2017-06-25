import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, DatePickerIOS } from 'react-native';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {

    }
  }

  render () {
    return (
      <view>
        <DatePickerIOS />
      </view>
    )
  }
};
