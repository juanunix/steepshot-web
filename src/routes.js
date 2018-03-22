import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import NotFound from './components/NotFound';
import Signin from './components/Account/Login';
import UserProfile from './components/UserProfile/index';
import PrivateRoute from './components/Routes/PrivateRoute';
import Feed from './components/Feed/Feed';
import Profile from './components/Profile';
import Settings from './components/Settings';
import AboutComponent from './components/About/AboutComponent';
import BrowseWrapper from './components/Wrappers/BrowseWrapper';
import Constants from './common/constants';
import Testing from './components/Common/Testing/Testing';
import SinglePost from './components/SinglePost/SinglePost';
import Search from './components/Search/Search';
import EditPost from './components/EditPost/EditPost';

export default function getRoutes(store) {
	const clearMessages = () => {
		store.dispatch({
			type: 'CLEAR_MESSAGES'
		});
	};

	function baseBrowseFilter() {
		const baseBrowseFilter = localStorage.getItem('browse') === undefined ?
			Constants.BROWSE_ROUTES[0].NAME : localStorage.getItem('browse');
		return baseBrowseFilter;
	}

	return (
		<App>
			<Switch>
				<Route exact path="/" render={() => (
					!!store.getState().auth.user && !!store.getState().auth.postingKey ? (
						<Redirect to="/feed"/>
					) : (
						<Redirect to={`/browse/${baseBrowseFilter()}`} />
					)
				)}/>
				<Route exact path="/signin" render={() => (
					!!store.getState().auth.user && !!store.getState().auth.postingKey ? (
						<Redirect push to="/feed"/>
					) : (
						<Signin/>
					)
				)}/>
				<Route path="/browse/:filter" component={BrowseWrapper} onLeave={clearMessages} />
				<Redirect path="/browse" to={`/browse/${baseBrowseFilter()}`} />
				<Route path="/@:username" component={UserProfile} onLeave={clearMessages} />
				<Route path="/signin" component={Signin} onLeave={clearMessages} />
				<Route path="/post" component={SinglePost} onLeave={clearMessages} />
				<Route path="/search/:searchValue" component={Search} onLeave={clearMessages} />
				<Route path="/guide" component={AboutComponent} onLeave={clearMessages} />
				<Route path="/dev/test" component={Testing} onLeave={clearMessages} />
				<PrivateRoute path="/feed" component={Feed} onLeave={clearMessages} />
				<Redirect path="/createPost"  to={'/editPost'} />
				<PrivateRoute path="/editPost/:category?/:username?/:postId?" component={EditPost} onLeave={clearMessages} />
				<PrivateRoute path="/profile" component={Profile} onLeave={clearMessages} />
				<PrivateRoute path="/settings" component={Settings} onLeave={clearMessages} />
				<Route path="*" component={NotFound} onLeave={clearMessages} />
			</Switch>
		</App>
	);
}
