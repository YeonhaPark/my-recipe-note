import { shallow } from 'enzyme';
import { Signup } from '../pages';

const renderSignup = () => shallow(<Signup />);
describe('Signup', () => {
  it('renders Signup', () => {
    renderSignup();
  });
});
