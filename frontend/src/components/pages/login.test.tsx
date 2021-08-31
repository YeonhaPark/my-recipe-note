import { shallow } from 'enzyme';
import { Login } from '../pages';

const renderLogin = () => shallow(<Login />);
describe('Login', () => {
  it('renders Login', () => {
    renderLogin();
  });
  it('Login button type is submit', () => {
    const login = renderLogin();
    const loginBtn = login.find('[type="submit"]');
    expect(loginBtn).toHaveLength(1);
  });
});
