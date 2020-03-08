import React from 'react'
import AppNavigator from './AppNavigator'

import { Root } from 'native-base'
import { ActivityIndicator, View, StatusBar } from 'react-native'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isReady: false
    }
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    this.setState({ isReady: true })
  }

  render() {
    console.disableYellowBox = true

    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <StatusBar backgroundColor='white' barStyle="dark-content" />
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <Root>
        <StatusBar backgroundColor='white' barStyle="dark-content" />
        <AppNavigator />
      </Root>
    )
  }
}
