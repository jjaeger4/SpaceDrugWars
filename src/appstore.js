import {observable, action} from 'mobx';

class AppStore {
  @observable gameid = 0;
  /*
    States:
    0 = Normal State, Show the Table of Spices to Buy/Sell
    1 = Buy / Sell a selected spice
    2 = Travel
    3 = Equipment/Shop
  */
  @observable currentState = 0;
  @observable selectedSpice = 0;
  @observable credits = 0;
  @observable cargo = 0;
  @observable cargoMax = 100;
  @observable cargoFree = 100;
  @observable health = 100;
  @observable healthMax = 100;
  @observable equipment = [];
  @observable day = 1;
  @observable lastday = 30;
  @observable loan = 50000;
  @observable location = 0;

  @observable spiceCargo = [
    { name: 'Paprika', count: 0 },
    { name: 'Cumin', count: 0 },
    { name: 'Marjoram', count: 0 },
    { name: 'Rosemary', count: 0 },
    { name: 'Sage', count: 0 },
    { name: 'Thyme', count: 0 },
    { name: 'Turmeric', count: 0 },
    { name: 'Vanilla Beans', count: 0 },
    { name: 'Saffron', count: 0 },
  ]

  @observable spices = [
    { name: 'Paprika', price: 174 },
    { name: 'Cumin', price: 234 },
    { name: 'Marjoram', price: 455 },
    { name: 'Rosemary', price: 99 },
    { name: 'Sage', price: 762 },
    { name: 'Thyme', price: 344 },
    { name: 'Turmeric', price: 879 },
    { name: 'Vanilla Beans', price: 12100 },
    { name: 'Saffron', price: 23200 },
  ];

  @observable shop = {
    upgrades: [
      { name: 'Cargo Module I', price: 2500 }
    ],
    weapons: [
      { name: 'Simple Laser', price: 10000 }
    ]
  };

  @observable locations = [
    { name: 'Planet 1' },
    { name: 'Planet 1' },
    { name: 'Planet 1' },
  ];

  @action.bound
  init() {
    // Starting credits equal to initial loan amount
    this.credits = this.loan;
  }

  @action.bound
  selectSpice(did) {
    this.selectedSpice = did;
    this.currentState = 1;
  }

  @action.bound
  showTable() {
    this.currentState = 0;
  }
}

const singleton = new AppStore();

export default singleton;