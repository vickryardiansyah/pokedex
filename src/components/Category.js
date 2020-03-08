import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'

const Category = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} >
      <View style={{ ...styles.category, backgroundColor: props.color ? props.color : '#CCC', overflow: 'hidden'}}>
        <Image source={require('./../../assets/pokeball-white.png')} style={styles.pokeballTop} />
        <Image source={require('./../../assets/pokeball-white.png')} style={styles.pokeball} />
        <Text style={styles.title}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  category: {
    height: 65,
    width: "100%",
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    display: "flex",
    justifyContent: "center",
    shadowColor: "#CCC",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 20,
    fontWeight: "bold",
    zIndex: 10
  },
  pokeballTop: {
    width: 85,
    height: 85,
    opacity: 0.2,
    position: 'absolute',
    top: -55,
    left: -55,
    zIndex: -1
  },
  pokeball: {
    width: 85,
    height: 85,
    opacity: 0.2,
    position: 'absolute',
    bottom: -10,
    right: -25,
    zIndex: -1
  }
})

export default Category