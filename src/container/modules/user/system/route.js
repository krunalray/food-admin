import React from 'react';
import { Route, Switch } from 'react-router';

import RouteUser from '../../../modules/user/system/route_user';

import User from '../container/user';
import UserGroup from '../container/user_group';
import UserGroupForm from '../container/user_group_form';
//Chat


const userRoute = [
	<RouteUser exact path="/admin/user" component={User} />,
	<RouteUser exact path="/admin/user_group" component={UserGroup} />,
	<RouteUser exact path="/admin/user_group/add" component={UserGroupForm} />,
	<RouteUser exact path="/admin/user_group/:user_group_id" component={UserGroupForm} />,
]

export default userRoute;
