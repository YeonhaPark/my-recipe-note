import { shallow } from 'enzyme';
import { Main } from '../pages';

const renderMain = () => shallow(<Main />);
describe('Note', () => {
  it('renders Note', () => {
    renderMain();
  });
});
