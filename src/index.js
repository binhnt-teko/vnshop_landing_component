import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import routes from "./routes/index";

import { Router, Route } from 'react-router-dom'
import history from './history'


import { Provider } from 'react-redux';

import Layout from './layout/index';
import store from './shared/redux';


import './static/index.less';
import Homepage from './pages/preview/index';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Layout >
      <Router history={history} >
        <Route path="/" >
          <Homepage />
        </Route>
      </Router>
    </Layout>
  </Provider>

  ,
  // </React.StrictMode>,
  document.getElementById('react-content')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
