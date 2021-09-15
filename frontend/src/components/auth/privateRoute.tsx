import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLoggedIn = () => !!localStorage.getItem('token');

interface Props {
  exact?: boolean;
  component: React.FunctionComponent<any>;
  path: string;
}
export default function PrivateRoute({ component: Component, ...rest }: Props) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
