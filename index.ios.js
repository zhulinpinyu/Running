import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  View
} from 'react-native'

class Running extends Component {
  constructor(){
    super()
    let watchID = null
    this.state = {
      currentPosition: null
    }
  }
  componentDidMount(){
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position)
    //     //console.log("init:",initialPosition)
    //     this.setState({currentPosition: initialPosition})
    //   },
    //   (error) => alert(error.message),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // )
    this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = JSON.stringify(position)
        console.log("current:",lastPosition)
        this.setState({currentPosition: lastPosition})
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 5}
    )
  }
  render() {
        return (
          <View style={styles.container}>
              <MapView
                showsUserLocation={true}
                followUserLocation={true}
                style={styles.map}
                overlays={[{
                    coordinates:[
                      {latitude: 22.53, longitude: 114.01},
                      {latitude: 22.53, longitude: 114.02},
                      {latitude: 22.53, longitude: 114.03},
                    ],
                    strokeColor: ['#f007'],
                    lineWidth: 3,
                }]}
              />
              <View style={styles.detail}>
                <Text>
                  {this.state.currentPosition}
                </Text>
              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  map:{
    flex: 5
  },
  detail:{
    flex: 1
  }
});

AppRegistry.registerComponent('Running', () => Running);
