'use strict';
import ReactNative, {StyleSheet, Text, ScrollView, AlertIOS, WebView, Image} from 'react-native'

import React from 'react'

import HTMLView from 'react-native-htmlview'

import {getTheme} from 'react-native-material-kit'

const theme = getTheme();

class Posts extends React.Component{

  constructor(props){
    super(props);
    this.state = {
  		content: props.route.passProps.post,
      image: props.route.passProps.image
    };
  }

  render(){
      return(
        <ScrollView style={theme.cardStyle}>
          <Image style={theme.cardImageStyle} source={{uri: this.state.image}}/>
          <HTMLView value={this.state.content}/>
        </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:72,
    paddingLeft:32,
    paddingRight:32,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Posts;
