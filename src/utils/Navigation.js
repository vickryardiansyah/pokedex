import * as React from 'react'
import { CommonActions } from '@react-navigation/native'

export const isMountedRef = React.createRef()

export const navigationRef = React.createRef()

export function navigate(name, params) {
  navigationRef.current.navigate(name, params)
}

export function back() {
  navigationRef.current.dispatch(CommonActions.goBack())
}