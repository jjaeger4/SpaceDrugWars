import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import styles from '../../styles/styles.scss';

@observer
export default class FootMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="bottomgameinfo">
          <div>HP: {`${appStore.health} / ${appStore.healthMax}`}</div>
          <div className="footleft"><button type="button" className="btn">Travel</button></div>
          <div className="footright"><button type="button" className="btn">Equipment</button></div>
        </div>
      </div>
    );
  }
}