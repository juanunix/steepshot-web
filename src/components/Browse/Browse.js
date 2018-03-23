import React from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import TabsFilterComponent from '../Filters/TabsFilterComponent';
import Constants from '../../common/constants';
import TabsWrapper from '../Wrappers/TabsWrapper';
import {documentTitle} from '../../utils/documentTitle';
import PostsList from '../PostsList/PostsList';
import {withWrapper} from "create-react-server/wrapper";
import {getPostsList, initPostsList} from "../../actions/postsList";

class Browse extends React.Component {

	static async getInitialProps({location, query, params, store}) {

		let postsListOptions = {
			point: Constants.POSTS_FILTERS.POSTS_TOP.point,
			cancelPrevious: false,
			options: {},
			maxPosts: 9999,
			loading: false,
			posts: [],
			length: 0,
			hasMore: true,
			loader: true
		};
		await store.dispatch(initPostsList(postsListOptions));
		postsListOptions = {...postsListOptions, point: Constants.POSTS_FILTERS.POSTS_NEW.point};
		await store.dispatch(initPostsList(postsListOptions));
		postsListOptions = {...postsListOptions, point: Constants.POSTS_FILTERS.POSTS_HOT.point};
		await store.dispatch(initPostsList(postsListOptions));
		await store.dispatch(getPostsList(Constants.POSTS_FILTERS.POSTS_TOP.point));
		await store.dispatch(getPostsList(Constants.POSTS_FILTERS.POSTS_NEW.point));
		await store.dispatch(getPostsList(Constants.POSTS_FILTERS.POSTS_HOT.point));
		return store.getState();
	};

  constructor(props) {
    super();

    this.state = {
      keys : [
        { label : Constants.POSTS_FILTERS.POSTS_HOT.label },
        { label : Constants.POSTS_FILTERS.POSTS_NEW.label },
        { label : Constants.POSTS_FILTERS.POSTS_TOP.label }
      ],
      activeItemIndex : props.activeItemIndex
    };
  }

  componentDidMount() {
    if (this.state.activeItemIndex === -1) this.props.history.replace('/*');
    localStorage.setItem('browse', Constants.BROWSE_ROUTES[this.state.activeItemIndex].NAME);
    documentTitle();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeItemIndex === -1) this.props.history.replace('/*');
  }

  updateActiveTab(index) {
    this.setState({
      activeItemIndex : index
    }, () => {
      localStorage.setItem('browse', Constants.BROWSE_ROUTES[this.state.activeItemIndex].NAME);
      this.props.history.push(Constants.BROWSE_ROUTES[this.state.activeItemIndex].NAME);
      documentTitle();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  render() {
		if (this.props.initialLoading) {
			return null;
		}
    return (
      <div className="g-main_i container">
        <div id="workspace" className="g-content clearfix">
          <TabsFilterComponent
            keys={this.state.keys}
            activeItemIndex={this.state.activeItemIndex}
            updateCallback={this.updateActiveTab.bind(this)}
          />
          <TabsWrapper
            activeTab={this.state.activeItemIndex}
          >
            <PostsList
              point={Constants.POSTS_FILTERS.POSTS_HOT.point}
              cancelPrevious={false}
              wrapperModifier="posts-list offset-should-replace_browse clearfix"
            />
            <PostsList
              point={Constants.POSTS_FILTERS.POSTS_NEW.point}
              cancelPrevious={false}
              wrapperModifier="posts-list offset-should-replace_browse clearfix"
            />
            <PostsList
              point={Constants.POSTS_FILTERS.POSTS_TOP.point}
              cancelPrevious={false}
              wrapperModifier="posts-list offset-should-replace_browse clearfix"
            />
          </TabsWrapper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		...state.postsList[Constants.POSTS_FILTERS.POSTS_HOT.point],
		localization: state.localization
	};
};

export default withWrapper(withRouter(connect(mapStateToProps)(Browse)));
