import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import itemsModule from "./modules/itemsModule"
import ItemEdit from './components/item-edit'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={itemsModule} />
          <Route path="/editItem/:codigo" component={ItemEdit} />
        </div>
      </Router>
  </Provider>
  );
}

export default App;
