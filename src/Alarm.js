'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS,
  Alert,
  ListView
} from 'react-native';

let wakeupArray = [];
export class Alarm extends Component {
	constructor(props) {
		var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
		super(props);
		this.state = {
      dataSource: ds.cloneWithRows(wakeupArray),
      timePicked: false
		 }
	}

	componentDidMount() {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(wakeupArray)
		})
	}


	sleepStart(){
		let hours = new Date().getHours();
		let minutes = new Date().getMinutes();
		let sleepCycles = 0;
				wakeupArray = [];

		// takes ~14 minutes to fall asleep
    minutes += 14;
		hours += minutes >= 60;
		minutes %= 60;
		hours %= 12;
    
    // calculating sleep cycles, each 90 minutes and ideally happens 6 times
    while (sleepCycles < 6) {
    	sleepCycles++
      hours += 1;
    	minutes += 30;
      hours += minutes >=60;
			minutes %= 60;
			hours %= 12;

			if (minutes < 10) {
				minutes = ('0' + minutes).slice(-2);
			};
			if (minutes > 10) {
				minutes = minutes
			}; 
			if (hours == 0) {
				hours = 12;
			};
			
			wakeupArray.push(hours + ':' + minutes);

			//adds zero infront of single digit minutes
			if (typeof minutes === 'string') {
				minutes = Number(minutes.substr(1));
    	};
		};	
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(wakeupArray)
		});
}

	renderRow(rowData, sectionID, rowID) {
	 	return (
	    	<TouchableHighlight 
	    		underlayColor='#dddddd' 
	    		style={styles.times} 
	    		onPress={() => {this.alert(rowData)}}>
	        	<Text style={{fontSize: 20, color: '#000000', textAlign: 'center'}} numberOfLines={1}>{rowData}</Text>
	    	</TouchableHighlight>
	  );
	}

	alert(rowData) {
		AlertIOS.alert(
	'Wake Up Time',
	`Set Alarm for ${rowData}?`,
	  [
	    {text: 'Yes', onPress: () => this.timeChosen(rowData)},
	    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
	  ]
		)
	}

	timeChosen(rowData){
		this.setState({
			timePicked: true,
			setTime: rowData
		})
		console.log('Yes', this.state.timePicked)
	}

	render() {
		 let alarmSettings = this.state.timePicked 
		?  (  <View style={styles.timeHasBeenSet}>
      			<Text style={styles.text}>{this.state.setTime}</Text>	
      			<Text onPress={() => {this.setState({timePicked:false})}}>Cancel</Text>		
      	  </View> ) 
    :  (  <View>
				 		<TouchableOpacity onPress={() => {this.sleepStart()}}>
							<Text style={styles.button} >Get Sleep Times</Text>
						</TouchableOpacity>
						<ListView
						style={styles.list}
						dataSource={this.state.dataSource}  
						enableEmptySections={true} 
						renderRow={this.renderRow.bind(this)} />      		
					</View> )



		return(
			<View>
				{alarmSettings}	
			</View>
			)
	}
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#252839',
    borderRadius: 4
  },
  times: {
			flex: 1,
			height: 45
  },
  list: {
  	marginTop: 10
  },
  timeHasBeenSet: {
  	backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
  	fontSize: 70
  }
})


 // ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * 
 // ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * 
 // ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * ~ * 


// export default class AlarmList extends Component {
//   constructor() {
//     super();
//     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//     this.state = {
//       dataSource: ds.cloneWithRows([]),
//       loading: true
//     };
//     this.alarmsRef = this.getRef().child('alarms');
//   }
//   getRef() {
//     return firebase.database().ref();
//   }
//   listenForItems(alarmsRef) {
//     alarmsRef.on('value', (snap) => {
//       var items = [];
//       snap.forEach((child) => {
//         items.push({
//           key: child.key,
//           time: child.val().text,
//           complete: child.val().complete
//         });
//       });

//       this.setState({
//         dataSource: this.state.dataSource.cloneWithRows(items),
//         loading: false
//       });
//     });
//   }
//   componentDidMount() {
//       this.listenForItems(this.alarmsRef);
//   }
//   toggleComplete(bool, key){
//     firebase.database().ref('alarms/'+key).update({complete: bool});
//   }
//   deleteAlarm(key){
//     firebase.database().ref('alarms/'+key).set(null);
//   }
//   renderRow = (data) => {
//     return (
//       <View style={ styles.alarm }>
//         <Text style={ styles.alarmText }>{ data.text }</Text>
//         <View style={{flexDirection:'row', alignItems: 'center'}}>
//           <Switch
//             onValueChange={(value) => this.toggleComplete(!data.complete, data.key)}
//             tintColor="#b5b5b7"
//             onTintColor="#f2b632"
//             thumbTintColor="#252839"
//             value={data.complete} />
//           <TouchableOpacity style={styles.deleteButtonWrapper} onPress={() => {this.deleteAlarm(data.key)}}>
//             <Image source={require('./img/ic_delete_black_24dp_1x.png')} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
//   render() {
//     var loading;
//     if(this.state.loading){
//       loading = (<View>
//         <Text style={styles.loadingText}>Carregando alarms...</Text><ActivityIndicator
//           animating={this.state.loading}
//           style={ styles.loading }
//         />
//       </View>);
//     }
//     return (
//       <View style={ styles.container }>
//         {loading}
//         <ListView
//           enableEmptySections={true}
//           dataSource={this.state.dataSource}
//           renderRow={(rowData) => this.renderRow(rowData)}
//           style={ styles.AlarmList }
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   AlarmList: {
//     flex: 1
//   },
//   alarm: {
//     padding: 16,
//     backgroundColor: '#E7E7E7',
//     borderBottomWidth: 1,
//     borderBottomColor: '#CDCDCD',
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   alarmText: {
//     flex: 1,
//     color: '#252839',
//     fontSize: 16
//   },
//   deleteButtonWrapper: {
//     marginLeft: 12
//   },
//   loading: {
//     padding: 8
//   },
//   loadingText: {
//     paddingTop: 16,
//     textAlign: 'center',
//     color: '#b5b5b7'
//   }
// });






