import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import autobind from 'autobind-decorator';

@observer
export default class Spice extends React.Component {
  constructor(props) {
    super(props);
  }

  @autobind
  buysell(i) {
    appStore.selectSpice(i);
  }

  render() {
    return (
      <div
        className="tablerow"
        onClick={() => { this.buysell(this.props.index); } }
      >
        <div className="tableleft">
          {this.props.spice.name} {(appStore.spiceCargo[this.props.index].count > 0 ? <span className="spiceowned">*</span> : '')}
        </div>
        <div className="tableright">
          {this.props.spice.price}
        </div>
      </div>
    );
  }
}