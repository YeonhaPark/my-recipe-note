import * as recipeRepository from '../data/allRecipes.js';

export async function getRecipes(req, res) {
  const title = req.query.title;
  if (title) {
    const result = await recipeRepository.getByTitle(title);
    res.status(200).json(result);
  } else {
    const result = await recipeRepository.getAll();
    res.status(200).json(result);
  }
}

export async function getRecipe(req, res) {
  const detail = await recipeRepository.getById(req.params.id);

  if (detail) {
    res.status(200).json(detail);
  } else {
    res.status(404).json({ message: `Note ${req.params.id} not found` });
  }
}

export async function postRecipe(req, res) {
  const { title, ingredients, contents, tags } = req.body;

  const recipe = {
    title,
    ingredients,
    contents,
    tags,
    createdAt: Date.now().toString(),
    modifiedAt: Date.now().toString(),
  };

  await recipeRepository.create(recipe);
  res.status(201).json(recipe);
}

export async function updateRecipe(req, res) {
  const { id } = req.params;
  const { body } = req;
  const updated = await recipeRepository.update(id, body);
  res.status(200).json(updated);
}

export async function deleteRecipe(req, res) {
  const { id } = req.params;
  if (id) {
    await recipeRepository.remove(id);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: `Note ${req.params.id} not found` });
  }
}
