import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  MapView,
  View
} from 'react-native';

class Running extends Component {
    render() {
          return (
            <View style={styles.container}>
              <MapView
                  showsUserLocation={true}
                  followUserLocation={true}
                  style={styles.map}
                  />
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
        flex:1
    }
});

AppRegistry.registerComponent('Running', () => Running);
