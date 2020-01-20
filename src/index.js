import React, { createContext, useState, useMemo, useContext } from 'react'

const makeStore = (initialValue = {}) => {
  const context = createContext()

  const Provider = ({ initialState = {}, children }) => {
    const [state, setState] = useState({ ...initialValue, ...initialState })

    const contextValue = useMemo(() => [state, setState], [state])

    return <context.Provider value={contextValue}>{children}</context.Provider>
  }

  const useStore = () => {
    const [state, setState] = useContext(context)
    return { state, setState }
  }

  return { Provider, useStore }
}

export default makeStore
