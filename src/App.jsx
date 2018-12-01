import {observer} from 'mobx-react';

import 'nes.css/css/nes.min.css';
import styles from './styles/styles.scss';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import appStore from './appstore';
import autobind from 'autobind-decorator';
import NewGame from './components/newgame';
import Game from './components/game';

@observer
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <h1 className="title">Spice Wars</h1>
          <span className="version">v1.0.0</span>
          <Route exact path="/" component={NewGame} />
          <Route exact path="/game" component={Game} />
        </div>
      </Router>
    );
  }
};

export default App;
ReactDOM.render(<App />, document.getElementById("app"));