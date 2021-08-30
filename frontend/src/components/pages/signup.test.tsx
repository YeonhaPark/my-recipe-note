import { shallow } from 'enzyme';
import { Signup } from '../pages';

const renderSignup = () => shallow(<Signup />);
describe('Signup', () => {
  it('renders Signup', () => {
    renderSignup();
  });

  it('Signup button type is submit', () => {
    const signup = renderSignup();
    const signupBtn = signup.find('[type="submit"]');
    expect(signupBtn).toHaveLength(1);
  });

  it('inputs have required attr', () => {
    const signup = renderSignup();
    const required = signup.find('[required=true]');
    expect(required).toHaveLength(3);
  });
});
