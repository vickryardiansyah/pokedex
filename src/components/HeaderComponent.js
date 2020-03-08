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
    const { title, light } = this.props
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

        { this.props.title && <Text style={{ ...styles.text, color: baseColor }}>{title}</Text> }
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row'
  },
  pokeball: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: -107,
    right: -50,
    zIndex: -1
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20
  },
})
