import { mount } from 'enzyme';
import { Drawer } from '../organisms';
import renderer from 'react-test-renderer';
import { ChipColor } from '../atoms';

const DrawerProps = {
  onCreateNew: () => {},
  recipeList: [
    {
      id: '1',
      title: 'taco',
      ingredients: [],
      contents: 'asdf',
      tags: [],
      createdAt: new Date(),
      modifiedAt: new Date(),
    },
  ],
  drawerOpen: true,
  onRecipeClick: () => {},
  searchWords: 'wer',
  onSearch: () => {},
  onSearchClick: () => {},
};

const renderDrawer = () => mount(<Drawer {...DrawerProps} />);

describe('Drawer', () => {
  it('renders Drawer', () => {
    renderDrawer();
  });

  it('open drawer when drawerOpen prop value is true', () => {
    const drawer = renderDrawer();
    drawer.setProps({ drawerOpen: false });
    expect(drawer.prop('drawerOpen')).toEqual(false);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Drawer {...DrawerProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
