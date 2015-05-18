const React = require('react');

const emailHref = [
  'mailto:info@r3dm.com?subject=R3DM%20Contract%20Inquiry&',
  'body=1)+I+need+help+with+...%0d%0a%0d%0a2)+Name+and+organization%0d%0a%0d%0',
  'a3)+phone+number+(optional)%0d%0a%0d%0a4)+budget'
].join('');

const Email = React.createClass({
  displayName: 'Email',

  shouldComponentUpdate() {
    return false;
  },

  render: function() {
    return (
      <section
        className='email'
        id='email'>
        <div className='email_content'>
          <header>
            <h2>
              <a href={ emailHref }>
                info@r3dm.com
              </a>
            </h2>
          </header>
        </div>
      </section>
    );
  }
});

module.exports = Email;
