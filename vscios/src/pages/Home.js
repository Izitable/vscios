import ReactNative, {StyleSheet, Text, View, ListView, AlertIOS, DataSource, TouchableHighlight, Image, WebView} from 'react-native'

import React from 'react';

import Posts from './Posts';

import HTMLView from 'react-native-htmlview';

import {getTheme} from 'react-native-material-kit'



const theme = getTheme();

class Home extends React.Component{

  constructor(props){
		super(props);
    var dataSource = new ListView.DataSource(
		{rowHasChanged: (r1, r2) => r1._id !== r2._id});
    console.log("Home_Constructor");
  	this.state = {
  		searchString: '',
      isLoading: true,
			message: ''
  	};


	}

  componentDidMount(){
    var lol = fetch("http://vidasemcancer.com/wp-json/wp/v2/posts")
      .then((response) => response.json())
      .then((responseData) => {
        var dataSource = new ListView.DataSource(
    		{rowHasChanged: (r1, r2) => r1._id !== r2._id});
        this.setState({dataSource: dataSource.cloneWithRows(responseData), isLoading:false})
    }).catch(error =>
      AlertIOS.alert(
      "GET Response Error",
      "Error -> " + error)
    )
    .done();
  }

  render(){

      console.log('Home.render');

      var listView = this.state.dataSource == null ?
      (<View/>) :
      (<ListView
      dataSource = {this.state.dataSource}
      renderRow={this.renderRow.bind(this)}/>)

      return(
        <View style={styles.container}>
        <View style={{height:72}}/>
        {listView}

        </View>
      );
  }



  _handleResponse(response) {
    console.log(response);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

module.exports = Home;
