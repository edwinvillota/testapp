import React from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import NewUser from './NewUser'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Nueva Actividad',
    headerLeft: null,
    headerStyle: {
        backgroundColor: "#2F2F2F",
    },
    headerTintColor: 'white'
  };

  handleBackPress = () => {
    return true
  }

  componentDidMount() {
    BackHandler.addEventListener('harwareBackPress', this.handleBackPress)
  }

  render() {
    return (
      <ScrollView>
        <NewUser navigation={this.props.navigation}/>
      </ScrollView>
    );
  }
}
