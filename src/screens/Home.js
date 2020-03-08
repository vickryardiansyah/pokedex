import React from "react"
import { View, StyleSheet, Image, Text } from "react-native"

import { Container, Content } from 'native-base'
import Category from './../components/Category'
import * as Navigation from './../utils/Navigation'

export default class Home extends React.Component {

  render() {
    return (
      <Container>
        <Image source={require('./../../assets/pokeball-black.png')} style={styles.pokeball} />
        <Content style={{ padding: 15 }}>
          <Text style={styles.title}>What Pokemon{'\n'}are you looking for?</Text>
          <View style={styles.containerCategory} >
            <View style={styles.groupCategory} >
              <Category onPress={() => Navigation.navigate('Pokedex')} color="#4FC1A6">Pokedex</Category>
              <Category color="#77C4FE">Abilities</Category>
              <Category color="#7C538C">Locations</Category>
            </View>
            <View style={styles.groupCategory} >
              <Category color="#F7786B">Moves</Category>
              <Category color="#FFCE4B">Items</Category>
              <Category color="#B1736C">Type Charts</Category>
            </View>
          </View>
        </Content>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  pokeball: {
    width: 200,
    height: 200,
    opacity: 0.05,
    position: 'absolute',
    top: -107,
    right: -50,
    zIndex: -1
  },
  title: {
    fontSize: 30,
    color: "#303943",
    lineHeight: 42,
    fontWeight: "bold",
    marginBottom: 20
  },
  groupCategory: {
    width: "48%"
  },
  containerCategory: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
