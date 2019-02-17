import React from 'react';
import { 
    View, 
    Text, 
    Button,
    StyleSheet,
    AsyncStorage,
    FlatList,
    Alert
 } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Matriculas Ejecutadas',
    headerStyle: {
        backgroundColor: "#2F2F2F",
    },
    headerTintColor: 'white'
  };

  constructor () {
    super()
    this.state = {
        states: []
    }
  }

  componentDidMount(){
    AsyncStorage.getAllKeys()
        .then(keys => {
            this.setState({
                states: keys
            })
        })
  }

  handleClearStates = () => {
    Alert.alert(
      'Eliminar Estados',
      '¿Esta seguro?',
      [
        {
          text: 'Eliminar',
          onPress: () => {
            AsyncStorage.clear()
            this.setState({
                states: []
            })
          },
          style: 'cancel',
        },
        {
          text: 'Cancelar',
          onPress: () => {
            return true
          },
          style: 'cancel',
        },
      ],
      {cancelable: true},
    )

  }

  render() {
    const states = this.state.states.map((s, i) => {
        return(
            <View style={styles.row} key={i}>
                <Text style={styles.text}>{`${i}:   ${s}`}</Text>
            </View>
        )
    })
    return (
      <View style={styles.container}>
        {states}
        <View style={styles.row}>
            <Button
            title="Eliminar Estados"
            onPress={this.handleClearStates}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#CDCDCD',
      justifyContent: 'center'
    },
    row: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 5,
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    }
  });