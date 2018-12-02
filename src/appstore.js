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
  @observable selectedLocation = -1;

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
    { name: 'Paprika', price: 174, low: 8, high: 42 },
    { name: 'Cumin', price: 234, low: 120, high: 340 },
    { name: 'Marjoram', price: 455, low: 300, high: 700 },
    { name: 'Rosemary', price: 99, low: 75, high: 135 },
    { name: 'Sage', price: 762, low: 669, high: 1300 },
    { name: 'Thyme', price: 344, low: 300, high: 530 },
    { name: 'Turmeric', price: 879, low: 730, high: 1700 },
    { name: 'Vanilla Beans', price: 12100, low: 10100, high: 17000 },
    { name: 'Saffron', price: 23200, low: 15332, high: 28000 },
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
    { name: 'Planet 2' },
    { name: 'Planet 3' },
  ];
  /*
  TODO Price Change are different per planet
  [
    { name: 'Paprika', low: 8, high: 42 },
    { name: 'Cumin', low: 120, high: 340 },
    { name: 'Marjoram', low: 300, high: 700 },
    { name: 'Rosemary', low: 75, high: 135 },
    { name: 'Sage', low: 669, high: 1300 },
    { name: 'Thyme', low: 300, high: 530 },
    { name: 'Turmeric', low: 730, high: 1700 },
    { name: 'Vanilla Beans', low: 10100, high: 17000 },
    { name: 'Saffron', low: 15332, high: 28000 },
  ]
  */

  @action.bound
  init() {
    // Starting credits equal to initial loan amount
    this.credits = this.loan;
    this.doPriceChange();
  }

  @action.bound
  loanInterest() {
    // Loan interest
    if (this.loan > 0) {
      this.loan = Math.ceil(this.loan * 1.15);
    }
  }

  @action.bound
  selectSpice(did) {
    this.selectedSpice = did;
    this.currentState = 1;
  }

  @action.bound
  travel(lid) {
    this.location = lid;
    this.doPriceChange();
    this.loanInterest();
  }

  @action.bound
  showTable() {
    this.currentState = 0;
  }

  @action.bound
  showTravel() {
    this.currentState = 2;
  }

  /* Price Change Formulas */
  @action.bound
  doPriceChange() {
    let price = 0;
    this.spices.forEach((spice) => {
      price = this.randomPrice(spice.low, spice.high);
      spice.price = price;
    });
  }

  randomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}

const singleton = new AppStore();

export default singleton;