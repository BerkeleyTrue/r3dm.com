import { Store } from 'thundercats';
import debugFactory from 'debug';

const debug = debugFactory('r3dm:component:connect:store');
const { createRegistrar, setter } = Store;

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

    const register = createRegistrar(this);

    function registerSetter(observable) {
      return register(setter(observable));
    }

    registerSetter(
      error
        .tap(({ error }) => debug(
          'An error occured durring mandrill service',
          error
        ))
    );
    registerSetter(onEmailChange);
    registerSetter(onNameChange);
    registerSetter(sending);
    registerSetter(sent);
    registerSetter(setUtc);
  }

  static displayName = 'ConnectStore';
}
