import ReactNative, {Platform} from 'react-native';
import _ from 'underscore';
import Water from '../pages/Water';



module.exports = function (scene){
  var componentMap = {
    'Home': {
      title: 'Home',
      id: 'Home',

    },
    'AnotherComponent': {
      title: 'AnotherComponent',
      id: 'AnotherComponent',

    },

    'Posts':{
      title: 'Posts',
      id:'Posts',
    },

    'Água':{
      title: 'Água',
      id:'Água'
    },

    'Settings':{
      title: 'Settings',
      id: 'Settings'
    },

  }
  return componentMap[scene];

}
