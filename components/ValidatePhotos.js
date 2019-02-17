import React, { Component } from 'react'
import {
	AppRegistry,
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
    Alert
} from 'react-native'

class ValidatePhotos extends Component {
    constructor() {
        super()
        this.state = {
            validated: false,
            loading: false
        }
    }

    handleClick = () => {
        let actualState = this.state.loading
        // Validate state of photos
        let con = 0
        let nfPhotos = this.props.photos.map((p) => {
            if(!p.captured && p.require) {
                con += 1
                return p.name + '\n'
            }
        })
        let message
        if (con > 0 ) {
            message = `Faltan fotografias por tomar: \n ${nfPhotos.join('')}`
            ToastAndroid.show(message, ToastAndroid.LONG)
        } else {
            message = ''
            Alert.alert(
                'Finalizado',
                'Las fotografias se guardaron correctamente.',
                [
                  {text: 'OK', onPress: () => {
                      this.props.navigation.navigate('Home')
                    }},
                ],
                {cancelable: false},
              )
        }

    }

    render() {
        return(
            <View style={this.props.visible ? '' : styles.hide}>
                <TouchableOpacity 
                    style={styles.validateButton}
                    onPress={this.handleClick}
                    >
                    <Text style={this.state.loading ? styles.hide : stylesVP.validateText}>VALIDAR</Text>
                    <ActivityIndicator 
                        size={30} 
                        color='white'
                        style={this.state.loading ? stylesVP.spinner : styles.hide} 
                        />
                </TouchableOpacity>
            </View>
        )
    }
}

stylesVP = StyleSheet.create({
    validateText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    spinner: {
        
    }
})

export default ValidatePhotos

AppRegistry.registerComponent('testapp', () => ValidatePhotos)