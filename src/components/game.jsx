import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../appstore';
import MainMenu from './game/mainmenu';
import SpiceTable from './game/spicetable';
import BuySell from './game/buysell';

@observer
export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    appStore.init();
  }

  displayGameScreen() {
    switch(appStore.currentState) {
      case 0: return <SpiceTable />
      case 1: return <BuySell />
    }
  }

  render() {
    return (
      <div>
        <MainMenu />
        <div className="container is-rounded">
          Location: {appStore.locations[appStore.location].name}
        </div>
        {this.displayGameScreen()}
      </div>
    );
  }
}