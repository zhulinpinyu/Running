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
      currentPosition: [],
      footprintCoords: []
    }
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {latitude,longitude} = position.coords
        const coord = {latitude: latitude-0.0028, longitude: longitude+0.00505}
        console.log(coord);
        this.setState({...this.state, currentPosition: [coord]})
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
        const lastPosition = JSON.stringify(position)
        const {latitude,longitude} = position.coords
        const coord = {latitude: latitude-0.0028, longitude: longitude+0.00505}
        const footprintCoords = this.state.footprintCoords.concat([coord])
        this.setState({...this.state,footprintCoords})
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 35}
    )
  }
  render() {
        return (
          <View style={styles.container}>
              <MapView
                showsUserLocation={true}
                followUserLocation={true}
                style={styles.map}
                annotations={this.state.currentPosition}
                overlays={[{
                    coordinates: this.state.footprintCoords,
                    strokeColor: ['#f007'],
                    lineWidth: 3,
                }]}
              />
              <View style={styles.detail}>
                <Text>
                  {JSON.stringify(this.state.currentPosition)}
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
