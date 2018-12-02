import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import styles from '../../styles/styles.scss';

@observer
export default class FootMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  travel() {
    appStore.showTravel();
  }

  render() {
    console.log(`Location: ${appStore.location}`);
    return (
      <div>
        {(appStore.currentState !== 2 && appStore.currentState !== 3 && (appStore.day < appStore.lastday) &&
          <div id="bottomgameinfo">
            <div>HP: {`${appStore.health} / ${appStore.healthMax}`}</div>
            <div className="footleft">
              <button
                type="button"
                className="btn"
                onClick={this.travel}
              >Travel</button>
            </div>
            <div className="footright"><button type="button" className="btn">Equipment</button></div>
          </div>
        )}
      </div>
    );
  }
}