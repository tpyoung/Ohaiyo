'use strict';
import React, { Component } from 'react';
import { CurrentTime } from './Time';
import { Weather } from './Weather';
import { DateComponent } from './Date';
import { Alarm } from './Alarm';
import { DreamTab } from './api/Firebase';
import { News } from './News';
import { Traffic } from './Traffic';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  View
} from 'react-native';
const ScrollableTabView = require('react-native-scrollable-tab-view');
const window = Dimensions.get('window');3

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
    	<View style={styles.timeContainer}>
      	<ScrollableTabView 
          tabBarPosition = 'bottom'
          locked = {true}
      		style={styles.tabView} 
          prerenderingSiblingsNumber={Infinity}
      		tabBarActiveTextColor={'#2BDE73'} 
          tabBarInactiveTextColor={'#68757D'}
          tabBarUnderlineStyle={{backgroundColor: '#2BDE73'} }
          tabBarTextStyle={{fontFamily: 'System'}}
      		initialPage={1}>
          <Alarm tab='1' tabLabel='Alarm'/>
          <View tab='2' style={styles.container} tabLabel='Home' >
            <CurrentTime />
            <View style={styles.dateWeatherView}>
              <DateComponent />
              <Weather />
            </View>
            <View style={{alignItems: 'center'}}>
              <View style={{borderWidth: .75, borderColor: '#d6d7da', width: 333, marginBottom: 5, marginTop: 24, opacity: 0.75}}/>
              <News />
              <View style={{borderWidth: .75, borderColor: '#d6d7da', width: 333, marginBottom: -60, marginTop: 24, opacity: 0.75}}/>
              <Traffic />
            </View>
          </View>
  	      <DreamTab tab = '3' tabLabel = 'Dreams' />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818'
  },
  tabView: {
    backgroundColor: '#181818'
  },
  timeContainer: {
		flex: 1,
    backgroundColor: '#181818',
  },
  dateWeatherView: {
    width: window.width,
  	flexDirection: 'row',
  }
});
