import React, { Component } from 'react'
import {
	AppRegistry,
    TextInput,
    View,
    Button,
    StyleSheet,
    Text,
    Alert,
    AsyncStorage
} from 'react-native'
import config from '../config/index'
import Dialog from 'react-native-dialog'

// Require file system
const RNFS = require('react-native-fs')

class IdVerificator extends Component {
    constructor(){
        super()
        this.state = {
            isValid: false,
            selectedId: false,
            userFolder: '',
            dialogVisible: false,
            dialogDescription: 'Ingrese Nuevamente el Número de Actividad',
            validationId: 0,
        }
    }

    handleChange = newId => {
        if (newId.trim().length >= 7 && newId.trim().length <= 7 && !isNaN(newId) && newId % 1 === 0) {
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

    showDialog = () => {
        this.setState({
            dialogVisible: true
        })
    }

    validateId = () => {
        if(this.state.validationId === this.props.id) {
            this.setState({
                dialogVisible: false
            })
            this.addNewUser()
        } else {
            this.setState({
                dialogDescription: 'Error: Los números de Actividad no Coinciden'
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
                        'La carpeta ya existe',
                        [
                          {
                            text: 'Eliminar',
                            onPress: () => {
                                RNFS.unlink(userFolder)
                                AsyncStorage.removeItem(`${this.props.id}`)                                
                                this.props.navigation.navigate('New')
                            },
                            style: 'cancel',
                          },
                          {text: 'Editar', onPress: () => {
                            AsyncStorage.getItem(`${this.props.id}`)
                                .then(oldState => {
                                    if(oldState !== null) {
                                        const newState = JSON.parse(oldState)
                                        newState.userFolder = userFolder
                                        this.props.restoreState(newState)
                                        this.setState({
                                            selectedId: true
                                        })
                                    } else {
                                      this.setState({
                                          selectedId: true,
                                          userFolder: userFolder
                                      })
                                      this.props.changeUserFolder(userFolder)
                                    // Restore state from files 
                                    // const validate = /^[0-9]{6}\([1-9]{1}[0-9]{0,1}\)(.jpg)$/
                                    // const regId = /^[0-9]{6}/g
                                    // const regCode = /\([1-9]{1}[0-9]{0,1}\)/g
                                    // RNFS.readdir(userFolder)
                                    //     .then(images => {
                                    //         let paths = images.map(image => {
                                    //             if (validate.test(image)) {
                                    //                 let newPhoto = {
                                    //                     code: image.match(regCode)[0].replace(/\(|\)/g, ''),
                                    //                     path: `${userFolder}/${image}`
                                    //                 }
                                    //                 return newPhoto
                                    //             }
                                    //         })
                                    //         alert(JSON.stringify(paths))
                                    //     })
                                    }              
                                }) 
                            }},
                        ],
                        {cancelable: true},
                      )
                }
            })
    }

    render(){
        return (
            <View>
                <TextInput 
                    placeholder='Número de Actividad'
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
                    onPress={this.showDialog}
                />
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Verificación de Acta</Dialog.Title>
                    <Dialog.Description>
                        {this.state.dialogDescription}
                    </Dialog.Description>
                    <Dialog.Input 
                        label='Número de Actividad'
                        style={styles.textInput}
                        keyboardType='number-pad'
                        onChangeText={(value) => this.setState({validationId: value})}
                    />
                    <Dialog.Button label='Ingresar' onPress={this.validateId}/>
                    <Dialog.Button label='Cancelar' onPress={() => {this.setState({dialogVisible: false})}}/>
                </Dialog.Container>
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