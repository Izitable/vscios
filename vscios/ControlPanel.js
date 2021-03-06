var ReactNative = require('react-native')

var {
  SwitchIOS,
  View,
  Text
} = ReactNative

var React = require('react')

var styles = require('./styles')
var Button = require('./Button')

module.exports = React.createClass({
  render(){
    return (
      <View style={styles.controlPanel}>
        <Text style={styles.controlPanelWelcome}>
          Control Panel
        </Text>
        <Button
          onPress={this.props.closeDrawer}
          text="Close Drawer"
          />
      </View>
    )
  }
})
