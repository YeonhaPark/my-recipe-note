import express from 'express';
import 'express-async-errors';
import * as recipeController from '../controller/recipes.js';

const router = express.Router();

router.get('/', recipeController.getRecipes);

router.get('/:id', recipeController.getRecipe);

router.post('/', recipeController.postRecipe);

router.put('/:id', recipeController.updateRecipe);

router.delete('/:id', recipeController.deleteRecipe);

export default router;
