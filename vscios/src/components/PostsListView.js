'use-strict'

import ReactNative, {StyleSheet, Text, View, ListView, AlertIOS, TouchableHighlight, Image, ScrollView} from 'react-native'
import React from 'react'

import HTMLView from 'react-native-htmlview';

import {getTheme} from 'react-native-material-kit'
const theme = getTheme();
import Posts from '../pages/Posts'


class PostsListView extends React.Component{

  constructor(props){
    super(props);
    var dataSource = new ListView.DataSource(
    {rowHasChanged: (r1, r2) => r1._id !== r2._id});
    this.state= {
      data: dataSource.cloneWithRows(props.dataSource)
    }


  }

  render(){
    var listView = this.state.data == null ?
    (<View/>) :
    (<ListView
    dataSource = {this.state.data}
    renderRow={this.renderRow.bind(this)}/>)

    return(<ScrollView>{listView}</ScrollView>);

  }

  getImage(str){
    var start = str.search('src=');
    var fullString= str.substring(start, str.length);
    var srcString= fullString.split("\" ");
    var imageStr = srcString[0].substring(5, srcString[0].length).replace('-300x94', "")
    console.log(imageStr);
    return(imageStr);
  }

  renderRow(rowData, sectionID, rowID){
    var image = this.getImage(rowData.content.rendered);
		return (
      <TouchableHighlight style={{padding:10}} onPress={()=> this._onItemSelect(rowData.content.rendered)}>

        <View style={theme.cardStyle}>
          <Image style={theme.cardImageStyle} source={{uri: image}}/>
          <View style={{height:20}}/>
          <HTMLView style={theme.cardTitleStyle} value={rowData.excerpt.rendered}/>
        </View>
      </TouchableHighlight>

		);
	}

  _onItemSelect(rendered){
    this.props.navigator.push( {
			title: 'Posts',
			component: Posts,
      id: 'Posts',
      passProps: {
        post: rendered,
        image: this.getImage(rendered)
      }

		}) ;
  }

}

module.exports = PostsListView;
