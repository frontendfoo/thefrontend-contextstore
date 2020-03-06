# Context Store

A simple React global state management solution using Context and Custom Hooks.

## Install

```js
$ npm install @thefrontend/contextstore
```

## Usage

### `makestore`

```js
// src/store.js

import makeStore from '@thefrontend/contextstore'

const initialState = {
  message: 'Hello World',
}

export const { useStore, Provider } = makeStore(initialState)
```

### `Provider`

Wrap your App in the provider component.

```js
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from './store'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

The Provider component has a single prop `initialState` which is spread into the object passed into `makeStore`. So any properties with the same name will be overwriten.

```js
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from './store'

const mergeWithState = {
  anotherMessage: 'Hello Universe',
}

ReactDOM.render(
  <Provider initialState={mergeWithState}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

### `useStore`

Access your global store with the `useStore` hook.

In a Component.

```js
// src/components/App.js

import React from 'react'
import { useStore } from '../store'

const App = () => {
  const { state, setState } = useStore()

  const handleChange = e => setState({ message: e.target.value })

  return (
    <div>
      <h1>{state.message}</h1>
      <input type="text" onChange={handleChange} />
    </div>
  )
}

export default App
```

In a Custom Hook.

```js
// src/hooks/useMessage.js

import { useMemo, useCallback } from 'react'
import { useStore } from '../store'

const useMessage = () => {
  const { state, setState } = useStore()

  const message = useMemo(() => state.message, [state.message])

  const setMessage = useCallback(
    newMessage =>
      setState(state => ({
        ...state,
        message: newMessage,
      })),
    [setState]
  )

  const handleMessage = useCallback(e => setMessage(e.target.value), [
    setMessage,
  ])

  return {
    setMessage,
    handleMessage,
    message,
  }
}

export default useMessage
```

Then in a component call the `useMessgage` hook. This keeps your logic seperated from your view component.

```js
// src/components/App.js

import React from 'react'
import useMessage from '../hooks/useMessage'

const App = () => {
  const { handleMessage, message } = useMessage()

  return (
    <div>
      <h1>{message}</h1>
      <input type="text" onChange={handleMessage} />
    </div>
  )
}

export default App
```
