import React from 'react';
import { 
    View,
    StyleSheet, 
    Text, 
    Button,
    AsyncStorage 
} from 'react-native';

export default class HomePage extends React.Component {
  static navigationOptions = {
    title: 'Menu Pricipal',
    headerStyle: {
        backgroundColor: "#2F2F2F",
    },
    headerTintColor: 'white'
  };

  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
            <Button
            title="Nueva Actividad"
            color="#ED8005"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('New')}
            />
        </View>
        <View style={styles.row}>
            <Button
            title="Ejecutadas"
            color="#02A974"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Ejecution')}
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
    marginBottom: 5
  },
  button: {
    width: 100,
  }

});