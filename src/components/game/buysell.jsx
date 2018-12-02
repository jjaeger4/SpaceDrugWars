import {observer} from 'mobx-react';
import React from 'react';
import appStore from '../../appstore';
import FootMenu from './footmenu';
import autobind from 'autobind-decorator';

@observer
export default class BuySell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spice: {},
      maxBuy: 0,
      maxSell: 0,
      buyUnits: 0,
      sellUnits: 0,
    }
  }

  @autobind
  componentDidMount() {
    this.updateMaxAmounts();
  }

  @autobind
  updateMaxAmounts() {
    let d = appStore.spices[appStore.selectedSpice];
    let mb = Math.floor(appStore.credits / d.price);
    mb = (mb > appStore.cargoFree ? appStore.cargoFree : mb);
    let ms = appStore.spiceCargo[appStore.selectedSpice].count;
    this.setState({
      spice: d,
      maxBuy: mb,
      maxSell: ms,
      buyUnits: mb,
      sellUnits: ms,
    });
  }

  @autobind
  updatebuy(e) {
    this.setState({
      buyUnits: e.target.value,
    });
  }

  @autobind
  updatesell(e) {
    this.setState({
      sellUnits: e.target.value
    });
  }

  @autobind
  verifyunits(e) {
    if(e.key.match(/\d/g) === null && e.keyCode !== 8 && e.keyCode !== 46 && e.keyCode !== 13) {
      e.preventDefault();
    } else if (e.keyCode === 13) {
      console.log(this.id);
    }
  }

  @autobind
  focusSelect(e) {
    e.target.select();
  }

  @autobind
  buy() {
    if (appStore.cargoFree >= this.state.buyUnits) {
      // Do the purchase
      appStore.spiceCargo[appStore.selectedSpice].count += parseInt(this.state.buyUnits);
      appStore.cargo += parseInt(this.state.buyUnits);
      appStore.credits -= (parseInt(this.state.spice.price) * parseInt(this.state.buyUnits));
      appStore.cargoFree -= parseInt(this.state.buyUnits);
      // Update new max amounts
      this.updateMaxAmounts();
    } else {
      console.log('You dont have enough cargo space for that');
    }
  }

  @autobind
  sell() {
    // Do you have this many to even sell tho?
    if (appStore.spiceCargo[appStore.selectedSpice].count >= this.state.sellUnits) {
      // Do the sell
      appStore.spiceCargo[appStore.selectedSpice].count -= parseInt(this.state.sellUnits);
      appStore.cargo -= parseInt(this.state.sellUnits);
      appStore.credits += (parseInt(this.state.spice.price) * parseInt(this.state.sellUnits));
      appStore.cargoFree += parseInt(this.state.sellUnits);
      // Update new max amounts
      this.updateMaxAmounts();
    } else {
      console.log('You dont have enough units to sell that many');
    }
  }

  render() {
    return (
      <div>
        <div id="buyselltable" className="container is-rounded">
          <p>{this.state.spice.name} is buying/selling for {this.state.spice.price} per unit.</p>

          <div id="buyfield" className="field">
            Max - {this.state.maxBuy} Units
            <input
              type="text"
              id="buyunits"
              className="input full"
              data-cip-id="buyunits"
              value={this.state.buyUnits}
              onChange={this.updatebuy}
              onKeyDown={this.verifyunits}
              onFocus={this.focusSelect}
              maxLength={18}
            />
            <button
              className="btn is-primary text-center full"
              onClick={this.buy}
            >Buy</button>
          </div>
          <div id="sellfield" className="field">
            Max - {this.state.maxSell} Units
            <input
              type="text"
              id="sellunits"
              className="input full"
              data-cip-id="sellunits"
              value={this.state.sellUnits}
              onChange={this.updatesell}
              onKeyDown={this.verifyunits}
              onFocus={this.focusSelect}
              maxLength={18}
            />
            <button
              className="btn is-error text-center full"
              onClick={this.sell}
            >Sell</button>
          </div>
        </div>
        <button
          className="btn is-error text-center full"
          onClick={appStore.showTable}
        >Back</button>
      </div>
    );
  }
}