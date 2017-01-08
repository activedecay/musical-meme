/*
 * Welcome
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import selectWelcome from './selectors';

import { Container, Element, ElementStack, Item, Column, Row } from 'style/lego';

export class Welcome extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="Welcome"
          meta={[
            { name: 'description', content: 'Description of Welcome' },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = selectWelcome();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
