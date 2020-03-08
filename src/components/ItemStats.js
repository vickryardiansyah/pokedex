import React from 'react'

import {
  View,
  Text
} from 'react-native'
import { Icon } from 'native-base'
import { capitalize } from 'lodash'

import Common from '../utils/Common'

export default class ItemStats extends React.Component{

  render(){
    const { pokemon } = this.props

    return(
      <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
        <View style={{ width: 200, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={Common.getStatIcon(pokemon.stat.name)} type='MaterialCommunityIcons' style={{ marginRight: 15, fontSize: 22 }} />
          <Text>{capitalize(pokemon.stat.name)}</Text>
        </View>
        <Text>{capitalize(pokemon.base_stat)}</Text>
      </View>
    )
  }
}
