import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import store from './redux/store';
import itemsModule from "./modules/itemsModule"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={itemsModule} />
        </div>
      </Router>
  </Provider>
  );
}

export default App;