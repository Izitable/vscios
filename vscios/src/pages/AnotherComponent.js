import ReactNative, {StyleSheet, Text, View, AlertIOS, ScrollView} from 'react-native'

import React from 'react'

var SearchBar = require('react-native-search-bar');

import PostsListView from '../components/PostsListView';

class AnotherComponent extends React.Component {

    constructor(props){
        super(props);
        this.state= {
          isLoading: true,
          dataSource: []
        }
    }

    componentDidMount() {
        //this.refs.searchBar.focus();
    }


    _getData(text){
      this.setState({ isLoading:true});
      var strings = text.split(' +');
      var query = "http://vidasemcancer.com/wp-json/wp/v2/posts?search=";
      for(var i = 0; i<strings.length; i++){
        query += strings[i];
        if (i < strings.length - 1) {
               query += (",");
           }
      }
      fetch(query)
      .then((response) => response.json())
      .then((responseJson) => this.setState({dataSource: responseJson, isLoading:false}))
      .catch(error => AlertIOS.alert(error.message))
      .done();
    }

    render() {
        var page = this.state.isLoading ?
        (<View/>) :
        (<PostsListView dataSource={this.state.dataSource} navigator={this.props.navigator}/>) ;
        return (
            <View style={{paddingTop:64, flex:1}}>
              <View>
                <SearchBar  ref='searchBar' placeholder='Search'
                  searchBarStyle='minimal'
                  onSearchButtonPress={(text) => this._getData(text)}

                  textFieldBackgroundColor='#9eefd7' />
                </View>
                <View style={styles.container}>
                  <ScrollView >
                    {page}

                  </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

module.exports = AnotherComponent;
