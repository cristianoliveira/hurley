import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { requestAllEpisodes } from 'app/actions/episodes';
import FeedcastLoader from 'app/components/FeedcastLoader';
import EpisodesList from './EpisodesList';

class EpisodesListContainer extends PureComponent {
  static defaultProps = {
    per_page: 20,
  }

  componentDidMount() {
    this.fetchData(this.props.page);
  }

  fetchData(page) {
    this.props.dispatch(requestAllEpisodes({
      page: page,
      per_page: this.props.per_page,
    }));
  }

  render() {
    const page = parseInt(this.props.params.page || "1");
    if (page !== this.props.page) {
      this.fetchData(page);
    }

    if (this.props.isFetching) {
      return <FeedcastLoader />;
    }

    return <EpisodesList {...this.props} />;
  }
}

const mapStateToProps = ({ episodes }) => {
  return episodes;
}

export { EpisodesList };
export default connect(mapStateToProps)(EpisodesListContainer);