import express from 'express';
import { body } from 'express-validator';
import 'express-async-errors';
import * as recipeController from '../controller/recipes.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateRecipe = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title length cannot exceed 50 letters'),
  body('contents').notEmpty().withMessage('Content is required'),
  validate,
];
router.get('/', recipeController.getRecipes);

router.get('/:id', recipeController.getRecipe);

router.post('/', validateRecipe, recipeController.postRecipe);

router.put('/:id', validateRecipe, recipeController.updateRecipe);

router.delete('/:id', recipeController.deleteRecipe);

export default router;
