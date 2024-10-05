import React from 'react';
import { Route } from 'react-router';
import AccountForgotten from '../container/forgotten';
import Signin from '../container/signin';
import Signout from '../container/signout';
const accountRoute = [
	<Route exact path="/signin" component={Signin} />,
	<Route exact path="/admin/signin" component={Signin} />,
	<Route exact path="/admin/signout" component={Signout} />,
	<Route exact path="/admin/forgotten" component={AccountForgotten} />
]
export default accountRoute;
