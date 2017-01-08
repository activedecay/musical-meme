import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link as l } from 'react-router';
import styled, {} from 'styled-components';
const Link = styled(l)`
  color: ${hilite};
  text-decoration: none;
  cursor: pointer;
`;
import { push } from 'react-router-redux'

import Img from './Img';
import NavBar from './NavBar';
import banner from './banner-eyes.png';
import messages from './messages';
import { selectUsername, createRouteState } from 'containers/App/selectors';
import { userSignedOut } from 'containers/App/actions';
import { Element, Row, hilite } from 'style/lego';

const A = styled.a`
  color: ${hilite};
  text-decoration: none;
  cursor: pointer;
`;

export class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const content = this.props.username ?
      (<NavBar>
        <Row main="between">
          <Element>
            <Link to="/">
              <FormattedMessage {...messages.home} />
            </Link>
          </Element>
          <Element>
            <A onClick={() => {
              this.props.logOut();
              this.props.dispatch(push('/features'));
            }}>
              <FormattedMessage {...messages.logout} />
            </A>
          </Element>
        </Row>
      </NavBar>) :
      (<NavBar>
        <Row main="center">
          <Element>
            <FormattedMessage {...messages.callToAction} />
          </Element>
          <Element>
            {this.props.route.pathname === '/features'
              ?
              <Link to="/signup">
                <FormattedMessage {...messages.signup} />
              </Link>
              :
              <Link to="/features">
                <FormattedMessage {...messages.features} />
              </Link>
            }
          </Element>
        </Row>
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
  username: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  logOut: React.PropTypes.func,
  route: React.PropTypes.object,
};

export default connect(createStructuredSelector({
  username: selectUsername(),
  route: createRouteState(),
}), dispatch => ({
  logOut: () => dispatch(userSignedOut()),
  dispatch,
}))(Header);
