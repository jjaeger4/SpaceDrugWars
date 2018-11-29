
import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../appstore';
import styles from '../styles/styles.scss';

@observer
export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="container is-rounded">
          A Game
        </div>
      </div>
    );
  }
}