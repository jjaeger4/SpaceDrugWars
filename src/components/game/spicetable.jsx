import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import FootMenu from './footmenu';
import Spice from './singlespice';

@observer
export default class SpiceTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div id="spicetable" className="container is-rounded">
          {
            appStore.spices.map((d, index) => (
              <Spice
                key={index}
                index={index}
                spice={d}
              />
            ))
          }
        </div>
        <FootMenu />
      </div>
    );
  }
}