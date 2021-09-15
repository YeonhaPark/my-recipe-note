import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { Login, Main, Signup } from './components/pages';
import PrivateRoute from './components/auth/privateRoute';
import 'normalize.css';
import theme from './theme';

const isLoggedIn = () => !!localStorage.getItem('token');
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/main" component={Main} />
          <Route exact path="/">
            {isLoggedIn() ? <Redirect to="/main" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
