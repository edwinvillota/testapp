import React, { Component } from 'react'
import {
	AppRegistry,
    StyleSheet,
    View,
    AsyncStorage
} from 'react-native'
import IdVerificator from './IdVerificator'
import CaptureButtons from './CaptureButtons'
import ValidatePhotos from './ValidatePhotos'
import config from '../config/index'
//import PhotoCarousel from './PhotoCarousel'
import ImagesGrid from './ImagesGrid'

class NewUser extends Component {
    constructor(){
        super()
        this.state = {
            userId: '',
            userFolder: '',
            userPhotos: []
        }
    }

    componentDidMount(){
        // Initialize photos state
        let photosState = config.REQUIRE_PHOTOS.map(p => {
            p.captured = false
            p.path = ''
            return p
        })

        this.setState({
            userPhotos: photosState
        })
    }

    saveState = async () => {
        try {
            await AsyncStorage.setItem(`${this.state.userId}`, JSON.stringify(this.state))
        } catch (error) {
            alert(error.toString())
        }
    }

    restoreState = newState => {
        this.setState(newState, () => {
            const filter = this.state.userPhotos.filter(p => p.code === 1)
            let modPhoto = filter[0]
            modPhoto.restore = true
            this.handleChangePhotoState(modPhoto)
        })
    }

    handleChangeId = newId => {
        this.setState({
            userId: newId
        })
    }

    handleChangeUserFolder = newFolder => {
        this.setState({
            userFolder: newFolder
        })
    }


    handleChangePhotoState = newPhoto => {
        const newUserPhotos = this.state.userPhotos.map(up => {
            if (up.name === newPhoto.name) {
                if (!newPhoto.restore) {
                    up.captured = true
                } 
            }
            return up
        })
        this.setState({
            userPhotos: newUserPhotos
        }, () => {
            this.saveState()
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <IdVerificator 
                    id={this.state.userId}
                    changeId={this.handleChangeId}
                    changeUserFolder={this.handleChangeUserFolder}
                    navigation={this.props.navigation}
                    restoreState={this.restoreState}
                    />
                <CaptureButtons
                    userId={this.state.userId}
                    userPhotos={this.state.userPhotos}
                    userFolder={this.state.userFolder} 
                    visible={(this.state.userFolder.length > 0)}
                    changePhotoState={this.handleChangePhotoState}
                />
                <ImagesGrid 
                    photos={this.state.userPhotos}
                    visible={(this.state.userFolder.length > 0)}
                />
                <ValidatePhotos 
                    photos={this.state.userPhotos}
                    visible={(this.state.userFolder.length > 0)}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    row: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
      },
    textInput: {
        color: 'red'
    },
    hide: {
        display: 'none'
    },
    validateButton: {
        backgroundColor: '#038be4',
        height: 30
    }
})

export default NewUser

AppRegistry.registerComponent('testapp', () => NewUser)