import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Card } from 'react-native-elements';

export default class info extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card title="Local Modules">
        {/*react-native-elements Card*/}
          <Text style={styles.paragraph}>
            This is a card from the react-native-elements
          </Text>
        </Card>
        <Button title="go" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  Button: {
    color:"#f194ff"
  }
});