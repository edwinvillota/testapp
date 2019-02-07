import React, { Component } from 'react'
import {
	AppRegistry,
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {Dimensions} from 'react-native'

const RNFS = require('react-native-fs')

class CaptureBtn extends Component {
    constructor(){
        super()
        this.state = {
            color: '#2F2F2F'
        }
    }
    
    componentWillReceiveProps(){
        const p = this.props.photo
        let newColor = '#2F2F2F' 
        if (!p.require && !p.captured){
            newColor = '#999898'
        } else if (p.captured) {
            newColor = '#02A974'
        }
        this.setState({
            color: newColor
        })
    }

    handleClick = event => {
        event.preventDefault()
        let newPhoto = this.props.photo

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        }

        ImagePicker.launchCamera(options, (response) => {
            if(!response.didCancel) {
              newPhoto.path = `${this.props.userFolder}/${this.props.userId}(${newPhoto.code}).jpg`
              newPhoto.uri = response.uri
              RNFS.moveFile(response.path, newPhoto.path)
                .then((a) => {
                    newPhoto.captured = true
                    this.props.changePhotoState(newPhoto)
                    RNFS.unlink(response.path)
                })
                .catch(err => {
                  alert('Error de mover archivo' + err)
                })
            }
        })
    }

    render(){
        const p = this.props.photo
        return(
            <Button
                title={p.name}
                color={this.state.color}
                onPress={this.handleClick}
            />
        )
    }
}

class CaptureButtons extends Component {
    constructor(){
        super()
    }

    render(){
        const photolist = this.props.userPhotos
        const fullWidth = Dimensions.get('window').width
        const visible = this.props.visible ? 'flex' : 'none'
        const buttons = photolist.map((p, i) => {
            return(
                <View 
                    key={i}
                    style={{
                        width: (fullWidth / 2),
                        padding: 5
                    }}>
                    <CaptureBtn
                        photo={p}
                        changePhotoState={this.props.changePhotoState}
                        userFolder={this.props.userFolder}
                        userId={this.props.userId}
                    />
                </View>
            )
        })

        return(
            <View style={{
                flex: 1,
                flexDirection: 'column',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                height: 510,
                display: visible
                }}>
                {buttons}
            </View>
        )
    }
}

styles = StyleSheet.create({
    hide: {
        display: 'none'
    }
})

export default CaptureButtons

AppRegistry.registerComponent('testapp',() => CaptureButtons)