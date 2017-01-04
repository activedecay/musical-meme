import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import HeaderText from './HeaderText';
import banner from './banner-eyes.png';
import messages from './messages';

import { selectUsername } from 'containers/App/selectors';

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const content = this.props.username ?
      (<NavBar>
        <HeaderLink to="/">
          <FormattedMessage {...messages.home} />
        </HeaderLink>
        <HeaderLink to="/signup">
          <FormattedMessage {...messages.signup} />
        </HeaderLink>
      </NavBar>) :
      (<NavBar>
        <HeaderText><FormattedMessage {...messages.callToAction} /></HeaderText>
      </NavBar>);
    return (
      <div>
        <Img src={banner} alt="hi"/>
        {content}
      </div>
    );
  }
}

Header.propTypes = {
  username: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

const mapStateToProps = createStructuredSelector({
  username: selectUsername(),
});
export default connect(mapStateToProps)(Header);
