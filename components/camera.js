import React, { Component } from 'react'
import {
		AppRegistry,
    StyleSheet,
    Text,
    View,
		Button,
    Image,
    TextInput
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Dimensions } from 'react-native'
import config from '../config/index'

const RNFS = require('react-native-fs')
const HOMEDIR = `${RNFS.ExternalStorageDirectoryPath}/${config.MAIN_FOLDER}`

let width = Dimensions.get('window').width

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
    // Validate id
    if (this.state.id === 0) {
      alert('Por favor digite el número de acta')
      return
    } else if (this.state.id.length < 5) {
      alert('El número de acta debe tener 5 digitos')
      return
0    }

    const date = new Date()
    const dateFolder = `${date.getDay()}-${date.getMonth()+1}-${date.getFullYear()}`
    RNFS.mkdir(`${HOMEDIR}/${dateFolder}`)
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
        photo.path = `${HOMEDIR}/${dateFolder}/${this.state.id}(${photo.code}).jpg`
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
            alert('Error de mover archivo' + err)
          })
      }
    })
  }
  
  render() {
    const photoList = config.REQUIRE_PHOTOS
    width = Dimensions.get('window').width
    height = Dimensions.get('window').height
    let midWidth = (width / 2)
    const buttons = photoList.map((p, i) => {
      return (
        <View style={{width: midWidth, padding: 5}} key={i}>
          <Button 
            onPress={this.handleClick(p)}
            title={p.name}
            style={p.require ? styles.buttonRequire : styles.buttonOptional}
            color={p.require ? '#04CA6A' : '#CACDCC'}
          />
        </View>
      )
    })

    const images = this.state.previews.map((p, i) => {
      return(
        <View style={styles.container} key={i}>
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
          placeholder='Número de Acta'
          placeholderTextColor='#CCC'
          style={styles.textInput}
          onChangeText={this.handleChangeId}
          value={this.state.id.toString()}
          keyboardType='number-pad'
        />
        <View 
          style={{
            flex: 1,
            flexDirection: 'column',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            height: 530
          }}
          >
          {buttons}
        </View>
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
    fontSize: 25,
    height: 50,
    color: 'black',
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 5
  },
  text: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  buttonRequire: {
    backgroundColor: '#04CA6A'
  },
  buttonOptional: {
    backgroundColor: '#CACDCC'
  }
});

export default Camera

AppRegistry.registerComponent('testapp', () => Camera)