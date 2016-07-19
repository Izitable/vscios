import ReactNative, {ListView, TouchableHighlight, Text, StyleSheet, View, Image} from 'react-native';

import React, {Component} from 'react'

var _navigate;

class Menu extends Component{

  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 != row2
      })
    };
    _navigate = this.props.navigate;
  };

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(['Home', 'Água', 'AnotherComponent', 'Settings'])
    });
  };

  _renderMenuItem(item){
    return(
      <TouchableHighlight style={styles.menuItem} onPress={()=> this._onItemSelect(item)}>
      <Text>{item}</Text>
      </TouchableHighlight>
    );
  };

  _onItemSelect(item){
    _navigate(item);
  };

  render(){
    return(
      <View style={styles.container}>
        <View style = {{flex:4}}>
          <Image
          source = {require('../../images/vidasemcancer.png')}
           style={styles.image}/>
        </View>
        <View style={{flex:2}}>
        <ListView
          dataSource= {this.state.dataSource}
          renderRow={(item) => this._renderMenuItem(item)}
        />
        </View>
      </View>
    );
  }

}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#9eefd7',
        height: 200
    },
    image: {
      top:20,
      position:'relative',
      bottom:0,
      top:40
    },
    menuItem: {
        backgroundColor: '#FFF',
        padding: 10,
    }
});

module.exports = Menu;
