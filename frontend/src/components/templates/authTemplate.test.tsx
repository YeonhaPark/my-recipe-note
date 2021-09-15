import { shallow } from 'enzyme';
import { AuthTemplate } from '../templates';
import { Signup } from '../pages';

const AuthProps = {
  children: <Signup />,
  headerName: 'header',
};

const renderAuthTemplate = () => shallow(<AuthTemplate {...AuthProps} />);
describe('authTemplate', () => {
  it('renders AuthTemplate', () => {
    renderAuthTemplate();
  });
});
