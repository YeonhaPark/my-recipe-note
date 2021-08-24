import { db } from '../db/database.js';

export async function getAll(userId) {
  console.log('userId:::', userId);
  const userID = 1;
  // 로그인한 유저의 레시피들만 가져오기.
  // 로그인한 유저의 id 가져온다.
  return db
    .execute(
      'SELECT r.*,i.*,t.* from recipe r JOIN recipeIngredient ri ON ri.recipeId=r.id JOIN ingredient i ON i.id=ri.ingredientId JOIN recipeTag rt ON rt.recipeId=r.id JOIN tag t ON t.id=rt.tagId JOIN user u on u.id=r.userId WHERE u.id=?',
      [userID]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0];
    });
}

export async function getById(id) {
  return db
    .execute(
      'SELECT r.*,i.*,t.* from recipe r JOIN recipeIngredient ri ON ri.recipeId=r.id JOIN ingredient i ON i.id=ri.ingredientId JOIN recipeTag rt ON rt.recipeId=r.id JOIN tag t ON t.id=rt.tagId JOIN user u on u.id=r.userId WHERE r.id=?',
      [id]
    )
    .then((result) => {
      console.log(result[0]);
      return result[0][0];
    });
}

export async function getByTitle(title) {
  return allRecipes.filter((recipe) => {
    if (title === recipe.title || recipe.title.includes(title)) return true;
  });
}

export async function create(recipe) {
  const { title, contents, ingredients } = recipe;
  return db.execute('INSERT INTO recipe (title, contents) VALUES(?,?)', [
    title,
    contents,
  ]);
  console.log(recipe);
  allRecipes.unshift(recipe);
}

export async function update(id, recipe) {
  const keys = Object.keys(recipe);

  const selected = allRecipes.find((recipe) => recipe.id === id);
  if (selected) {
    selected.modifiedAt = Date.now().toString();

    keys.forEach((key) => {
      selected[key] = recipe[key];
    });
    return selected;
  } else {
    return selected;
  }
}

export async function remove(id) {
  const itemToDelete = allRecipes.find((recipe) => recipe.id === id);
  const idx = allRecipes.indexOf(itemToDelete);

  if (idx !== -1) {
    return allRecipes.splice(idx, 1); // 해당 아이디의 인덱스 찾기
  } else {
    return undefined;
  }
}
