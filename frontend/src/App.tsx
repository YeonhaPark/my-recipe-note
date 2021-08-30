import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { Login, Main, Signup } from './components/pages';
import PrivateRoute from './components/auth/privateRoute';
import 'normalize.css';
import theme from './theme';

const token = localStorage.getItem('token');
console.log({ token });
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
          <PrivateRoute component={Main} path="/main" />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
