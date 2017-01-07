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
        <Column main="around" cross="center">
          <Item>
            start
            <Element>
              <ElementStack><h1>Boards</h1></ElementStack>
              <Element>
                tits
              </Element>
              <ElementStack><h1>Boards</h1></ElementStack>
              <Element>2</Element>
            </Element>
            end
          </Item>
          <Item>
            start
            <Element>
              <ElementStack>1</ElementStack>
              <Element>2</Element>
              <ElementStack>3</ElementStack>
            </Element>
            end
          </Item>
{/*
          <Element>
            <ElementStack>1</ElementStack>
            <Element>
              <Item>
                top
                <Element>
                  <ElementStack>1</ElementStack>
                  <Element>2</Element>
                  <Element>2</Element>
                  <ElementStack>3</ElementStack>
                </Element>
                bottom
              </Item>
            </Element>
            <ElementStack><Element>hi</Element></ElementStack>
          </Element>
*/}
        </Column>
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
