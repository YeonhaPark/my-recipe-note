import { shallow, mount } from 'enzyme';
import { Note } from '../organisms';
import { Mode } from '../../api/types';

const NoteProps = {
  mode: 'CREATE' as Mode,
  drawerOpen: true,
  onExpandClick: () => {},
  onUpload: () => {},
  onDelete: () => {},
  recipeID: '1',
  title: 'taco',
  setTitle: () => {},
  ingredients: [{ id: 1, isChecked: true, name: 'sugar' }],
  setIngredients: () => {},
  contents: 'contents',
  setContents: () => {},
  tags: ['sweet'],
  setTags: () => {},
};

const renderNote = () => shallow(<Note {...NoteProps} />);
describe('Note', () => {
  it('renders Note', () => {
    renderNote();
  });

  it('renders fa-expand icon', () => {
    const note = renderNote();
    expect(note.find("[data-test='fa-expand']").length).toBe(1);
  });

  it('renders menu icon', () => {
    const note = renderNote();
    expect(note.find("[data-test='simple-menu']").length).toBe(1);
  });

  it('renders Upload button', () => {
    const note = renderNote();
    expect(note.find("[data-test='upload-btn']").length).toBe(1);
  });

  it('renders Ingredients', () => {
    const note = renderNote();
    expect(note.find("[data-test='ingredients']").length).toBe(1);
  });
  it('renders contents', () => {
    const note = renderNote();
    expect(note.find("[data-test='contents']").length).toBe(1);
  });

  it('contains title input element', () => {
    const note = renderNote();
    expect(note.find("[data-test='title']").length).toBe(1);
  });

  it('confirms if title input element has required props', () => {
    const note = renderNote();
    expect(note.find("[data-test='title']").prop('required')).toBe(true);
  });

  it('pressing delete button calls handleDelete function', () => {
    const note = renderNote();
    note.find("[data-test='delete-btn']").simulate('click');
    const note2 = renderNote();
    expect(note2.find("[data-test='menu-burger']").prop('anchorEl')).toBe(null);
  });

  it('if mode is CREATE, input element with data-test title is focused on mounting', () => {
    const note = renderNote();
    note.setProps({ mode: 'CREATE' });
    const title = note.find("[data-test='title']");
    expect(title.prop('autoFocus')).toBe(true);
  });

  it('if drawer is closed, render fa-compress icon', () => {
    const note = renderNote();
    note.setProps({ drawerOpen: false });
    const compressBtn = note.find("[data-test='fa-compress']");
    expect(compressBtn).toHaveLength(1);
  });
});
