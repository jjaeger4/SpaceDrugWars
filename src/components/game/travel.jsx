import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import Location from './singlelocation';

@observer
export default class Travel extends React.Component {
  constructor(props) {
    super(props);
  }

  cancelTravel() {
    // We need to reset the selected location if you choose to go back
    appStore.selectedLocation = -1;
    appStore.showTable();
  }

  doTravel() {
    appStore.travel(appStore.selectedLocation);
    appStore.showTable();
    appStore.day += 1;
    appStore.selectedLocation = -1;
  }

  render() {
    return (
      <div>
        <div id="spicetable" className="container is-rounded">
          {
            appStore.locations.map((d, index) => (
              <Location
                key={index}
                index={index}
                location={d}
              />
            ))
          }
        </div>
        <div>
          {(appStore.selectedLocation !== -1 &&
            <button
              className="btn is-success text-center full"
              onClick={this.doTravel}
            >Go</button>
          )}
          <button
            className="btn is-error text-center full"
            onClick={this.cancelTravel}
          >Cancel</button>
        </div>
      </div>
    );
  }
}