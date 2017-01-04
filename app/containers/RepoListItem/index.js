/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';

import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import ListItem from 'components/ListItem';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';
import { selectUsername } from 'containers/App/selectors';

export class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    let nameprefix = '';


    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    if (item.owner && item.owner.login !== this.props.currentUser) {
      nameprefix = `${item.owner.login}/`;
    } else {
      nameprefix = item._id; // eslint-disable-line no-underscore-dangle
    }

    let content;
    if (item._id) { // eslint-disable-line no-underscore-dangle
      content = (
        <Wrapper>
          <span style={{ alignItems: 'center', display: 'flex' }}>
            {nameprefix}
          </span>
        </Wrapper>
      );
    } else {
      // Put together the content of the repository
      content = (
        <Wrapper>
          <RepoLink href={item.html_url} target="_blank">
            {nameprefix + item.name}
          </RepoLink>
          <IssueLink href={`${item.html_url}/issues`} target="_blank">
            <IssueIcon />
            <FormattedNumber value={item.open_issues_count} />
          </IssueLink>
        </Wrapper>
      );
    }

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.full_name}`} item={content} />
    );
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.object,
  currentUser: React.PropTypes.string,
};

export default connect(createSelector(
  selectCurrentUser(),
  (currentUser) => ({ currentUser })
))(RepoListItem);
