import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native'
import { capitalize } from 'lodash'
import Common from './../utils/Common'

export default class Evolution extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      pokemon:{}
    }
  }


  componentDidMount(){
    this.loadPokemon()   
  }

  loadPokemon = () => {
    fetch(this.props.url).then(res => res.json()).then(pokemon => {
      this.setState({pokemon})
    })
  }


  render(){
    const {pokemon} = this.state

    return(
      <View style={styles.evolution} >
        <Image style={styles.image} source={Common.getImagePokemon(pokemon)} />
        <Text>{capitalize(pokemon.name)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  evolution:{
    alignItems:"center",
    flexDirection:"column"
  },
  image:{
    width: 100,
    height: 100
  }
})
