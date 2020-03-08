import React from 'react'

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import { capitalize } from 'lodash'

import Common from './../utils/Common'

export default class ItemPokedex extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      pokemon: {},
    }
  }

  componentDidMount(){
    fetch(this.props.url).then(res => res.json()).then(pokemon => {
      this.setState({pokemon})
    })
  }

  getListTypes = () => {
    if (this.state.pokemon.types !== undefined) {
      return this.state.pokemon.types.map(typeAux => (
        <Text key={`${this.state.pokemon.name}-${typeAux.type.name}`} style={styles.type}>
          {capitalize(typeAux.type.name)}
        </Text>
      ))
    }
  }

  render(){
    const {pokemon} = this.state
    const {onPress} = this.props

    return(
      <TouchableOpacity onPress={() => onPress(pokemon)} >
        <View style={{...styles.teste, backgroundColor: Common.getColor(pokemon.types)}}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
            <Text style={{ ...styles.pokemonId, color: Common.getColor(pokemon.types) }}>
              {Common.pokemonId(pokemon.id)}
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.infos}>
              {this.getListTypes()}
            </View>
            <Image
              style={styles.image}
              source={Common.getImagePokemon(pokemon)}
            />
          </View>
          <Image source={require('./../../assets/pokeball-white.png')} style={styles.pokeball} />
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -15,
    marginLeft: 13
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 15
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white"
  },
  pokemonId: {
    fontSize: 14,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.20)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20
  },
  infos: {
    flexDirection: "column"
  },
  image: {
    width: 85,
    height: 85,
  },
  teste: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 10,
    overflow: 'hidden',
    flex: 1,
    shadowColor: "#CCC",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  type: {
    backgroundColor: "rgba(255,255,255,0.2)",
    fontSize: 11,
    color: "white",
    padding: 3,
    borderRadius: 15,
    marginTop: 5,
    textAlign: "center",
    width: 50
  },
  pokeball: {
    width: 85,
    height: 85,
    opacity: 0.3,
    position: 'absolute',
    bottom: -10,
    right: -10,
    zIndex: -1
  }
})