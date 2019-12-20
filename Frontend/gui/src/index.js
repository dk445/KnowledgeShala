import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Homescreen from './containers/Homscreen';
import Mates from './containers/Mates';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import history from './history';
import Profile from './containers/Profile';
import MakePost from './containers/MakePost';
import Forgot from './containers/forgot';
import SearchAction from './containers/Search';


const routing = (
    <Router history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/feed" component={Homescreen} />
        <Route path="/mates" component={Mates} />
        <Route path="/account" component={Profile}/>
        <Route path="/#" component={App}/>
        <Route path="/post" component={MakePost}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/search" component={SearchAction}/>
      </div>
    </Router>
  )

  ReactDOM.render(routing, document.getElementById('root'))

//ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
