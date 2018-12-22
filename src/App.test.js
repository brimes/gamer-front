import React from 'react'
import ReactDOM from 'react-dom'
import App, { PureApp } from './App'
import rootReducer from './reducers'
import LoginScene from './scenes/LoginScene'
import TrackerScene from './scenes/TrackerScene'
import { BrowserRouter, Route } from 'react-router-dom'
import { loadState, saveState } from './models/LocalStorage'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n.js'

const persistedState = loadState()
let store = createStore(rootReducer, persistedState);
store.subscribe(() => {
  saveState(store.getState())
})

it ('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </I18nextProvider>,
    div
  )
})

it ('shows login scene for unauthenticated user', () => {
  const appComponent = shallow(<PureApp isLoggedIn={false} />)
  expect(appComponent.find(Route).prop('component')).toEqual(LoginScene)
})

it ('shows tracker scene for authenticated user', () => {
  const appComponent = shallow(<PureApp isLoggedIn={true} />)
  expect(appComponent.find(Route).prop('component')).toEqual(TrackerScene)
})
