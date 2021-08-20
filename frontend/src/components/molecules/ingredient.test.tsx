import { mount } from 'enzyme';
import { Ingredient } from '../molecules';
import renderer from 'react-test-renderer';

const IngredientProps = {
  id: 1,
  checked: true,
  onValueChange: jest.fn(),
  onCheckboxChange: jest.fn(),
  onListChange: jest.fn(),
  value: 'bread',
  ingredientId: 1,
};

const renderIngredient = () => mount(<Ingredient {...IngredientProps} />);

describe('Ingredient', () => {
  it('renders Ingredient', () => {
    renderIngredient();
  });

  it('renders exact prop provided', () => {
    const ingredient = renderIngredient();

    expect(ingredient.prop('value')).toEqual('bread');
  });

  it('contains input tag as child', () => {
    const ingredient = renderIngredient();
    expect(ingredient.find('input#input-1')).toHaveLength(1);
  });
});
