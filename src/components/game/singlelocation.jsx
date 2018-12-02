import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import autobind from 'autobind-decorator';

@observer
export default class Location extends React.Component {
  constructor(props) {
    super(props);
  }

  @autobind
  locationSelect(i) {
    appStore.selectedLocation = i;
  }

  render() {
    let sClass = 'tablerow';
    if (appStore.selectedLocation === this.props.index) {
      sClass += ' selectedLocation';
    }
    return (
      <div
        className={sClass}
        onClick={() => { this.locationSelect(this.props.index); } }
      >
        <div>
          {this.props.location.name} {(appStore.location === this.props.index ? <span className="spiceowned">*</span> : '')}
        </div>
      </div>
    );
  }
}