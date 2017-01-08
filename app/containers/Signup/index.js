/*
 *
 * Signup
 *
 */

import React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import selectSignup from './selectors';
import { createStructuredSelector } from 'reselect';
import {
  signup, login,
  changeUsername, changePassword, wantsToLogin
} from './actions';
import { FormattedMessage } from 'react-intl';
import messages from './messages'

import styled from 'styled-components';
import {
  Row as r,
  ElementStack,
  Column, Element
} from 'style/lego'
import Button from 'components/Button'
import Input from 'components/Input'

const Row = styled(r)`
  min-height: 20em
`;
const Centered = styled(ElementStack)`
  text-align: center;
`;

export class Signup extends React.Component { // eslint-disable-line
  render() {
    const { username, password, error, loading, login } = this.props.domain;
    const reverse = { reverse: login };
    return (
      <div>
        <Helmet
          title="Signup"
          meta={[
            { name: 'description', content: 'Description of Signup' },
          ]}
        />
        <Row main="around" cross="center" {...reverse}>
          <form
            onSubmit={(event) => {
              login ?
                this.props.onLogin(username, password) :
                this.props.onSignup(username, password);
              event.preventDefault();
            }}
          >
            <Column>
              <Element>
                <ElementStack>
                  <Input
                    placeholder={messages.username.defaultMessage}
                    onChange={(evt) => this.props.onChangeUsername((evt.target.value))}
                    required
                  />
                </ElementStack>
                <ElementStack>
                  <Input
                    type="password"
                    onChange={(evt) => this.props.onChangePassword((evt.target.value))}
                    required
                  />
                </ElementStack>
                <Centered>
                  <Element>
                    {error ?
                      <div>{error}!</div> :
                      loading ?
                        <div>loading...</div> :
                        <Button type="submit">
                          {login ?
                            <FormattedMessage {...messages.login} />
                            :
                            <FormattedMessage {...messages.signup} />
                          }
                        </Button>}
                  </Element>
                </Centered>
              </Element>
            </Column>
          </form>

          <Element>
            <Centered>
              <Button onClick={() => {
                this.props.onWantToLogin(!login)
                this.props.dispatch(push(login ? '/signup' : '/login'))
              }}>
                {login ?
                  <FormattedMessage {...messages.iWantSignup} />
                  :
                  <FormattedMessage {...messages.iWantLogin} />
                }
              </Button>
            </Centered>
          </Element>
        </Row>
      </div>
    );
  }
}

Signup.propTypes = {
  domain: React.PropTypes.object,
  // todo the domain state shape could use a deeper prop type validator
  // username: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.bool,
  // ]),
  // password: React.PropTypes.oneOfType([
  //   React.PropTypes.string,
  //   React.PropTypes.bool,
  // ]),
  onSignup: React.PropTypes.func,
  onLogin: React.PropTypes.func,
  onWantToLogin: React.PropTypes.func,
  onChangeUsername: React.PropTypes.func,
  onChangePassword: React.PropTypes.func,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  domain: selectSignup(),
});

const mapDispatchToProps = (dispatch) => ({
  onSignup: (u, p) => dispatch(signup(u, p)),
  onLogin: (u, p) => dispatch(login(u, p)),
  onWantToLogin: (l) => dispatch(wantsToLogin(l)),
  onChangeUsername: (s) => dispatch(changeUsername(s)),
  onChangePassword: (s) => dispatch(changePassword(s)),
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
