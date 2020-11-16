import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { actions } from './redux/reducer'

export const App = () => {
  const dispatch = useDispatch()
  const test = useSelector((store: any) => store.counter)

  const action = () => {
    dispatch(actions.increment())
  }
  
  return (
    <div onClick={action}>Test</div>
  )
}
App.displayName = 'AppComponent'
