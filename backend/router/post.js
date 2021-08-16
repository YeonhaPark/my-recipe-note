import express from 'express';
import 'express-async-errors';
import recipes from '../data/allRecipes.js';
const router = express.Router();

let allRecipes = [...recipes];

router.get('/', (req, res) => {
  const title = req.query.title;

  if (title) {
    const result = allRecipes.filter((recipe) => {
      if (title === recipe.title || recipe.title.includes(title)) return true;
    });
    res.status(200).json(result);
  }
  res.status(200).json(allRecipes);
});

router.get('/:id', (req, res) => {
  const detail = allRecipes.filter((recipe) => recipe.id === req.params.id);

  if (!!detail.length) {
    res.status(200).json(detail[0]);
  } else {
    res.status(404).json({ message: `Note ${req.params.id} not found` });
  }
});

router.post('/', (req, res) => {
  const { title, ingredients, contents, tags } = req.body;

  const recipe = {
    title,
    ingredients,
    contents,
    tags,
    createdAt: Date.now().toString(),
    modifiedAt: Date.now().toString(),
  };

  allRecipes.unshift(recipe);
  res.status(201).json(recipe);
});

function updateMapper(body, id) {
  const keys = Object.keys(body);
  if (keys.length === 0) {
    return;
  }

  allRecipes = allRecipes.map((recipe) => {
    if (recipe.id === id) {
      // 해당하는 아이디의 키를 업데이트 해준다.
      keys.forEach((key) => {
        recipe[key] = body[key];
        recipe.modifiedAt = Date.now().toString();
      });
      return recipe;
    } else return recipe;
  });
}

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  updateMapper(body, id);
  const updated = allRecipes.filter((recipe) => recipe.id === id);

  res.status(200).json(updated);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    allRecipes = allRecipes.filter((recipe) => id !== recipe.id);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `Note ${req.params.id} not found` });
  }
});

export default router;
