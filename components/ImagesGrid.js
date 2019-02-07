import React, { Component } from 'react'
import {
	AppRegistry,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native'

import PhotoGrid from 'react-native-image-grid'

class ImagesGrid extends Component {
    constructor() {
      super();
      this.state = {
        imageuri: '',
        ModalVisibleStatus: false,
      };
      this.state = { items: [] };
    }
  
    componentWillReceiveProps() {
      var that = this;
      let capturedPhotos = this.props.photos.filter((p => p.captured === true))
      let items = capturedPhotos.map((p, i) => {
        //Using demo placeholder images but you can add your images here
        return { id: i, src: `content://com.testapp.provider/root/${p.path}`, title: p.name };
      });
      that.setState({ items });
    }
    renderHeader() {
      //Header of the Screen
      return <Text style={{
          marginHorizontal: 5,
          marginBottom: 5,
          fontSize:15,
          color:'#2F2F2F',
          borderBottomWidth: 2
        }}>
        Fotografias
        </Text>;
    }
    ShowModalFunction(visible, imageURL) {
      //handler to handle the click on image of Grid
      //and close button on modal
      this.setState({
        ModalVisibleStatus: visible,
        imageuri: imageURL,
      });
    }
  
    renderItem(item, itemSize, itemPaddingHorizontal) {
      //Single item of Grid
      return (
        <TouchableOpacity
          key={item.id}
          style={{
            width: itemSize,
            height: itemSize,
            paddingHorizontal: itemPaddingHorizontal,
          }}
          onPress={() => {
            this.ShowModalFunction(true, item.src);
          }}>

          <Image
            resizeMode="cover"
            style={{ flex: 1 }}
            source={{ uri: item.src + '?' + new Date()}}
          /> 
          <Text
            style={{
                position: 'absolute',
                top: 0,
                left: 1,
                width: '100%',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,.4)',
                padding: 2
            }}
          >{item.title}</Text>
        </TouchableOpacity>
      );
    }
  
    render() {
      if (this.state.ModalVisibleStatus) {
        //Modal to show full image with close button 
        return (
          <Modal
            transparent={false}
            animationType={'fade'}
            visible={this.state.ModalVisibleStatus}
            onRequestClose={() => {
              this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
            }}>
            <View style={styles.modelStyle}>
              <Image
                style={styles.fullImageStyle}
                source={{ uri: this.state.imageuri }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.closeButtonStyle}
                onPress={() => {
                  this.ShowModalFunction(!this.state.ModalVisibleStatus,'');
                }}>
                <Text style={{ width: 50, height: 50, marginTop:16, color: 'white', fontSize: 20, textAlign: 'center'}}>X</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        );
      } else {
        //Photo Grid of images
        return (
          <View style={this.props.visible ? styles.containerStyle : {display: 'none'}}>
          <PhotoGrid
            data={this.state.items}
            itemsPerRow={3}
            //You can decide the item per row
            itemMargin={1}
            itemPaddingHorizontal={1}
            renderHeader={this.renderHeader}
            renderItem={this.renderItem.bind(this)}
          />
          </View>
        );
      }
    }
  }
  
  
  const styles = StyleSheet.create({
    containerStyle: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      marginTop: 20,
    },
    fullImageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '98%',
      resizeMode: 'contain',
    },
    modelStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    closeButtonStyle: {
      width: 50,
      height: 50,
      top: 9,
      right: 9,
      position: 'absolute',
    },
  });
  
  export default ImagesGrid
  AppRegistry.registerComponent('testapp', ImagesGrid)