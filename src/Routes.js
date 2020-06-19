import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';

import {
  Dashboard as DashboardView,

  
  
  Account as AccountView,
  Deposit as DepositView,
  Transfer as TransferView,
  Withdraw as WithdrawView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      
     
      
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={DepositView}
        exact
        layout={MainLayout}
        path="/deposit"
      />
      <RouteWithLayout
        component={TransferView}
        exact
        layout={MainLayout}
        path="/transfer"
      />
      <RouteWithLayout
        component={WithdrawView}
        exact
        layout={MainLayout}
        path="/withdraw"
      />
     
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MainLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
