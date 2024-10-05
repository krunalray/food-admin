import React from 'react';
import { Route, Switch } from 'react-router';

import RouteUser from '../../../modules/user/system/route_user';

import Customer from '../container/customer';

const customerRoute = [
	<RouteUser exact path="/admin/customer" component={Customer} />
]

export default customerRoute;
