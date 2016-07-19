'use-strict'

import ReactNative, {
    StyleSheet,
    Text,
    View,
    AlertIOS,
    TouchableHighlight,
    Image,
    ARTSurfaceView
} from 'react-native'

import React from 'react'

var Realm = require('realm');

const WaterSchema = {
    name: 'Water',
    primaryKey: 'dateKey',
    properties: {
        dateKey: 'int',
        objective: {
            type: 'int',
            default: 2000
        },
        currentLevel: {
            type: 'int',
            default: 0
        },
        date: 'date'
    }
};

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
        breakfastWarning: {type:'bool', default:true},
        breakfastWarningHour: {type:'string', default:"09:00"},
        morningSnackWarning: {type:'bool', default:true},
        morningSnackWarningHour: {type:'string', default:"10:30"},
        lunchWarning: {type:'bool', default:true},
        lunchWarningHour: {type:'string', default:"13:00"},
        afternoonSnackWarning: {type:'bool', default:true},
        afternoonSnackWarningHour: {type:'string', default:"16:00"},
        dinnerWarning: {type:'bool', default:true},
        dinnerWarningHour: {type:'string', default:"21:00"},

        sunWarning: {type: 'bool', default, true},
        sunWarningHour: {type:'string', default:"16:00"},

        meditationWarning: {type: 'bool', default: true},
        meditationWarningHour: {type:'string', default:"16:00"},

        sportsWarning: {type: 'bool', default: true},
        sportsWarningHour: {type:'string', default:"16:00"}

    }
};



let realm = new Realm({schema: [WaterSchema, SettingsSchema]});


class Water extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            water: this.getTodaysWater(),
            waterData : this.getWaterObjects(),

        }




    }



    getWaterObjects(){
      var d = new Date();
      d.setMinutes(0);
      d.setHours(0);
      d.setSeconds(0);
      d.setMilliseconds(0);
      var query = 'dateKey <= "' + d.valueOf() + '" AND dateKey >= "' +(d.valueOf()-(86400000*7)) + '"';

      let water = realm.objects('Water');
      let waterData = water.filtered(query);
      return waterData;
    }

    getWaterData(){

      var data = [];
      for(i=0; i<this.state.waterData.length;i++){
        data.push([this.state.waterData[i].date.valueOf(), parseFloat(this.state.waterData[i].currentLevel)]);
      }

      return data;

    }

    getTodaysWater() {
        var d = new Date();
        d.setMinutes(0);
        d.setHours(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        var query = 'dateKey == "' + d.valueOf() + '"';

        let water = realm.objects('Water');
        let todaysWater = water.filtered(query);

        if (todaysWater.length == 0) {
            realm.write(() => {
                realm.create('Water', {
                    dateKey: d.valueOf(),
                    objective: 2000,
                    currentLevel: 0,
                    date: d
                });
            });

            todaysWater = water.filtered(query);
        }

        return todaysWater[0];

    }

    getImage() {

        if (this.state.water.currentLevel > this.state.water.objective) {
            return (<Image source={require('../../images/water_10.png')}/>);
        } else if (this.state.water.currentLevel > 0.9 * this.state.water.objective) {
            return (<Image source={require('../../images/water_9.png')}/>);
        } else if (this.state.water.currentLevel > 0.8 * this.state.water.objective) {
            return (<Image source={require('../../images/water_8.png')}/>);
        } else if (this.state.water.currentLevel > 0.7 * this.state.water.objective) {
            return (<Image source={require('../../images/water_7.png')}/>);
        } else if (this.state.water.currentLevel > 0.6 * this.state.water.objective) {
            return (<Image source={require('../../images/water_6.png')}/>);
        } else if (this.state.water.currentLevel > 0.5 * this.state.water.objective) {
            return (<Image source={require('../../images/water_5.png')}/>);
        } else if (this.state.water.currentLevel > 0.4 * this.state.water.objective) {
            return (<Image source={require('../../images/water_4.png')}/>);
        } else if (this.state.water.currentLevel > 0.3 * this.state.water.objective) {
            return (<Image source={require('../../images/water_3.png')}/>);
        } else if (this.state.water.currentLevel > 0.2 * this.state.water.objective) {
            return (<Image source={require('../../images/water_2.png')}/>);
        } else if (this.state.water.currentLevel > 0.1 * this.state.water.objective) {
            return (<Image source={require('../../images/water_1.png')}/>);
        }

        return (<Image source={require('../../images/water_0.png')}/>);
    }

    _changeAmount(increasing) {
        var amount = 0;
        if (increasing) {
            amount = 200;
        } else {
            amount = -200;
        }

        realm.write(() => {
            this.state.water.currentLevel += amount;
            if (this.state.water.currentLevel < 0) {
                this.state.water.currentLevel = 0;
            }
        });
        this.forceUpdate();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 5,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.getImage()}
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <View style={styles.container}>
                            <TouchableHighlight style={{height:100, width:100}} onPress={() => this._changeAmount(true)}>
                                <Text>
                                    Up
                                </Text>
                            </TouchableHighlight>
                            <View style={{height:16}}/>
                            <TouchableHighlight style={{height:100, width:100}} onPress={() => this._changeAmount(false)}>
                                <Text style={{alignItems:'center', justifyContent:'center'}}>
                                    Down
                                </Text>
                            </TouchableHighlight>
                        </View>

                    </View>
                </View>

                  <View style={styles.container2}>
                    <Text>
                        Hoje já bebeu {this.state.water.currentLevel/1000} Litros</Text>

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
    container2:{
      flex:2,
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

module.exports = Water;
