'use-strict'

import ReactNative, {StyleSheet, Text, View, AlertIOS, ScrollView, Image} from 'react-native'

import React from 'react'

import SettingsList from 'react-native-settings-list';

import DatePicker from 'react-native-datepicker';

var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  onNotification: function(notification){
    console.log( 'Notification:' , notification);

  },

  permissions:{
    alert: true,
    badge: true,
    sound: true
  }
})

var Realm = require('realm');

const SettingsSchema={
    name: 'Settings',
    properties:{
        firstTime:{type: 'bool', default:true},

        sleepTime: {type: 'string', default: "23:00"},
        wakeUpTime: {type: 'string', default: "09:00"},

        waterWarning: {type: 'bool', default: true},
        waterWarningMinutesInterval: {type: 'int', default: 60},
        waterAmount:{type: 'int', default: 200},

        breathingWarning: {type: 'bool', default: true},
        breathingWarningMinutesInterval: {type: 'int', default: 60},

        foodWarning: {type: 'bool', default: true},
        breakfastWarning: {type:'bool': default:true},
        breakfastWarningHour: {type:'string': default:"09:00"},
        morningSnackWarning: {type:'bool': default:true},
        morningSnackWarningHour: {type:'string': default:"10:30"},
        lunchWarning: {type:'bool': default:true},
        lunchWarningHour: {type:'string': default:"13:00"},
        afternoonSnackWarning: {type:'bool': default:true},
        afternoonSnackWarningHour: {type:'string': default:"16:00"},
        dinnerWarning: {type:'bool': default:true},
        dinnerWarningHour: {type:'string': default:"21:00"},

        sunWarning: {type: 'bool', default: true},
        sunWarningHour: {type:'string': default:"16:00"},

        meditationWarning: {type: 'bool', default: true},
        meditationWarningHour: {type:'string': default:"16:00"},

        sportsWarning: {type: 'bool', default: true},
        sportsWarningHour: {type:'string': default:"16:00"}

    }
};

let realm = new Realm({schema: [SettingsSchema]});

class Settings extends React.Component{

  constructor(props){
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {
      waterWarning: true,
      nightTime: "22:00",
      dayTime: "09:00",
      settings: this.getSettings()
    };

    PushNotification.localNotificationSchedule({
      message: "Já bebeu água?",
      date: Date.now() + this.state.settings.waterWarningMinutesInterval*60* 1000,
      repeatInterval:'hour'
    });

  }

  getSettings(){
    let settings=realm.objects('Settings');

    //TO REMOVE
    //realm.write(() => {settings[0].firstTime=true});


    if(settings.length==0){
      realm.write(() => {let settings = realm.create('Settings', {})});
    }
    return settings[0];
  }

  render(){

    return (
      <View style={{backgroundColor:'#EFEFF4',flex:1, marginTop:72}}>
        <View style={{backgroundColor:'#EFEFF4',flex:1}}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
              <SettingsList.Header headerStyle={{marginTop:15}}/>

              <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor:'#c8c7cc'}}>
              <View style = {{backgroundColor:'white', flexDirection:'row', height:50}}>
                  <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
                  <View style={[styles.titleBox, {borderBottomWidth:1, borderColor:'#c8c7cc'}]}>
                  <Text style={{fontSize:16, alignSelf:'center', flex:3}}>Hora de Acordar</Text>
                  <DatePicker
                    style={{flex:1}}
                    customStyles={{
                      dateInput: {
                          marginLeft: 36,
                          borderWidth: 0
                        },
                      dateIcon: {
                          width:0,
                          height:0
                      }
                    }}
                    date={this.state.dayTime}
                    mode="time"
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(time) => {this.setState({dayTime: time});}}
                  />
                  </View>
              </View>
              <View style = {{backgroundColor:'white', flexDirection:'row', height:50}}>
                  <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
                  <View style={styles.titleBox}>
                  <Text style={{alignSelf:'center', flex:3, fontSize:16}}>Hora de dormir</Text>
                  <DatePicker
                    style={{flex:1}}
                    customStyles={{
                      dateInput: {
                          marginLeft: 36,
                          borderWidth: 0
                        },
                      dateIcon: {
                          width:0,
                          height:0
                      }
                    }}
                    date={this.state.nightTime}
                    mode="time"
                    format="HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(time) => {this.setState({nightTime: time});}}
                  />
                  </View>
              </View>
            </View>

            <SettingsList.Item
              icon={
                  <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
              }
              hasSwitch={true}
              switchState={this.state.waterWarning}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notificação de água'
              titleStyle={{fontSize:16}}
            />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../images/menu.png')}/>}
              title='Intervalo do aviso'
              titleStyle={{fontSize:16}}
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Blutooth Page')}
            />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../images/menu.png')}/>}
              title='Dose por bebida'
              titleStyle={{fontSize:16}}
              titleInfo='Off'
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Blutooth Page')}
            />
            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={
                  <Image style={styles.imageStyle} source={require('../../images/respiracao.png')}/>
              }
              hasSwitch={true}
              switchState={this.state.waterWarning}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notificação de respirar'
              titleStyle={{fontSize:16}}
            />
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../images/menu.png')}/>}
              title='Intervalo do Aviso'
              titleStyle={{fontSize:16}}
              titleInfoStyle={styles.titleInfoStyle}
              onPress={() => Alert.alert('Route to Wifi Page')}
            />

            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={
                  <Image style={styles.imageStyle} source={require('../../images/sol.png')}/>
              }
              hasSwitch={true}
              switchState={this.state.waterWarning}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notificação de apanhar sol'
              titleStyle={{fontSize:16}}
            />


            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={
                  <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
              }
              hasSwitch={true}
              switchState={this.state.waterWarning}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notificação de meditar'
              titleStyle={{fontSize:16}}
            />


            <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor:'#c8c7cc'}}>
            <View style = {{backgroundColor:'white', flexDirection:'row', height:50}}>
                <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
                <View style={styles.titleBox}>
                <Text style={{alignSelf:'center', flex:3, fontSize:16}}>Hora de Apanhar Sol</Text>
                <DatePicker
                  style={{flex:1}}
                  customStyles={{
                    dateInput: {
                        marginLeft: 36,
                        borderWidth: 0
                      },
                    dateIcon: {
                        width:0,
                        height:0
                    }
                  }}
                  date={this.state.nightTime}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(time) => {this.setState({nightTime: time});}}
                />
                </View>
            </View>
            </View>


            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={
                  <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
              }
              hasSwitch={true}
              switchState={this.state.waterWarning}
              switchOnValueChange={this.onValueChange}
              hasNavArrow={false}
              title='Notificação de desporto'
              titleStyle={{fontSize:16}}
            />



            <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor:'#c8c7cc'}}>
            <View style = {{backgroundColor:'white', flexDirection:'row', height:50}}>
                <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
                <View style={styles.titleBox}>
                <Text style={{alignSelf:'center', flex:3, fontSize:16}}>Hora de Meditar</Text>
                <DatePicker
                  style={{flex:1}}
                  customStyles={{
                    dateInput: {
                        marginLeft: 36,
                        borderWidth: 0
                      },
                    dateIcon: {
                        width:0,
                        height:0
                    }
                  }}
                  date={this.state.nightTime}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(time) => {this.setState({nightTime: time});}}
                />
                </View>
            </View>
            </View>

            <SettingsList.Header headerStyle={{marginTop:15}}/>
            <SettingsList.Item
              icon={<Image style={styles.imageStyle} source={require('../../images/menu.png')}/>}
              title='Avisos de alimentação'
              titleStyle={{fontSize:16}}
              onPress={() => Alert.alert('Route To Cellular Page')}
            />


            <View style={{borderTopWidth:1, borderBottomWidth:1, borderColor:'#c8c7cc'}}>
            <View style = {{backgroundColor:'white', flexDirection:'row', height:50}}>
                <Image style={styles.imageStyle} source={require('../../images/menu.png')}/>
                <View style={styles.titleBox}>
                <Text style={{alignSelf:'center', flex:3, fontSize:16}}>Hora de desporto</Text>
                <DatePicker
                  style={{flex:1}}
                  customStyles={{
                    dateInput: {
                        marginLeft: 36,
                        borderWidth: 0
                      },
                    dateIcon: {
                        width:0,
                        height:0
                    }
                  }}
                  date={this.state.nightTime}
                  mode="time"
                  format="HH:mm"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(time) => {this.setState({nightTime: time});}}
                />
                </View>
            </View>
            </View>

          </SettingsList>
        </View>
      </View>
    );
  }

  onValueChange(value){
    this.setState({waterWarning : value});
  }

}

const styles = StyleSheet.create({
  imageStyle:{
    marginLeft:15,
    alignSelf:'center',
    height:30,
    width:30
  },
  titleInfoStyle:{
    fontSize:16,
    color: '#8e8e93'
  },
  titleBox: {
    flex:1,
    flexDirection:'row',
    marginLeft:15,
  },
});


module.exports = Settings;
