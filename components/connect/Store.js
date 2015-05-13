import { Store } from 'thundercats';
import { createSetObject } from '../util';
import debugFactory from 'debug';

const debug = debugFactory('r3dm:component:connect:store');

export default class ConnectStore extends Store {
  constructor(r3d) {
    super();
    this.value = {
      email: '',
      error: false,
      name: '',
      sending: false,
      sent: false,
      utc: ''
    };

    const {
      error,
      onEmailChange,
      onNameChange,
      sending,
      sent,
      setUtc
    } = r3d.getActions('connectActions');

    this.register(
      error
        .tap(({ error }) => debug(
          'An error occured durring mandrill service',
          error
        ))
        .map(createSetObject)
    );
    this.register(onEmailChange.map(createSetObject));
    this.register(onNameChange.map(createSetObject));
    this.register(sending.map(createSetObject));
    this.register(sent.map(createSetObject));
    this.register(setUtc.map(createSetObject));
  }

  static displayName = 'ConnectStore';
}
