import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  MapView,
  Text,
  View
} from 'react-native'

import geolib from 'geolib'

class Running extends Component {
  constructor(){
    super()
    let watchID = null
    this.state = {
      info: null,
      startPosition: null,
      footprintCoords: []
    }
  }
  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if(position.coords.accuracy > 30){
          alert("GPS 信号不好")
        }
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
        const {latitude,longitude,accuracy} = position.coords
        this.setState({...this.state, info: position.coords})
        const coord = {latitude: latitude-0.002716, longitude: longitude+0.005055}
        //const coord = {latitude: latitude, longitude: longitude}
        const footprintCoords = this.state.footprintCoords.concat([coord])
        const startPosition = [footprintCoords[0]]
        this._distance(footprintCoords)
        this.setState({...this.state,startPosition,footprintCoords})
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10}
    )
  }

  _distance(coords){
    let distance = 0
    if(coords.length > 2){
      for(let i=0;i<coords.length-1;i++){
        const lat0 = coords[i].latitude
        const lon0 = coords[i].longitude
        const lat1 = coords[i+1].latitude
        const lon1 = coords[i+1].longitude
        distance += geolib.getDistance({latitude: lat0,longitude: lon0},{latitude: lat1,longitude: lon1})
      }
    }
    this.setState({...this.state,info: {...this.state.info,distance:distance}})
  }
  render() {
        return (
          <View style={styles.container}>
              <MapView
                showsUserLocation={true}
                followUserLocation={true}
                style={styles.map}
                annotations={this.state.startPosition}
                overlays={[{
                    coordinates: this.state.footprintCoords,
                    strokeColor: ['#f007'],
                    lineWidth: 3,
                }]}
              />
              <View style={styles.detail}>
                <Text>
                  {JSON.stringify(this.state.info)}
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
