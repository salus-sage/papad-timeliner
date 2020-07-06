import './main.scss';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root/Root';
import configureStore from './store/main';
import * as qs from 'query-string';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Papad from './components/Papad/Papad';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const {
  resource,
  save,
  callback,
  noFooter,
  noHeader,
  noSourceLink,
  ...hash
} = qs.parse(location.hash);

// Set the hash back
location.hash = qs.stringify({
  resource,
  save,
  callback,
  noFooter,
  noHeader,
  noSourceLink,
  ...hash,
});

const { store, persistor } = configureStore(
  resource,
  typeof save === 'undefined',
  callback
);
const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/papad" component={Papad} />
      <Route path='/papad_details' render={(props) => (
        <Root {...props} store={store}
          persistor={persistor}
          callback={callback}
          hasResource={!!resource}
          noFooter={noFooter === 'true'}
          noHeader={noHeader === 'true'}
          noSourceLink={noSourceLink === 'true'} />
      )}
      />
    </div>
  </Router>
)
render(
  // <Root
  //   store={store}
  //   persistor={persistor}
  //   callback={callback}
  //   hasResource={!!resource}
  //   noFooter={noFooter === 'true'}
  //   noHeader={noHeader === 'true'}
  //   noSourceLink={noSourceLink === 'true'}
  // />,
  // document.getElementById('app')

  routing, document.getElementById('app')
);
