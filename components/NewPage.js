import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import NewUser from './NewUser'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Nueva Matricula',
    headerStyle: {
        backgroundColor: "#2F2F2F",
    },
    headerTintColor: 'white'
  };
  render() {
    return (
      <ScrollView>
        <NewUser navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}
