import React from 'react';
import { 
    View,
    StyleSheet, 
    Text, 
    Button 
} from 'react-native';

export default class HomePage extends React.Component {
  static navigationOptions = {
    title: 'Menu Pricipal',
    headerStyle: {
        backgroundColor: "#2F2F2F",
    },
    headerTintColor: 'white'
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
            <Button
            title="Nueva Matricula"
            color="#ED8005"
            style={styles.button}
            onPress={() => this.props.navigation.navigate('New')}
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
    justifyContent: 'center'
  },
  button: {
    width: 50
  }

});