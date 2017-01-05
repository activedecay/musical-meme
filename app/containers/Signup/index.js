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

const Wrapper = styled.div`
  height: 250px
  display: flex;
  flex-direction: column;    
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;    
  justify-content: center;
  width: 333px;
  margin: 0 auto;
`;
const Input = styled.input`
  margin: 5px;
  padding: 5px
  border: 1px solid lightblue;
  border-radius: 5px
`;
const Submit = styled.input`
  padding: 0.25em 2em;
  margin: 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid #41ADDD;
  color: #41ADDD;
  
  &:active {
    background: #41ADDD;
    color: #FFF;
  }
`;

const ButtonWrapper = styled.div`
  text-align:center;
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
        <Wrapper>
          <Form
            onSubmit={(event) => {
              this.props.onSignup(username, password);
              event.preventDefault();
            }}
          >
            <Input
              placeholder="username"
              onChange={(evt) => this.props.onChangeUsername((evt.target.value))}
              required
            />
            <Input
              type="password"
              onChange={(evt) => this.props.onChangePassword((evt.target.value))}
              required
            />
            <ButtonWrapper>
              <Submit type="submit" value="signup!" />
              {error ? <div>user {error}</div> : loading ? <div>loading...</div> : null}
            </ButtonWrapper>
          </Form>
        </Wrapper>
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
