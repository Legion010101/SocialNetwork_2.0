import React from 'react'
import {createRoot} from 'react-dom/client'
import {App} from './App'
import {Provider} from 'react-redux'
import {store} from './redux/reduxStore'
import {BrowserRouter} from 'react-router-dom'

test('renders with out crashing', () => {
  const container = document.createElement('div')
  const root = createRoot(container)
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  )
  root.unmount()
})
