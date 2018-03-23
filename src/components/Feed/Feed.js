import React from 'react';
import {
  connect
} from 'react-redux';
import Constants from '../../common/constants';
import { documentTitle } from '../../utils/documentTitle';
import PostsList from '../PostsList/PostsList';
import {insertCategory} from "../../utils/search";

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      point : Constants.POSTS_FILTERS.POSTS_USER_FEED.point
    };
  }

  componentDidMount() {
    documentTitle();
  }

  render() {
    return (
      <div className="g-main_i container">
        <div id="workspace" className="g-content clearfix">
          <PostsList
						params={{
							point: this.state.point
						}}
            wrapperModifier="posts-list clearfix"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    localization: state.localization
  };
};

export default connect(mapStateToProps)(Feed);
