import React, { PropTypes } from 'react';
import { createContainer } from 'thundercats';
import Ink from 'react-ink';
import debugFactory from 'debug';

import globular from '../globular';

const debug = debugFactory('r3dm:comp:connect:form');

@createContainer({
  actions: 'connectActions',
  map: ({ name, email }) => ({ email, name }),
  store: 'ConnectStore'
})
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static displayName = 'ConnectForm';
  static propTypes = {
    connectActions: PropTypes.object,
    email: PropTypes.string,
    name: PropTypes.string
  }

  componentDidMount() {
    const form = this.refs.form.getDOMNode();
    const { connectActions } = this.props;

    this.setState({ // eslint-disable-line
      height: form.clientHeight
    });

    this.connectSubscription = connectActions.handleConnect
      .tap(e => {
        e.preventDefault();
      })
      .filter(() => {
        return this.props.email || this.props.name;
      })
      .delay(500)
      .tap(() => {
        debug('send connect action');
        this.props.connectActions.send({
          email: this.props.email,
          name: this.props.name,
          utc: new Date().getTimezoneOffset()
        });
      })
      .subscribe(
        () => { globular.ga('send', 'event', 'button', 'click', 'Connect'); },
        err => { debug('an error occured when trying to connect: ', err); }
      );
  }

  componentWillUnmount() {
    if (this.connectSubscription) {
      this.connectSubscription.dispose();
    }
  }

  render() {
    const {
      connectActions,
      name,
      email
    } = this.props;
    const { height } = this.state;

    return (
      <article
        className='connect'
        key='form'
        ref='form'
        style={{ height: height }}>
        <header className='connect_heading'>
          <h2>CONNECT</h2>
        </header>
        <div className='connect_form'>
          <form
            action=''
            className='pure-form'
            onSubmit={ connectActions.handleConnect }>
            <div className='connect_name'>
              <input
                className='connect_input'
                name='name'
                onChange={ connectActions.onNameChange }
                placeholder='your name'
                type='text'
                value={ name } />
            </div>
            <div className='connect_email'>
              <div>
                <input
                  className='connect_input'
                  name='email'
                  onChange={ connectActions.onEmailChange }
                  placeholder='email'
                  type='email'
                  value={ email } />
              </div>
              <div
                className='button'
                onClick={ connectActions.handleConnect }>
                <span>
                  Connect
                  <Ink />
                </span>
              </div>
            </div>
          </form>
        </div>
      </article>
    );
  }
}
