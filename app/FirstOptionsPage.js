import React from 'react';

import { SafeAreaView, StyleSheet, View, Text, ScrollView, Switch, } from 'react-native';

export default class FirstOptionsPage extends React.Component {
static navigationOptions = {
title: 'Preferences',
};

constructor(props) {
super(props)
this.state = {
switch1Value: false,
}
}

toggleSwitch1 = (value) => {
this.setState({ switch1Value: value })
console.log('Switch 1 is: ' + value)
}

render() {
const { navigate } = this.props.navigation;
return (
<SafeAreaView >
<View >
<Text >
Someone likes my post
</Text>
<View >
<Switch
onValueChange={this.toggleSwitch1}
value={this.state.switch1Value}
/>
</View>
</View>
</SafeAreaView >
);
}
}