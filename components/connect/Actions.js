import { Actions } from 'thundercats';
import Fetcher from 'fetchr';
import debugFactory from 'debug';

const debug = debugFactory('r3dm:connect:createConnect');

const fetcher = new Fetcher({
  xhrPath: '/api'
});

function mapEventValue(e) {
  return e.target ? e.target.value : '';
}

export default class ConnectActions extends Actions {
  constructor() {
    super([
      'send',
      'sent',
      'error',
      'onEmailChange',
      'onNameChange',
      'setUtc'
    ]);

    this.send.subscribe(payload => {
      debug('Creating email for: ', payload);
      this.sending(true);
      if (process.env.NODE_ENV === 'development') {
        debug('debug mode');
        return setTimeout(() => {
          this.sent(true);
        }, 500);
      }
      fetcher.create('connect', payload, {}, {}, (err, data) => {
        if (err) { return this.error(err); }

        debug('connect service returned without error', data);
        this.sent(true);
      });
    });
  }

  static displayName = 'ConnectActions'

  sending(sending) {
    return {
      sending: sending,
      sent: false,
      error: false
    };
  }

  sent(sent) {
    return {
      sending: false,
      sent: sent,
      error: false
    };
  }

  error(err) {
    return {
      sending: false,
      sent: false,
      error: err
    };
  }

  onEmailChange(e) {
    return {
      email: mapEventValue(e)
    };
  }

  onNameChange(e) {
    return {
      name: mapEventValue(e)
    };
  }

  setUtc(utc) {
    return { utc };
  }
}
