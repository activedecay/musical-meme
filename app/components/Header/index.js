import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import HeaderText from './HeaderText';
import banner from './banner-eyes.png';
import messages from './messages';

import { selectUsername } from '../../containers/HomePage/selectors';
import { selectLocationState } from 'containers/App/selectors';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        <HeaderText>you want an account</HeaderText>
      </NavBar>);
    return (
      <div>
        <Img src={banner} alt="hi" />
        {content}
      </div>
    );
  }
}

Header.propTypes = {
  username: React.PropTypes.string,
  route: React.PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  username: selectUsername(),
  route: selectLocationState(),
});
export default connect(mapStateToProps)(Header);
