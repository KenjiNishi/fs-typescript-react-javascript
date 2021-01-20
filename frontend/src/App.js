import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './redux/store';
import itemsModule from "./modules/itemsModule"
import ItemEdit from './components/item-edit'
import OrdersList from './components/order-list'
import OrderCreate from './components/order-create'

import Navbar from './components/navbar'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Route path="/" exact component={OrdersList} />
          <Route path="/new-order" exact component={OrderCreate} />
          <Route path="/produtos" exact component={itemsModule} />
          <Route path="/editItem/:codigo" component={ItemEdit} />
        </div>
      </Router>
  </Provider>
  );
}

export default App;
