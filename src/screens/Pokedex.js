import React from "react"
import Config from './../../Config'

import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native"

import {
  Container,
  Content,
  Item,
  Icon,
  Input,
  Text,
  Button,
  Badge,
  Picker
} from 'native-base'

import { capitalize, isObject } from 'lodash'
import HeaderComponent from '../components/HeaderComponent'
import ItemPokedex from "../components/ItemPokedex"
import RBSheet from "react-native-raw-bottom-sheet"
import * as Navigation from './../utils/Navigation'
import Common from "../utils/Common"

export default class Pokedex extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      pokemons: [],
      loading: false,
      offset: 0,
      size: 20,
      selectType: undefined
    }
  }

  componentDidMount(){
    this.loadMorePokemons()
  }

  loadMorePokemons = () => {
    if (!this.state.loading) {
      this.setState({ loading: true })

      fetch(`${Config.apiUrl}pokemon?offset=${this.state.offset}&limit=${this.state.size}`)
        .then(res => res.json())
        .then(res => {
          let pokemons = [ ...this.state.pokemons, ...res.results ]
          this.setState({
            pokemons,
            loading: false,
            offset: this.state.offset + this.state.size
          })
        })
    }
  }

  goToPokemonDetail = (pokemon) => {
    Navigation.navigate('PokemonDetail', { pokemon })
  }

  renderFooter = () => {
    if (!this.state.loading) return null
    return (
      <ActivityIndicator
        size='large'
        style={{ color: '#3c414b', marginVertical: 20 }}
      />
    )
  }

  selectType(value) {
    this.setState({
      selectType: value,
      pokemons: []
    })

    if (value == 'all') {
      this.loadMorePokemons()
    } else {
      this.setState({ loading: true })
      fetch(`${Config.apiUrl}type/${value}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            pokemons: res.pokemon,
            loading: false
          })
        })
    }
  }

  customRight = () => (
    <Button transparent onPress={() => this.RBSheet.open()}>
      <Icon name='ios-options' style={{ color: '#3c414b' }} />
    </Button>
  )

  searchPokemon = () => {
    // encodeURIComponent
  }

  render() {
    const { pokemons } = this.state

    return (
      <Container>
        <HeaderComponent title='Pokedex' />
        <Item picker style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select your SIM"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.selectType}
            onValueChange={this.selectType.bind(this)}
          >
            <Picker.Item label="All" value="all" />
            {
              Common.pokemonTypes.map((item, index) => {
                return (<Picker.Item label={capitalize(item)} value={item} key={index} />) 
              })
            }
          </Picker>
        </Item>
        <Content contentContainerStyle={{ flex: 1 }}>

          <FlatList
            numColumns={2}
            data={pokemons}
            renderItem={({ item, index }) => {
              let data = item
              if (isObject(item.pokemon)) {
                data = item.pokemon
              }
              return (
                <View style={{ flex: 1, marginLeft: (index % 2) * 10 }}>
                  <ItemPokedex onPress={this.goToPokemonDetail.bind(this)} url={data.url} />
                </View>
              )
            }}
            contentContainerStyle={
              pokemons.length < 1 && { flex: 1, alignItems: "center" }
            }
            keyExtractor={item => {
              let data = item
              if (isObject(item.pokemon)) {
                data = item.pokemon
              }
              return data.name
            }}
            onEndReached={this.loadMorePokemons}
            onEndReachedThreshold={0.4}
            ListFooterComponent={this.renderFooter.bind(this)}
            style={{ paddingHorizontal: 15, paddingTop: 15 }}
          />

          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={240}
          >
            <Content>
              <Text style={{ fontSize: 20, color: "#303943", lineHeight: 42, fontWeight: "bold", textAlign: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f1f1', paddingVertical: 3 }}>Filter</Text>
              <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
                <FlatList
                  horizontal
                  data={Common.pokemonTypes}
                  renderItem={({ item, index }) => {
                    return (
                      <Badge style={{ backgroundColor: Common.getColor(item), marginHorizontal: 5 }}>
                        <Text>{capitalize(item)}</Text>
                      </Badge>
                    )
                  }}
                  contentContainerStyle={{ paddingVertical: 10 }}
                  style={{ marginBottom: 15 }}
                />

                <View style={styles.searchContainer}>
                  <Item style={{ borderColor: 'transparent', height: 16 }}>
                    <Input
                      onChangeText={() => {}}
                      placeholder="Cari pokemon"
                      style={{ fontSize: 15 }}
                      placeholderTextColor={'#b1b4b9'}
                    />
                    <Icon name="ios-search" style={{ fontSize: 17, color: '#b1b4b9' }} />
                  </Item>
                </View>

                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20, backgroundColor: '#7580d6', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5 }}>
                  <Text style={{ color: '#FFF' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </Content>
          </RBSheet>

        </Content>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 20,
    backgroundColor: '#f6f6f6',
    paddingVertical: 11,
    paddingHorizontal: 10,
    flex: 1
  }
})
