import { Cat } from 'thundercats';

import AppActions from '../app/Actions';
import AppStore from '../app/Store';

import ConnectActions from '../connect/Actions';
import ConnectStore from '../connect/Store';

import BlogActions from '../blog/Actions';
import BlogStore from '../blog/Store';

import NavActions from '../nav/Actions';
import NavStore from '../nav/Store';

export default class r3d extends Cat {
  constructor() {
    super();

    this.register(AppActions);
    this.register(AppStore, this);

    this.register(ConnectActions);
    this.register(ConnectStore, this);

    this.register(BlogActions);
    this.register(BlogStore, this);

    this.register(NavActions);
    this.register(NavStore, this);
  }
}
