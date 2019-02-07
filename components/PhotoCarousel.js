import React, { Component } from 'react'
import {
	AppRegistry,
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import Carousel from 'react-native-snap-carousel'

class PhotoCarousel extends Component {

    _renderItem ({item, index}) {
        const uri = `content://com.testapp.provider/root/${item.path}`
        return (
            <View style={styles.slide}>
                <Text 
                    style={styles.title}
                    >
                    { item.name.toUpperCase() }
                </Text>
                <Image source={{uri: uri + '?' + new Date()}}
                    style={
                        {
                            height:300,
                            borderWidth: 1,
                            borderColor: '#2F2F2F'
                        }
                    }
                />
            </View>
        );
    }

    render () {
        const fullWidth = Dimensions.get('window').width
        return (
            <View style={this.props.visible ? styles.visible : styles.hide}>
                <Text style={styles.mainTitle}>FOTOGRAFIAS</Text>
                <Carousel
                    layout='default'
                    ref={(c) => { this._carousel = c; }}
                    data={this.props.photos}
                    renderItem={this._renderItem}
                    sliderWidth={fullWidth}
                    itemWidth={fullWidth - 30}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainTitle: {
        margin: 5,
        borderBottomWidth: 2
    },
    title: {
        backgroundColor: '#2F2F2F',
        color: 'white',
        textAlign: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    hide: {
        display: 'none'
    },
    visible: {
        margin: 5
    }
})

export default PhotoCarousel

AppRegistry.registerComponent('testapp',() => PhotoCarousel)

