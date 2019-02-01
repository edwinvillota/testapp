import React, { Component } from 'react'
import {
		AppRegistry,
    StyleSheet,
    Text,
    View,
		TouchableOpacity,
		Button,
    Image,
    TextInput
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Dimensions } from 'react-native'

const RNFS = require('react-native-fs')

const dirhome = `${RNFS.ExternalStorageDirectoryPath}/Picscapture`
const photos = [
  { name: 'Predio', code: 1 },
  { name: 'Medidor', code: 2 },
  { name: 'Kwh', code: 3 },
  { name: 'Kvar', code: 4 },
]
let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

class Camera extends Component {
	constructor(){
		super()
		this.state = {
      id: 0,
      previews: [],
			photo: false
		}
  }
  
  handleChangeId = newId =>  {
    this.setState({
      id: newId
    })
  }

	handleClick = photo => event => {
    event.preventDefault()
    RNFS.mkdir(`${dirhome}/fecha`)
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchCamera(options, (response) => {
      photo.path = `${dirhome}/fecha/${this.state.id}(${photo.code}).jpg`
      photo.uri = response.uri
      photo.data = response.data
      RNFS.moveFile(response.path, photo.path)
        .then((a) => {
          let newPreviews = this.state.previews
          newPreviews.push(photo)
          this.setState({
            previews: newPreviews
          })
        })
        .catch(err => {
          alert('Error de mover archivo')
        })
    })
	}

  render() {
    width = Dimensions.get('window').width
    height = Dimensions.get('window').height
    const buttons = photos.map((p, i) => {
      return (
        <View style={styles.container} key={i}>
          <Button 
            onPress={this.handleClick(p)}
            title={p.name}
          />
        </View>
      )
    })

    const images = this.state.previews.map((p, i) => {
      return(
        <View style={styles.container}>
          <Text style={styles.text}>{p.name}</Text>
          <Image 
            style={{
              width: width,
              height: 300,
              resizeMode: 'center',
            }} 
            source={{uri: 'data:image/jpeg;base64,' + p.data}} 
          /> 
        </View>
      )
    })

    return(
			<View style={styles.container}>
        <TextInput 
          placeholder='Orden'
          placeholderTextColor='#CCC'
          style={styles.textInput}
          onChangeText={this.handleChangeId}
          value={this.state.id}
        />
        {buttons}
        {images}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  textInput: {
    height: 40,
    color: 'white',
  },
  text: {
    color: 'white'
  },

});

export default Camera

AppRegistry.registerComponent('testapp', () => Camera)