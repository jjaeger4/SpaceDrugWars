import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import styles from '../../styles/styles.scss';

@observer
export default class MainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="gameinfo">
          <div>Day: {appStore.day} of {appStore.lastday}</div>
          <div>Credits: {appStore.credits}</div>
          <div>Loans: {appStore.loan} <button className="btn is-primary loans">Loans</button></div>
          <div>Cargo: {`${appStore.cargo} / ${appStore.cargoMax}`}</div>
        </div>
      </div>
    );
  }
}