import React, { Component } from 'react'
import {
	AppRegistry,
    TextInput,
    View,
    Button,
    StyleSheet,
    Text,
    Alert
} from 'react-native'
import config from '../config/index'

// Require file system
const RNFS = require('react-native-fs')

class IdVerificator extends Component {
    constructor(){
        super()
        this.state = {
            isValid: false,
            selectedId: false,
            userFolder: ''
        }
    }

    handleChange = newId => {
        if (newId.trim().length === 5 && !isNaN(newId) && newId % 1 === 0) {
            this.props.changeId(newId)
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                isValid: false
            })
        }
    }

    addNewUser = () => {
        // Steps to verify the id
        // 1. Check if the is isValid
        // Steps to add new user
        // 1. Determine user pictures folder
        const date = new Date()
        const dateFolder = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        const userFolder = `${RNFS.ExternalStorageDirectoryPath}/${config.MAIN_FOLDER}/${dateFolder}/${this.props.id}`
        // 2. Check if the folder exist
        RNFS.exists(userFolder)
            .then((exists) => {
                if (!exists) {
                    this.setState({
                        selectedId: true,
                        userFolder: userFolder
                    })
                    this.props.changeUserFolder(userFolder)
                    RNFS.mkdir(userFolder).then(() => console.log('Directories created')).catch(err => alert(err))
                } else {
                    Alert.alert(
                        'Confirmación',
                        'La carpeta ya existe desea eliminarla?',
                        [
                          {
                            text: 'Cancelar',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                          {text: 'OK', onPress: () => {
                              RNFS.unlink(userFolder)
                              this.props.navigation.navigate('New')
                            }},
                        ],
                        {cancelable: false},
                      );
                }
            })
    }

    render(){
        return (
            <View>
                <TextInput 
                    placeholder='Número de Acta'
                    placeholderTextColor='#333'
                    onChangeText={this.handleChange}
                    keyboardType='number-pad'
                    style={styles.textInput}
                    editable={!this.state.selectedId}
                />
                <Button
                    title='Verificar'
                    disabled={!this.state.isValid || this.state.selectedId}
                    color='#02A974'
                    margin={5}
                    onPress={this.addNewUser}
                />
                <Text style={this.state.selectedId ? '' : styles.hide}>Carpeta: {this.state.userFolder}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        margin: 5,
        borderBottomWidth: 2
    },
    hide: {
        display: 'none'
    }
})

export default IdVerificator

AppRegistry.registerComponent('testapp', () => IdVerificator)