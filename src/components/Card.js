import React from 'react'
import { 
  View,
  StyleSheet 
} from 'react-native'

const Card = (props) => {

  return (
    <View style={styles.card} >
      {props.children}
    </View>
  )

}
const styles = StyleSheet.create({
  card:{
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e0e0'
  }
})

export default Card