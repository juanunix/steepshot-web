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

	function baseBrowseFilter() {
		return localStorage.getItem('browse') || Constants.BROWSE_ROUTES[0].NAME;
	}

	const isAuthUser = !!store.getState().auth.user && !!store.getState().auth.postingKey;

	return (
		<App>
			<Switch>
				<Route exact path="/" render={() => (
					isAuthUser ? (
						<Redirect to="/feed"/>
					) : (
						<Redirect to={`/browse/${baseBrowseFilter()}`} />
					)
				)}/>
				<Route exact path="/signin" render={() => (
					isAuthUser ? (
						<Redirect push to="/feed"/>
					) : (
						<Signin/>
					)
				)}/>
				<Route path="/browse/:filter" component={BrowseWrapper}/>
				<Redirect path="/browse" to={`/browse/${baseBrowseFilter()}`} />
				<Route path="/@:username" component={UserProfile}/>
				<Route path="/signin" component={Signin}/>
				<Route path="/post" component={SinglePost}/>
				<Route path="/search/:searchValue" component={Search}/>
				<Route path="/guide" component={AboutComponent}/>
				<Route path="/dev/test" component={Testing}/>
				<PrivateRoute path="/feed" component={Feed}/>
				<Redirect path="/createPost"  to={'/editPost'} />
				<PrivateRoute path="/editPost/:category?/:username?/:postId?" component={EditPost}/>
				<PrivateRoute path="/profile" component={Profile}/>
				<PrivateRoute path="/settings" component={Settings}/>
				<Route path="*" component={Testing} />
			</Switch>
		</App>
	);
}
