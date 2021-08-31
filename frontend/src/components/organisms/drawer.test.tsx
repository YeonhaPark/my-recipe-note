import { mount } from 'enzyme';
import { Drawer } from '.';

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

  it('if recipeList length is 0, render null', () => {
    const drawer = renderDrawer();
    drawer.setProps({ recipeList: [] });
    drawer.update();
    const listItem = drawer.find("[data-test='list-item']");
    expect(listItem).toHaveLength(0);
  });
});
