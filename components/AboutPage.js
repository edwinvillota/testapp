import React from 'react';
import { View, Text, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'About title',
  };
  render() {
    return (
      <View>
        <Text>About</Text>
        <Button
          title="Go to Home Screen"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
