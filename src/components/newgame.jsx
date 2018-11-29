
import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../appstore';
import styles from '../styles/styles.scss';
import { Link } from 'react-router-dom';

@observer
export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="main-menu-container" className="container is-rounded">
          <ul id="main-menu">
            <li className="menu-item">
              <Link to="/game"><button>New Game</button></Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}