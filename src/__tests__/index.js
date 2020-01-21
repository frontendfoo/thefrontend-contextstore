import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import TestRenderer from 'react-test-renderer'
import { testHook } from '../utils/testing'
import makeStore from '../'

const { act } = TestRenderer
const renderer = new ShallowRenderer()

describe('The makeStore script', () => {
  describe('The Provider Component', () => {
    it('should match its snapshot', () => {
      const { Provider } = makeStore()
      const render = renderer.render(<Provider>Children</Provider>)
      expect(render).toMatchSnapshot()
    })

    it('should match its snapshot with initialState', () => {
      const { Provider } = makeStore({ test: 'yes' })
      const render = renderer.render(<Provider>Children</Provider>)
      expect(render).toMatchSnapshot()
    })

    it('should match its snapshot with initialState prop', () => {
      const { Provider } = makeStore()
      const render = renderer.render(
        <Provider initialState={{ test: 'yes' }}>Children</Provider>
      )
      expect(render).toMatchSnapshot()
    })

    it('should match its snapshot with initialState and initialState prop merge', () => {
      const { Provider } = makeStore({ test1: 'yes' })
      const render = renderer.render(
        <Provider initialState={{ test2: 'no' }}>Children</Provider>
      )
      expect(render).toMatchSnapshot()
    })
  })

  describe('The useStore hook', () => {
    const { Provider, useStore } = makeStore({ test: 'test state' })
    let hook

    const callHook = () =>
      testHook(() => {
        hook = useStore()
      }, Provider)

    beforeEach(() => {
      callHook()
    })

    it('should have a state Prop', () => {
      expect(hook.state).toEqual({ test: 'test state' })
    })

    it('should update state using setState', () => {
      act(() => {
        hook.setState({ test: 'new state' })
      })
      expect(hook.state).toEqual({ test: 'new state' })
    })
  })
})
