/*
 *
 * Signup
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import selectSignup from './selectors';
import { createStructuredSelector } from 'reselect';

import { signup, changeUsername, changePassword } from './actions';

import styled from 'styled-components';
import { Row as r, Column, ElementStack as es,
  Element, hilite, lite, dark } from 'style/lego'

const Row = styled(r)`
  height: 30em
`;
const ElementStack = styled(es)`
  text-align: center;
`;
const Input = styled.input`{
  /*noinspection CssInvalidPropertyValue*/
  border-bottom: 2px solid ${hilite};
  padding: 8px;
  margin: 2px;
}`;
const Submit = styled.input`
  background: ${dark};
  border: outset ${hilite};
  padding: 3px;
  color: ${lite};
  width: 80%;
  &:active {
    background: ${lite};
    color: black;
    border: inset ${hilite};
  }
`;

export class Signup extends React.Component { // eslint-disable-line
  render() {
    const { username, password, error, loading } = this.props.domain;
    return (
      <div>
        <Helmet
          title="Signup"
          meta={[
            { name: 'description', content: 'Description of Signup' },
          ]}
        />
        <Row main="around" cross="center">
          <form
            onSubmit={(event) => {
              this.props.onSignup(username, password);
              event.preventDefault();
            }}
          >
            <Column>
              <Element>
                <ElementStack>
                  <Input
                    placeholder="username"
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
                <ElementStack>
                  <Element>
                    {error ? <div>user {error}!</div> : loading ? <div>loading...</div> :
                        <Submit type="submit" value="signup!" />}
                  </Element>
                </ElementStack>
              </Element>
            </Column>
          </form>
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
  onChangeUsername: React.PropTypes.func,
  onChangePassword: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  domain: selectSignup(),
});

const mapDispatchToProps = () => ({
  onSignup: signup,
  onChangeUsername: changeUsername,
  onChangePassword: changePassword,
});
export default connect(mapStateToProps, mapDispatchToProps())(Signup);
