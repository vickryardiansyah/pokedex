import React, { Fragment } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native'

import { capitalize } from 'lodash'

import Common from './../utils/Common'
import Card from './../components/Card'
import EvolutionChain from './../components/EvolutionChain'
import { Container, Content, Tabs, Tab } from 'native-base'
import HeaderComponent from '../components/HeaderComponent'
import ItemStats from '../components/ItemStats'

export default class PokemonDetail extends React.Component {

  constructor(props) {
    super(props)

    this.pokemon = this.props.route.params.pokemon

    this.state = {
      specie: {},
      evolution_chain: []
    }
  }

  componentDidMount() {
    this.getPokemonSpecies()
  }

  getListTypes = () => {
    if(this.pokemon.types !== undefined){
      return this.pokemon.types.map(typeAux => {
        return (
          <Text key={`${this.pokemon.name}-${typeAux.type.name}`} style={styles.type} >
            {capitalize(typeAux.type.name)}
          </Text>
        )
      })
    }
  }

  getPokemonSpecies = () => {
    fetch(this.pokemon.species.url)
      .then(res => res.json())
      .then(res => {
        this.setState({ specie:res })
      })
  }

  getEvlotuinChain = () => {
    if (this.state.specie.evolution_chain !== undefined) {
      return (
        <Fragment>
          <Text style={styles.title}>Evolution Chain</Text>
          <EvolutionChain urlEvolutionChain={this.state.specie.evolution_chain.url} />
        </Fragment>
      )
    }
  }


  render() {
    const pokemon = this.pokemon
    const { specie } = this.state

    return (
      <Container style={{ backgroundColor: Common.getColor(pokemon.types) }}>
        <StatusBar backgroundColor={Common.getColor(pokemon.types)} barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={{ ...styles.header }} >
            <HeaderComponent title={capitalize(pokemon.name)} light={true} />
            <View style={styles.info}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={styles.types} >
                  {this.getListTypes()}
                </View>
                <Text style={styles.pokemonId}>
                  { Common.pokemonId(pokemon.id) }
                </Text>
              </View>
              <View style={styles.teste} >
                <Image style={styles.image} source={Common.getImagePokemon(pokemon)} />
                <Image source={require('./../../assets/pokeball-white.png')} style={styles.pokeball} />
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <Tabs transparent style={{ paddingTop: 0 }} tabBarActiveTextColor={'#3c414b'} tabBarInactiveTextColor={'#ced1d7'} tabBarUnderlineStyle={{ backgroundColor: '#7580d6' }}>

              <Tab heading="About" tabStyle={{ backgroundColor: '#FFF' }} activeTabStyle={{ backgroundColor: '#FFF' }} activeTextStyle={{ fontWeight: 'bold' }}>
                <Content contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                  <Text style={styles.title}>Description</Text>
                  <Text style={styles.description}>{Common.getDescriptionPokemon(specie.flavor_text_entries)}</Text>
                  <Card>
                    <View style={styles.viewHeightWeight} >
                      <View style={styles.dataHeightWeight} >
                        <Text style={styles.titleHeightWeight}>Height</Text>
                        <Text>{Common.getHeightPokemon(pokemon.height)}</Text>
                      </View>
                      <View style={styles.dataHeightWeight} >
                        <Text style={styles.titleHeightWeight}>Weight</Text>
                        <Text>{Common.getWeightPokemon(pokemon.weight)}</Text>
                      </View>
                    </View>
                  </Card>
                </Content>
              </Tab>

              <Tab heading="Base Stats" tabStyle={{ backgroundColor: '#FFF' }} activeTabStyle={{ backgroundColor: '#FFF' }} activeTextStyle={{ fontWeight: 'bold' }}>
                <Content contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                  <Text style={styles.title}>Stats</Text>
                  <FlatList
                    data={pokemon.stats}
                    renderItem={({ item }) => {
                      return (
                        <ItemStats pokemon={item} />
                      )
                    }}
                    keyExtractor={item => item.stat.name}
                  />
                </Content>
              </Tab>

              <Tab heading="Evolution" tabStyle={{ backgroundColor: '#FFF' }} activeTabStyle={{ backgroundColor: '#FFF' }} activeTextStyle={{ fontWeight: 'bold' }}>
                <Content contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}>
                  { this.getEvlotuinChain() }
                </Content>
              </Tab>

            </Tabs>
          </View>
        </View>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    height: 285,
  },
  body: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    overflow: 'hidden',
  },
  title:{
    fontSize: 20,
    color: "#303943",
    lineHeight: 42,
    fontWeight: "bold",
  },
  container: {
    // height: "100%"
  },
  name: {
    fontSize: 30,
    color: "#303943",
    lineHeight: 42,
    fontWeight: "bold",
    color: 'white'
  },
  info: {
    paddingHorizontal: 20,
    height: "100%"
  },
  image: {
    height: 175,
    width: 175,
    zIndex: 1
  },
  pokemonId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  types: {
    flexDirection: "row"
  },
  type: {
    backgroundColor: "rgba(255,255,255,0.2)",
    fontSize: 11,
    color: "white",
    padding: 3,
    borderRadius: 15,
    marginRight: 5,
    textAlign: "center",
    width: 50
  },
  teste: {
    flex: 1,
    alignItems: "center"
  },
  pokeball: {
    width: 125,
    height: 125,
    opacity: 0.3,
    position: 'absolute',
    bottom: 100,
    zIndex: -1
  },
  description: {
    textAlign: 'justify',
    fontWeight: 'bold',
    color: '#555',
    letterSpacing: 0.5,
    marginBottom: 5
  },
  card:{
    flexDirection:'row',
  },
  viewHeightWeight:{
    flexDirection:"row"
  },
  dataHeightWeight:{
    flex: 1,
    alignItems: "center",
    marginBottom:12,
    marginTop: 12,
    fontSize: 14,
  },
  titleHeightWeight: {
    color: "#acb0b4",
    marginBottom: 5
  }
})
