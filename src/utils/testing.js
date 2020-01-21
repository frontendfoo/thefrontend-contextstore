import React, { Fragment } from 'react'
import TestRenderer from 'react-test-renderer'

export const testHook = (customHook, Provider = Fragment, initialState) => {
  let hook

  TestRenderer.create(
    <Provider {...(initialState && { initialState })}>
      {React.createElement(() => {
        hook = customHook()
        return null
      })}
    </Provider>
  )

  return hook
}
