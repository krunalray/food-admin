import React from 'react';
import { Switch } from 'react-router';
import accountRoute from '../container/modules/account/system/route';
import customerRoute from '../container/modules/customer/system/route';
import RouteUser from '../container/modules/user/system/route_user';
import userRoute from '../container/modules/user/system/route';
import Dashboard from '../container/layout/dashboard';



const rootRoute = (
  <React.Fragment>
    <Switch>
      <RouteUser key="route.dashboard.top" exact path="/" component={Dashboard} />
      <RouteUser key="route.dashboard" exact path="/admin" component={Dashboard} />
      {accountRoute}
      {customerRoute}
      {userRoute}
    </Switch>
    </React.Fragment>
);

export default rootRoute;
