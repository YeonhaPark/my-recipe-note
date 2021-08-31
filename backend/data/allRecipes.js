import { db } from '../db/database.js';

export async function getAll(userId) {
  return db
    .execute(
      'SELECT recipe.id, recipe.contents, recipe.title FROM recipe WHERE recipe.userId=?',
      [userId]
    )
    .then((result) => {
      return result[0];
    })
    .then((recipes) => {
      return Promise.all(
        recipes.map((recipe) =>
          db
            .execute(
              'SELECT recipeIngredient.ingredientId FROM recipeIngredient WHERE recipeIngredient.recipeId=?',
              [recipe.id]
            )
            .then((items) => items[0])
            .then((ingredientIds) => {
              if (ingredientIds.length) {
                const ingredients = ingredientIds;
                return Promise.all(
                  ingredients.map((el) =>
                    db
                      .execute(
                        'SELECT * FROM ingredient WHERE ingredient.id=?',
                        [el.ingredientId]
                      )
                      .then((outerIngredient) => {
                        return outerIngredient[0][0];
                      })
                  )
                );
              }
            })
            .then((result) => {
              if (result) {
                const newResult = result.map((el) => {
                  el.isChecked = !!el.isChecked;
                  return el;
                });
                recipe.ingredients = newResult;
              }
              return recipe;
            })
        )
      );
    })
    .then((results) => {
      return results;
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
  const { title, contents, ingredients, tags, userId } = recipe;
  await db
    .execute('INSERT INTO recipe (title, contents, userId) VALUES(?,?,?)', [
      title,
      contents,
      userId,
    ])
    .then((result) => {
      console.log('result::', result);
      const recipeId = result[0].insertId;
      ingredients.forEach((ingredient) => {
        const { isChecked, name } = ingredient;
        db.execute('INSERT INTO ingredient (isChecked, name) VALUES(?, ?)', [
          isChecked,
          name,
        ]).then((result) => {
          const ingredientId = result[0].insertId;
          db.execute(
            'INSERT INTO recipeIngredient (recipeId, ingredientId) VALUES(?,?)',
            [recipeId, ingredientId]
          );
        });
      });

      tags.forEach((tag) => {
        // ㅌㅐ그가 이미 있으면 패스
        const { title } = tag;
        db.execute('INSERT INTO tag (title) VALUES(?)', [title]).then(
          (result) => {
            const tagId = result[0].insertId;
            db.execute('INSERT INTO recipeTag (tagId, recipeId) VALUES(?,?)', [
              tagId,
              recipeId,
            ]);
          }
        );
      });
    });

  // tags의 추가된 애들을 호출 (recipe Id로 필터걸어서) 그 다음에 recipeTag에 다시 인서트
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
