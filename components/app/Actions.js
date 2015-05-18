import { Actions } from 'thundercats';

export default class extends Actions {
  constructor() {
    super([
      'setScroll',
      'setIsScrolling',
      'setWindowHeight'
    ]);
  }
  static displayName = 'AppActions'
}
