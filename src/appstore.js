import {observable, action} from 'mobx';

class AppStore {
  @observable test = "test123";
  @observable lightsOn = false;
  @observable devices = [];
}

const singleton = new AppStore();

export default singleton;