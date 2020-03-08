import React from "react"
import { View, StyleSheet, Image, Text, Platform } from "react-native"
import { Button, Icon } from 'native-base'
import * as Navigation from './../utils/Navigation'

export default class HeaderComponent extends React.Component {

  constructor(props) {
    super(props)
    this.pressed = false;
  }

  back = () => {
    !this.pressed && Navigation.back()
    this.pressed = true
  }

  render() {
    const { title, light, customRight } = this.props
    const baseColor = light == true ? '#FFF' : '#3c414b'
    const pokeballColor = light == true ? require('./../../assets/pokeball-white.png') : require('./../../assets/pokeball-black.png')
    const pokeballOpacity = light == true ? 0.2 : 0.05

    return (
      <View>
        <View style={styles.headerContainer}>
          <Image source={pokeballColor} style={{ ...styles.pokeball, opacity: pokeballOpacity }} />
          <Button transparent onPress={this.back}>
            <Icon name='arrow-back' style={{ color: baseColor }} />
          </Button>
        </View>

        <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10 }}>
          { title && <Text style={{ ...styles.text, color: baseColor }}>{title}</Text> }
          { customRight }
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  headerContainer: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  pokeball: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: -117,
    right: -50,
    zIndex: -1
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    flex: 1
  },
})
