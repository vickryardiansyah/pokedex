import React, { Fragment } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import Evolution from './Evolution'
import { Icon } from 'native-base'

export default class EvolutionChain extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      evolution_chain: []
    }
  }

  componentDidMount(){
    this.loadEvolutionChain()
  }

  loadEvolutionChain = () =>{
    fetch(this.props.urlEvolutionChain)
      .then(res => res.json())
      .then(res => {
        let chain = res.chain
        let evolution_chain = []
        while(chain.evolves_to.length != 0 ){
          const evolution = {
            pokemon: chain.species.url.replace('pokemon-species','pokemon'),
            evolve_to: chain.evolves_to[0].species.url.replace('pokemon-species','pokemon'),
            level: chain.evolves_to[0].evolution_details[0].min_level
          }

          evolution_chain = [...evolution_chain,evolution]
          chain = chain.evolves_to[0]
        }
        this.setState({evolution_chain})
      })
  }

  getEvolutionChain = () => {
    let listEvolution = []

    if(this.state.evolution_chain.length > 0){

      listEvolution = this.state.evolution_chain.map(evolution => {
        return (
          <View key={`${evolution.pokemon} - ${evolution.evolve_to}`} style={styles.evolutionChain} >
            <Evolution url={evolution.pokemon}/>
            <View style={styles.evolutionVector} >
              <Icon name="ios-arrow-round-forward" />
              <Text style={styles.level} >Level {evolution.level ? evolution.level : '?'}</Text>
            </View>
            <Evolution url={evolution.evolve_to}/>
          </View>
        )
      })
    }

    return listEvolution
  }

  render(){
    return (
      <Fragment>
        {this.getEvolutionChain()}
      </Fragment>
    )
  }
}

const styles = StyleSheet.create({
  evolutionChain:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop: 7,
    marginBottom: 7
  },
  evolution:{
    alignItems:"center"
  },
  evolutionVector:{
    alignItems:"center"
  },
  level:{
    fontSize: 12,
    marginTop:5
  }
})
