/*
 * Welcome
 */

import React from 'react';
import FaBeer from 'react-icons/fa/beer';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';
import selectWelcome from './selectors';
import unsplash from 'utils/images';

import {
  Row, Doc, Article, Header, Stat, Section, Summary, Details, Stack, Tools, Tool, padding
} from 'style/lego';
const Empty = styled(Section)`
  text-align: center;
  ${padding}
`;

export class Welcome extends React.Component {
  render() {
    return (
      <Doc>
        <Tools>
          <FaBeer />
          <Tool><i className="ion-alert"></i> </Tool>
          <Tool>Tool</Tool>
          <Tool>Tool</Tool>
        </Tools>
        <Helmet title="Welcome" />
        <Article>
          <Header>pussy</Header>
          <Row main="between" wrap>
            <Section>list<Stat>100</Stat></Section>
            <Section>list<Stat>100</Stat></Section>
          </Row>
        </Article>
        <Article>
          <Header>tits</Header>
          <Row main="between" cross="start" wrap>
            <Section>
              <Stat>1</Stat>
              <Details>
                <Summary>summary</Summary>
                <Stack>details</Stack>
              </Details>
            </Section>
            <Section>
              <Stat>1</Stat>
              <Details>
                <Summary>summary</Summary>
                <Stack>
                  section
                </Stack>
              </Details>
            </Section>
            <Section>
              <Stat>1</Stat>
              <Details>
                <Summary>summary</Summary>
                <Stack>details</Stack>
                <Stack>Lorem ipsum dolor sit</Stack>
                <Stack>details</Stack>
              </Details>
            </Section>
          </Row>
        </Article>
        <Article>
          <Header>ass</Header>
          <Row main="around">
            <Empty>sheet</Empty>
          </Row>
        </Article>
      </Doc>
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
