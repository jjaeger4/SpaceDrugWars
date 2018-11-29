
import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../appstore';

@observer
export default class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{appStore.test}</div>
    );
  }
}