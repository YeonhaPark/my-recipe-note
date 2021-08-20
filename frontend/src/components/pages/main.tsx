/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useState, useEffect, ChangeEvent } from 'react';
import { Drawer, Note } from '../organisms';
import { apiProvider } from '../../api/providers';
import { IngredientType, RecipesType } from '../../api/types';

const mainStyle = css`
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100vh;
`;

const drawerClosed = css`
  height: 100vh;
`;

export default function Main(): JSX.Element {
  const [recipeList, setRecipeList] = useState<RecipesType[]>([]);
  const [recipeID, setRecipeID] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [ingredients, setIngredients] = useState<IngredientType[]>([
    { id: 1, isChecked: false, name: '' },
  ]);
  const [contents, setContents] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [searchWords, setSearchWords] = useState<string>('');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWords(e.target.value);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen((prev) => !prev);
  };
  const handleSearchClick = async () => {
    await getAllPosts(searchWords);
  };

  const getAllPosts = async (title?: string) => {
    try {
      if (title) {
        const result = await apiProvider.getAll(`recipes?title=${title}`);
        setRecipeList(result);
      } else {
        const result = await apiProvider.getAll('recipes');
        setRecipeList(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    try {
      const data = {
        title,
        ingredients,
        contents,
        tags,
      };

      const result = await apiProvider.post('recipes', data);
      await getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateNew = () => {
    setRecipeID('');
    setTitle('');
    setIngredients([]);
    setContents('');
    setTags([]);
  };

  const handleUpdate = async () => {
    try {
      const data = {
        title,
        ingredients,
        contents,
        tags,
      };
      const result = await apiProvider.put(`recipes/${recipeID}`, data);
      await getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = () => {
    if (recipeID) {
      // upload
      handleUpdate();
    } else {
      // create
      handleCreate();
    }
  };

  const handleDelete = async () => {
    try {
      const result = await apiProvider.remove('recipes', recipeID);
      // delete 하고 나서 다시 모두 가져올것. getAll
      await getAllPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRecipeClick = async (recipeId: string) => {
    try {
      const result = await apiProvider.getSingle('recipes', recipeId);
      setRecipeID(result.id);
      setTitle(result.title);
      setIngredients(result.ingredients);
      setContents(result.contents);
      setTags(result.tags);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    if (recipeList[0]) handleRecipeClick(recipeList[0].id);
  }, [recipeList]);
  return (
    <div css={drawerOpen ? mainStyle : drawerClosed}>
      <Drawer
        drawerOpen={drawerOpen}
        onCreateNew={handleCreateNew}
        recipeList={recipeList}
        onRecipeClick={handleRecipeClick}
        searchWords={searchWords}
        onSearch={handleSearch}
        onSearchClick={handleSearchClick}
      />
      <Note
        mode="CREATE"
        drawerOpen={drawerOpen}
        onExpandClick={handleDrawerOpen}
        onUpload={handleUpload}
        onDelete={handleDelete}
        recipeID={recipeID}
        title={title}
        setTitle={setTitle}
        ingredients={ingredients}
        setIngredients={setIngredients}
        contents={contents}
        setContents={setContents}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
}
