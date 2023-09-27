/**
 * Created by mamicrose.
 */

import React from 'react';
import { Provider } from 'react-redux';
import Root from './src/containers/App/App';
import { store } from './src/store';
//import "./ReactotronConfig";
import Constants from "expo-constants";

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;
